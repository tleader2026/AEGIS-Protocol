from dataclasses import dataclass
from typing import Any

from .metadata import AgentIdentity, ExecutionClaim, IntentRecord, SessionBridge, TransportBinding, sha256_digest
from .runtime import AegisRuntimeDaemon


PROFILE_BY_TRANSPORT = {
    "mcp": "AEGIS-MCP-1.0-draft",
    "a2a": "AEGIS-A2A-1.0-draft",
    "acp": "AEGIS-ACP-1.0-draft",
}


@dataclass
class AccountableTransportSession:
    runtime: AegisRuntimeDaemon
    transport_kind: str
    protocol_version: str
    endpoint: str
    session_id: str
    agent_id: str
    issuer: str

    def open(self) -> dict[str, Any]:
        transport = TransportBinding(
            kind=self.transport_kind,
            protocol_version=self.protocol_version,
            conformance_profile=PROFILE_BY_TRANSPORT[self.transport_kind],
            endpoint=self.endpoint,
        )
        session = SessionBridge(session_id=self.session_id)
        actor = AgentIdentity(agent_id=self.agent_id, issuer=self.issuer)
        return self.runtime.bind_session(transport=transport, session=session, actor=actor)

    def submit_intent(self, intent_id: str, summary: str) -> dict[str, Any]:
        return self.runtime.submit_intent(self.session_id, IntentRecord.from_summary(intent_id, summary))

    def attest_runtime(self, evidence: dict[str, Any]) -> dict[str, Any]:
        return self.runtime.attest_runtime(self.session_id, evidence)

    def record(self, claim_id: str, claim_type: str, payload: Any, target: str | None = None) -> dict[str, Any]:
        claim = ExecutionClaim.from_payload(claim_id=claim_id, claim_type=claim_type, payload=payload, target=target)
        return self.runtime.record_execution(self.session_id, claim)

    def resolve_lineage(self, parents: list[str]) -> dict[str, Any]:
        return self.runtime.resolve_lineage(self.session_id, parents)

    def publish(self, envelope_id: str) -> dict[str, Any]:
        return self.runtime.publish_envelope(self.session_id, envelope_id)


class AegisMcpSession(AccountableTransportSession):
    def __init__(self, runtime: AegisRuntimeDaemon, protocol_version: str, endpoint: str, session_id: str, agent_id: str, issuer: str) -> None:
        super().__init__(runtime, "mcp", protocol_version, endpoint, session_id, agent_id, issuer)

    def tool_call(self, claim_id: str, tool_name: str, arguments: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "tool.call", {"tool": tool_name, "argumentsDigest": sha256_digest(arguments)}, target=tool_name)

    def resource_read(self, claim_id: str, resource_uri: str) -> dict[str, Any]:
        return self.record(claim_id, "resource.read", {"resource": resource_uri}, target=resource_uri)

    def prompt_render(self, claim_id: str, prompt_name: str, variables: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "prompt.render", {"prompt": prompt_name, "variablesDigest": sha256_digest(variables)}, target=prompt_name)


class AegisA2aSession(AccountableTransportSession):
    def __init__(self, runtime: AegisRuntimeDaemon, protocol_version: str, endpoint: str, session_id: str, agent_id: str, issuer: str) -> None:
        super().__init__(runtime, "a2a", protocol_version, endpoint, session_id, agent_id, issuer)

    def message(self, claim_id: str, recipient: str, payload: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "agent.message", {"recipient": recipient, "payloadDigest": sha256_digest(payload)}, target=recipient)

    def delegate(self, claim_id: str, recipient: str, task: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "agent.delegate", {"recipient": recipient, "taskDigest": sha256_digest(task)}, target=recipient)


class AegisAcpSession(AccountableTransportSession):
    def __init__(self, runtime: AegisRuntimeDaemon, protocol_version: str, endpoint: str, session_id: str, agent_id: str, issuer: str) -> None:
        super().__init__(runtime, "acp", protocol_version, endpoint, session_id, agent_id, issuer)

    def message(self, claim_id: str, participant: str, payload: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "agent.message", {"participant": participant, "payloadDigest": sha256_digest(payload)}, target=participant)

    def checkpoint(self, claim_id: str, state_name: str, state: dict[str, Any]) -> dict[str, Any]:
        return self.record(claim_id, "state.checkpoint", {"state": state_name, "stateDigest": sha256_digest(state)}, target=state_name)
