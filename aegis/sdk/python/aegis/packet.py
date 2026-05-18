from pathlib import Path
from typing import Any

from .common import AEGIS_VERSION, load_json, require_object, require_string, validate_aegis_uri, validate_digest, validate_signature
from .errors import ErrorCode
from .validation import ValidationFailure, ValidationResult, failure, invalid_result, valid_result

PACKET_TYPES = {
    "aegis.identity.hello.v1",
    "aegis.intent.present.v1",
    "aegis.execution.checkpoint.v1",
    "aegis.provenance.publish.v1",
    "aegis.impact.receipt.v1",
    "aegis.registry.reconcile.v1",
}


def load_packet(path: str | Path) -> dict[str, Any]:
    return load_json(path)


def validate_packet(document: dict[str, Any]) -> ValidationResult:
    failures: list[ValidationFailure] = []
    if not require_object(document, "$", failures):
        return invalid_result(failures)

    if document.get("aegisVersion") != AEGIS_VERSION:
        failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.aegisVersion", "expected 1.0-draft"))

    packet_type = require_string(document, "packetType", "$", failures)
    if packet_type is not None and packet_type not in PACKET_TYPES:
        failures.append(failure(ErrorCode.REQUIRED_FIELD, "$.packetType", "unregistered packet type"))

    validate_aegis_uri(require_string(document, "packetId", "$", failures), "$.packetId", failures)
    require_string(document, "issuer", "$", failures)
    require_string(document, "audience", "$", failures)
    require_string(document, "issuedAt", "$", failures)
    validate_digest(require_string(document, "bodyDigest", "$", failures), "$.bodyDigest", failures)

    require_object(document.get("body"), "$.body", failures)
    validate_signature(document.get("signature"), "$.signature", failures)

    return invalid_result(failures) if failures else valid_result(kind="packet", packetType=packet_type)
