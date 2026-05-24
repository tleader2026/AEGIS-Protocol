from pathlib import Path
from typing import Any

from .common import AEGIS_VERSION, load_json, require_array, require_object, require_string, validate_aegis_uri, validate_digest, validate_signature
from .errors import ErrorCode
from .validation import ValidationFailure, ValidationResult, failure, invalid_result, valid_result

TRANSPORT_KINDS = {"mcp", "a2a", "acp"}
CONFORMANCE_PROFILES = {
    "mcp": "AEGIS-MCP-1.0-draft",
    "a2a": "AEGIS-A2A-1.0-draft",
    "acp": "AEGIS-ACP-1.0-draft",
}
CLAIM_TYPES = {
    "session.open",
    "tool.call",
    "resource.read",
    "prompt.render",
    "agent.message",
    "agent.delegate",
    "state.checkpoint",
    "session.close",
}


def load_provenance_envelope(path: str | Path) -> dict[str, Any]:
    return load_json(path)


def _require_nested_object(document: dict[str, Any], key: str, path: str, failures: list[ValidationFailure]) -> dict[str, Any] | None:
    value = document.get(key)
    if not require_object(value, f"{path}.{key}", failures):
        return None
    return value


def validate_provenance_envelope(document: dict[str, Any]) -> ValidationResult:
    failures: list[ValidationFailure] = []
    if not require_object(document, "$", failures):
        return invalid_result(failures)

    if document.get("aegisVersion") != AEGIS_VERSION:
        failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.aegisVersion", "expected 1.0-draft"))

    validate_aegis_uri(require_string(document, "envelopeId", "$", failures), "$.envelopeId", failures)

    transport = _require_nested_object(document, "transport", "$", failures)
    transport_kind = None
    if transport is not None:
        transport_kind = require_string(transport, "kind", "$.transport", failures)
        if transport_kind is not None and transport_kind not in TRANSPORT_KINDS:
            failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.transport.kind", "unsupported transport kind"))
        require_string(transport, "protocolVersion", "$.transport", failures)
        profile = require_string(transport, "conformanceProfile", "$.transport", failures)
        if transport_kind in CONFORMANCE_PROFILES and profile != CONFORMANCE_PROFILES[transport_kind]:
            failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.transport.conformanceProfile", "profile does not match transport kind"))

    session = _require_nested_object(document, "session", "$", failures)
    if session is not None:
        validate_aegis_uri(require_string(session, "sessionId", "$.session", failures), "$.session.sessionId", failures)
        require_string(session, "startedAt", "$.session", failures)
        parent_session_id = session.get("parentSessionId")
        if parent_session_id is not None:
            validate_aegis_uri(parent_session_id if isinstance(parent_session_id, str) else None, "$.session.parentSessionId", failures)

    machine = _require_nested_object(document, "machine", "$", failures)
    if machine is not None:
        validate_aegis_uri(require_string(machine, "machineId", "$.machine", failures), "$.machine.machineId", failures)
        validate_aegis_uri(require_string(machine, "runtimeId", "$.machine", failures), "$.machine.runtimeId", failures)
        validate_digest(machine.get("attestationDigest"), "$.machine.attestationDigest", failures)

    actor = _require_nested_object(document, "actor", "$", failures)
    if actor is not None:
        require_string(actor, "agentId", "$.actor", failures)
        require_string(actor, "issuer", "$.actor", failures)

    intent = _require_nested_object(document, "intent", "$", failures)
    if intent is not None:
        validate_aegis_uri(require_string(intent, "intentId", "$.intent", failures), "$.intent.intentId", failures)
        require_string(intent, "summary", "$.intent", failures)
        validate_digest(require_string(intent, "intentDigest", "$.intent", failures), "$.intent.intentDigest", failures)

    execution = _require_nested_object(document, "execution", "$", failures)
    if execution is not None:
        claims = require_array(execution, "claims", "$.execution", failures)
        if claims is not None:
            if not claims:
                failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.execution.claims", "at least one claim is required"))
            for index, claim in enumerate(claims):
                claim_path = f"$.execution.claims[{index}]"
                if not require_object(claim, claim_path, failures):
                    continue
                validate_aegis_uri(require_string(claim, "claimId", claim_path, failures), f"{claim_path}.claimId", failures)
                claim_type = require_string(claim, "claimType", claim_path, failures)
                if claim_type is not None and claim_type not in CLAIM_TYPES:
                    failures.append(failure(ErrorCode.REQUIRED_FIELD, f"{claim_path}.claimType", "unsupported claim type"))
                require_string(claim, "occurredAt", claim_path, failures)
                validate_digest(require_string(claim, "claimDigest", claim_path, failures), f"{claim_path}.claimDigest", failures)

    lineage = _require_nested_object(document, "lineage", "$", failures)
    if lineage is not None:
        parents = require_array(lineage, "parents", "$.lineage", failures)
        if parents is not None:
            for index, parent_id in enumerate(parents):
                validate_aegis_uri(parent_id if isinstance(parent_id, str) else None, f"$.lineage.parents[{index}]", failures)
        validate_digest(lineage.get("lineageDigest"), "$.lineage.lineageDigest", failures)

    require_string(document, "issuedAt", "$", failures)
    validate_signature(document.get("signature"), "$.signature", failures)

    return invalid_result(failures) if failures else valid_result(kind="provenance-envelope", transport=transport_kind)
