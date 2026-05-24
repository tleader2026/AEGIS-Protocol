import hashlib
import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

from .common import AEGIS_VERSION


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def canonical_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha256_digest(value: Any) -> str:
    if isinstance(value, bytes):
        payload = value
    elif isinstance(value, str):
        payload = value.encode("utf-8")
    else:
        payload = canonical_json(value).encode("utf-8")
    return f"sha256:{hashlib.sha256(payload).hexdigest()}"


@dataclass(frozen=True)
class AgentIdentity:
    agent_id: str
    issuer: str
    subject: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = {"agentId": self.agent_id, "issuer": self.issuer}
        if self.subject is not None:
            data["subject"] = self.subject
        return data


@dataclass(frozen=True)
class MachineAnchor:
    machine_id: str
    runtime_id: str
    attestation_digest: str | None = None
    region_hint: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = {"machineId": self.machine_id, "runtimeId": self.runtime_id}
        if self.attestation_digest is not None:
            data["attestationDigest"] = self.attestation_digest
        if self.region_hint is not None:
            data["regionHint"] = self.region_hint
        return data


@dataclass(frozen=True)
class SessionBridge:
    session_id: str
    started_at: str = field(default_factory=utc_now)
    parent_session_id: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = {"sessionId": self.session_id, "startedAt": self.started_at}
        if self.parent_session_id is not None:
            data["parentSessionId"] = self.parent_session_id
        return data


@dataclass(frozen=True)
class IntentRecord:
    intent_id: str
    summary: str
    intent_digest: str

    @classmethod
    def from_summary(cls, intent_id: str, summary: str) -> "IntentRecord":
        return cls(intent_id=intent_id, summary=summary, intent_digest=sha256_digest(summary))

    def to_dict(self) -> dict[str, Any]:
        return {"intentId": self.intent_id, "summary": self.summary, "intentDigest": self.intent_digest}


@dataclass(frozen=True)
class ExecutionClaim:
    claim_id: str
    claim_type: str
    claim_digest: str
    occurred_at: str = field(default_factory=utc_now)
    target: str | None = None

    @classmethod
    def from_payload(cls, claim_id: str, claim_type: str, payload: Any, target: str | None = None) -> "ExecutionClaim":
        return cls(claim_id=claim_id, claim_type=claim_type, target=target, claim_digest=sha256_digest(payload))

    def to_dict(self) -> dict[str, Any]:
        data = {
            "claimId": self.claim_id,
            "claimType": self.claim_type,
            "occurredAt": self.occurred_at,
            "claimDigest": self.claim_digest,
        }
        if self.target is not None:
            data["target"] = self.target
        return data


@dataclass(frozen=True)
class RuntimeAttestation:
    attestation_id: str
    machine_id: str
    runtime_id: str
    evidence_digest: str
    issued_at: str = field(default_factory=utc_now)
    evidence_type: str = "adapter-backed"

    @classmethod
    def from_evidence(cls, attestation_id: str, machine_id: str, runtime_id: str, evidence: Any, evidence_type: str = "adapter-backed") -> "RuntimeAttestation":
        return cls(
            attestation_id=attestation_id,
            machine_id=machine_id,
            runtime_id=runtime_id,
            evidence_digest=sha256_digest(evidence),
            evidence_type=evidence_type,
        )

    def to_dict(self) -> dict[str, Any]:
        return {
            "attestationId": self.attestation_id,
            "machineId": self.machine_id,
            "runtimeId": self.runtime_id,
            "evidenceDigest": self.evidence_digest,
            "evidenceType": self.evidence_type,
            "issuedAt": self.issued_at,
        }


@dataclass(frozen=True)
class LineageRecord:
    parents: tuple[str, ...] = field(default_factory=tuple)
    lineage_digest: str | None = None

    @classmethod
    def from_parents(cls, parents: list[str] | tuple[str, ...]) -> "LineageRecord":
        parent_tuple = tuple(parents)
        return cls(parents=parent_tuple, lineage_digest=sha256_digest(list(parent_tuple)))

    def to_dict(self) -> dict[str, Any]:
        data: dict[str, Any] = {"parents": list(self.parents)}
        if self.lineage_digest is not None:
            data["lineageDigest"] = self.lineage_digest
        return data


@dataclass(frozen=True)
class TransportBinding:
    kind: str
    protocol_version: str
    conformance_profile: str
    endpoint: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = {
            "kind": self.kind,
            "protocolVersion": self.protocol_version,
            "conformanceProfile": self.conformance_profile,
        }
        if self.endpoint is not None:
            data["endpoint"] = self.endpoint
        return data


@dataclass(frozen=True)
class JurisdictionHint:
    type: str
    value: str

    def to_dict(self) -> dict[str, str]:
        return {"type": self.type, "value": self.value}


@dataclass(frozen=True)
class ProvenanceEnvelope:
    envelope_id: str
    transport: TransportBinding
    session: SessionBridge
    machine: MachineAnchor
    actor: AgentIdentity
    intent: IntentRecord
    execution_claims: tuple[ExecutionClaim, ...]
    lineage: LineageRecord
    issued_at: str = field(default_factory=utc_now)
    jurisdiction_hints: tuple[JurisdictionHint, ...] = field(default_factory=tuple)
    signature: dict[str, Any] = field(default_factory=lambda: {"alg": "EdDSA", "kid": "unsigned", "value": "unsigned"})

    def unsigned_dict(self) -> dict[str, Any]:
        data: dict[str, Any] = {
            "aegisVersion": AEGIS_VERSION,
            "envelopeId": self.envelope_id,
            "transport": self.transport.to_dict(),
            "session": self.session.to_dict(),
            "machine": self.machine.to_dict(),
            "actor": self.actor.to_dict(),
            "intent": self.intent.to_dict(),
            "execution": {"claims": [claim.to_dict() for claim in self.execution_claims]},
            "lineage": self.lineage.to_dict(),
            "issuedAt": self.issued_at,
        }
        if self.jurisdiction_hints:
            data["jurisdictionHints"] = [hint.to_dict() for hint in self.jurisdiction_hints]
        return data

    def to_dict(self) -> dict[str, Any]:
        data = self.unsigned_dict()
        data["signature"] = self.signature
        return data

    def with_signature(self, signature: dict[str, Any]) -> "ProvenanceEnvelope":
        return ProvenanceEnvelope(
            envelope_id=self.envelope_id,
            transport=self.transport,
            session=self.session,
            machine=self.machine,
            actor=self.actor,
            intent=self.intent,
            execution_claims=self.execution_claims,
            lineage=self.lineage,
            issued_at=self.issued_at,
            jurisdiction_hints=self.jurisdiction_hints,
            signature=signature,
        )
