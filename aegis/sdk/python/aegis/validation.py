from dataclasses import dataclass, field
from typing import Any

from .errors import ErrorCode, ValidationOutcome


@dataclass(frozen=True)
class ValidationFailure:
    code: ErrorCode
    path: str
    message: str


@dataclass(frozen=True)
class ValidationResult:
    outcome: ValidationOutcome
    failures: tuple[ValidationFailure, ...] = field(default_factory=tuple)
    metadata: dict[str, Any] = field(default_factory=dict)

    @property
    def valid(self) -> bool:
        return self.outcome == ValidationOutcome.VALID


def valid_result(**metadata: Any) -> ValidationResult:
    return ValidationResult(ValidationOutcome.VALID, metadata=metadata)


def invalid_result(failures: list[ValidationFailure]) -> ValidationResult:
    return ValidationResult(ValidationOutcome.INVALID, tuple(failures))


def failure(code: ErrorCode, path: str, message: str) -> ValidationFailure:
    return ValidationFailure(code=code, path=path, message=message)
