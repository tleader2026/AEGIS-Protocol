import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from .metadata import AgentIdentity, ExecutionClaim, IntentRecord, LineageRecord, MachineAnchor, ProvenanceEnvelope, SessionBridge, TransportBinding, canonical_json, sha256_digest, utc_now
from .provenance import validate_provenance_envelope
from .validation import ValidationResult


@dataclass
class JsonlRecordStore:
    path: Path
    records: list[dict[str, Any]] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        if self.path.exists():
            with self.path.open("r", encoding="utf-8") as handle:
                for line in handle:
                    if line.strip():
                        self.records.append(json.loads(line))

    def append(self, envelope: dict[str, Any]) -> None:
        self.records.append(envelope)
        with self.path.open("a", encoding="utf-8") as handle:
            handle.write(canonical_json(envelope) + "\n")

    def query(self, **filters: str) -> list[dict[str, Any]]:
        def match(record: dict[str, Any]) -> bool:
            for key, expected in filters.items():
                if _extract_index(record, key) != expected:
                    return False
            return True

        return [record for record in self.records if match(record)]


def _extract_index(record: dict[str, Any], key: str) -> Any:
    if key == "envelopeId":
        return record.get("envelopeId")
    if key == "sessionId":
        return record.get("session", {}).get("sessionId")
    if key == "machineId":
        return record.get("machine", {}).get("machineId")
    if key == "runtimeId":
        return record.get("machine", {}).get("runtimeId")
    if key == "transport":
        return record.get("transport", {}).get("kind")
    if key == "conformanceProfile":
        return record.get("transport", {}).get("conformanceProfile")
    if key == "agentId":
        return record.get("actor", {}).get("agentId")
    return None


@dataclass
class RuntimeSession:
    transport: TransportBinding
    session: SessionBridge
    machine: MachineAnchor
    actor: AgentIdentity
    intent: IntentRecord | None = None
    attestation: dict[str, Any] | None = None
    claims: list[ExecutionClaim] = field(default_factory=list)
    lineage: LineageRecord = field(default_factory=LineageRecord)


class AegisRuntimeDaemon:
    def __init__(self, machine: MachineAnchor, signing_key_id: str = "local-dev-key", store: JsonlRecordStore | None = None) -> None:
        self.machine = machine
        self.signing_key_id = signing_key_id
        self.store = store
        self.sessions: dict[str, RuntimeSession] = {}

    def hello(self) -> dict[str, Any]:
        return {
            "aegisVersion": "1.0-draft",
            "runtime": "aegis-runtime-python",
            "methods": [
                "aegis.hello",
                "aegis.negotiate",
                "aegis.bindSession",
                "aegis.submitIntent",
                "aegis.attestRuntime",
                "aegis.recordExecution",
                "aegis.resolveLineage",
                "aegis.publishEnvelope",
                "aegis.queryEnvelopes",
                "aegis.closeSession",
            ],
            "conformanceProfiles": ["AEGIS-MCP-1.0-draft", "AEGIS-A2A-1.0-draft", "AEGIS-ACP-1.0-draft"],
            "signingAlgorithms": ["EdDSA"],
        }

    def negotiate(self, requested_profile: str) -> dict[str, Any]:
        if requested_profile not in self.hello()["conformanceProfiles"]:
            return {"accepted": False, "reason": "unsupported conformance profile"}
        return {
            "accepted": True,
            "conformanceProfile": requested_profile,
            "canonicalization": "RFC8785-json-draft",
            "signatureAlgorithm": "EdDSA",
            "requiredEvidence": ["session", "machine", "actor", "intent", "execution", "lineage"],
        }

    def bind_session(self, transport: TransportBinding, session: SessionBridge, actor: AgentIdentity) -> dict[str, Any]:
        self.sessions[session.session_id] = RuntimeSession(transport=transport, session=session, machine=self.machine, actor=actor)
        return {"sessionId": session.session_id, "machineId": self.machine.machine_id, "runtimeId": self.machine.runtime_id, "boundAt": utc_now()}

    def submit_intent(self, session_id: str, intent: IntentRecord) -> dict[str, Any]:
        session = self._require_session(session_id)
        session.intent = intent
        return {"sessionId": session_id, "intentId": intent.intent_id, "intentDigest": intent.intent_digest, "receivedAt": utc_now()}

    def attest_runtime(self, session_id: str, evidence: dict[str, Any]) -> dict[str, Any]:
        session = self._require_session(session_id)
        session.attestation = {"evidenceDigest": sha256_digest(evidence), "receivedAt": utc_now()}
        return {"sessionId": session_id, **session.attestation}

    def record_execution(self, session_id: str, claim: ExecutionClaim) -> dict[str, Any]:
        session = self._require_session(session_id)
        session.claims.append(claim)
        return {"sessionId": session_id, "claimId": claim.claim_id, "claimDigest": claim.claim_digest, "receivedAt": utc_now()}

    def resolve_lineage(self, session_id: str, parents: list[str]) -> dict[str, Any]:
        session = self._require_session(session_id)
        session.lineage = LineageRecord.from_parents(parents)
        return {"sessionId": session_id, "parents": parents, "lineageDigest": session.lineage.lineage_digest}

    def publish_envelope(self, session_id: str, envelope_id: str) -> dict[str, Any]:
        session = self._require_session(session_id)
        if session.intent is None:
            raise ValueError("intent must be submitted before publishing an envelope")
        if not session.claims:
            raise ValueError("at least one execution claim is required before publishing an envelope")

        envelope = ProvenanceEnvelope(
            envelope_id=envelope_id,
            transport=session.transport,
            session=session.session,
            machine=session.machine,
            actor=session.actor,
            intent=session.intent,
            execution_claims=tuple(session.claims),
            lineage=session.lineage,
        )
        signed = envelope.with_signature(self._sign(envelope.unsigned_dict())).to_dict()
        validation = validate_provenance_envelope(signed)
        if not validation.valid:
            raise ValueError(f"invalid envelope: {validation.failures}")
        if self.store is not None:
            self.store.append(signed)
        return signed

    def verify_envelope(self, envelope: dict[str, Any]) -> ValidationResult:
        return validate_provenance_envelope(envelope)

    def query_envelopes(self, **filters: str) -> list[dict[str, Any]]:
        if self.store is None:
            return []
        return self.store.query(**filters)

    def close_session(self, session_id: str) -> dict[str, Any]:
        self._require_session(session_id)
        return {"sessionId": session_id, "closedAt": utc_now()}

    def handle_jsonrpc(self, request: dict[str, Any]) -> dict[str, Any]:
        method = request.get("method")
        params = request.get("params", {})
        try:
            result = self._dispatch(method, params)
            return {"jsonrpc": "2.0", "id": request.get("id"), "result": result}
        except Exception as exc:
            return {"jsonrpc": "2.0", "id": request.get("id"), "error": {"code": -32000, "message": str(exc)}}

    def _dispatch(self, method: str, params: dict[str, Any]) -> Any:
        if method == "aegis.hello":
            return self.hello()
        if method == "aegis.negotiate":
            return self.negotiate(params["conformanceProfile"])
        if method == "aegis.bindSession":
            return self.bind_session(
                transport=TransportBinding(
                    kind=params["transport"]["kind"],
                    protocol_version=params["transport"]["protocolVersion"],
                    conformance_profile=params["transport"]["conformanceProfile"],
                    endpoint=params["transport"].get("endpoint"),
                ),
                session=SessionBridge(
                    session_id=params["session"]["sessionId"],
                    started_at=params["session"].get("startedAt", utc_now()),
                    parent_session_id=params["session"].get("parentSessionId"),
                ),
                actor=AgentIdentity(
                    agent_id=params["actor"]["agentId"],
                    issuer=params["actor"]["issuer"],
                    subject=params["actor"].get("subject"),
                ),
            )
        if method == "aegis.submitIntent":
            return self.submit_intent(
                params["sessionId"],
                IntentRecord(
                    intent_id=params["intent"]["intentId"],
                    summary=params["intent"]["summary"],
                    intent_digest=params["intent"].get("intentDigest", sha256_digest(params["intent"]["summary"])),
                ),
            )
        if method == "aegis.attestRuntime":
            return self.attest_runtime(params["sessionId"], params["evidence"])
        if method == "aegis.recordExecution":
            return self.record_execution(
                params["sessionId"],
                ExecutionClaim(
                    claim_id=params["claim"]["claimId"],
                    claim_type=params["claim"]["claimType"],
                    target=params["claim"].get("target"),
                    occurred_at=params["claim"].get("occurredAt", utc_now()),
                    claim_digest=params["claim"].get("claimDigest", sha256_digest(params["claim"])),
                ),
            )
        if method == "aegis.resolveLineage":
            return self.resolve_lineage(params["sessionId"], params.get("parents", []))
        if method == "aegis.publishEnvelope":
            return self.publish_envelope(params["sessionId"], params["envelopeId"])
        if method == "aegis.verifyEnvelope":
            return self.verify_envelope(params["envelope"]).metadata | {"valid": self.verify_envelope(params["envelope"]).valid}
        if method == "aegis.queryEnvelopes":
            return self.query_envelopes(**params)
        if method == "aegis.closeSession":
            return self.close_session(params["sessionId"])
        raise ValueError(f"unsupported JSON-RPC method: {method}")

    def _require_session(self, session_id: str) -> RuntimeSession:
        try:
            return self.sessions[session_id]
        except KeyError as exc:
            raise ValueError(f"unknown session: {session_id}") from exc

    def _sign(self, payload: dict[str, Any]) -> dict[str, str]:
        # MVP signature: deterministic development proof shaped like an EdDSA detached signature.
        # Replace with COSE/EdDSA before candidate standard status.
        digest = sha256_digest({"kid": self.signing_key_id, "payload": payload})
        return {"alg": "EdDSA", "kid": self.signing_key_id, "value": digest}
