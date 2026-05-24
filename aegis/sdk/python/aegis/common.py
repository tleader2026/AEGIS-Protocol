import json
import re
from pathlib import Path
from typing import Any

from .errors import ErrorCode
from .validation import ValidationFailure, failure

AEGIS_VERSION = "1.0-draft"
AEGIS_URI_RE = re.compile(r"^aegis:(manifest|intent|exec|prov|impact|trust|runtime|approval|semantic|packet|session|machine|envelope):[A-Za-z0-9._:-]+$")
DIGEST_RE = re.compile(r"^(sha256|sha512-256):[A-Fa-f0-9]{16,128}$")


def load_json(path: str | Path) -> dict[str, Any]:
    with Path(path).open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError("AEGIS documents must be JSON objects")
    return value


def require_object(value: Any, path: str, failures: list[ValidationFailure]) -> bool:
    if not isinstance(value, dict):
        failures.append(failure(ErrorCode.TYPE, path, "expected object"))
        return False
    return True


def require_string(document: dict[str, Any], key: str, path: str, failures: list[ValidationFailure]) -> str | None:
    value = document.get(key)
    if not isinstance(value, str) or not value:
        failures.append(failure(ErrorCode.REQUIRED_FIELD, f"{path}.{key}", "required non-empty string"))
        return None
    return value


def require_array(document: dict[str, Any], key: str, path: str, failures: list[ValidationFailure]) -> list[Any] | None:
    value = document.get(key)
    if not isinstance(value, list):
        failures.append(failure(ErrorCode.REQUIRED_FIELD, f"{path}.{key}", "required array"))
        return None
    return value


def validate_aegis_uri(value: str | None, path: str, failures: list[ValidationFailure]) -> None:
    if value is None:
        return
    if not AEGIS_URI_RE.match(value):
        failures.append(failure(ErrorCode.IDENTIFIER, path, "invalid AEGIS URI"))


def validate_digest(value: str | None, path: str, failures: list[ValidationFailure]) -> None:
    if value is None:
        return
    if not DIGEST_RE.match(value):
        failures.append(failure(ErrorCode.DIGEST_MISMATCH, path, "invalid digest syntax"))


def validate_signature(value: Any, path: str, failures: list[ValidationFailure]) -> None:
    if not isinstance(value, dict):
        failures.append(failure(ErrorCode.SIGNATURE_INVALID, path, "signature must be an object"))
        return
    for key in ("alg", "kid", "value"):
        if not isinstance(value.get(key), str) or not value[key]:
            failures.append(failure(ErrorCode.SIGNATURE_INVALID, f"{path}.{key}", "signature field is required"))
