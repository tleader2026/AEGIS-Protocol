from pathlib import Path
from typing import Any

from .common import AEGIS_VERSION, load_json, require_array, require_object, require_string, validate_aegis_uri, validate_digest, validate_signature
from .errors import ErrorCode
from .validation import ValidationFailure, ValidationResult, failure, invalid_result, valid_result


def load_manifest(path: str | Path) -> dict[str, Any]:
    return load_json(path)


def validate_manifest(document: dict[str, Any]) -> ValidationResult:
    failures: list[ValidationFailure] = []
    if not require_object(document, "$", failures):
        return invalid_result(failures)

    if document.get("aegisVersion") != AEGIS_VERSION:
        failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.aegisVersion", "expected 1.0-draft"))

    manifest_id = require_string(document, "manifestId", "$", failures)
    validate_aegis_uri(manifest_id, "$.manifestId", failures)

    subject = document.get("subject")
    if require_object(subject, "$.subject", failures):
        require_string(subject, "did", "$.subject", failures)
        require_string(subject, "namespace", "$.subject", failures)
        require_string(subject, "controller", "$.subject", failures)

    intent = document.get("intent")
    if require_object(intent, "$.intent", failures):
        validate_aegis_uri(require_string(intent, "intentId", "$.intent", failures), "$.intent.intentId", failures)
        scopes = require_array(intent, "scopes", "$.intent", failures)
        if scopes is not None and not scopes:
            failures.append(failure(ErrorCode.INTENT_SCOPE_DENIED, "$.intent.scopes", "at least one scope is required"))
        validate_signature(intent.get("signature"), "$.intent.signature", failures)

    execution = document.get("execution")
    if require_object(execution, "$.execution", failures):
        validate_aegis_uri(require_string(execution, "envelopeId", "$.execution", failures), "$.execution.envelopeId", failures)
        steps = require_array(execution, "steps", "$.execution", failures)
        if steps is not None and not steps:
            failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.execution.steps", "at least one execution step is required"))
        validate_digest(execution.get("reasoningDigest"), "$.execution.reasoningDigest", failures)

    provenance = require_array(document, "provenance", "$", failures)
    if provenance is not None:
        seen = set()
        for index, block in enumerate(provenance):
            if require_object(block, f"$.provenance[{index}]", failures):
                block_id = require_string(block, "blockId", f"$.provenance[{index}]", failures)
                validate_aegis_uri(block_id, f"$.provenance[{index}].blockId", failures)
                if block_id in seen:
                    failures.append(failure(ErrorCode.PROVENANCE_GAP, f"$.provenance[{index}].blockId", "duplicate provenance block"))
                seen.add(block_id)
                validate_digest(block.get("artifactDigest"), f"$.provenance[{index}].artifactDigest", failures)
                validate_signature(block.get("signature"), f"$.provenance[{index}].signature", failures)

    impact = document.get("impact")
    if require_object(impact, "$.impact", failures):
        validate_aegis_uri(require_string(impact, "receiptId", "$.impact", failures), "$.impact.receiptId", failures)
        if impact.get("review") not in {"none", "pending", "approved", "rejected"}:
            failures.append(failure(ErrorCode.IMPACT_UNREVIEWED, "$.impact.review", "invalid review state"))

    signatures = require_array(document, "signatures", "$", failures)
    if signatures is not None and not signatures:
        failures.append(failure(ErrorCode.SIGNATURE_INVALID, "$.signatures", "at least one runtime signature is required"))

    return invalid_result(failures) if failures else valid_result(kind="manifest", manifestId=manifest_id)
