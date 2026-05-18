from pathlib import Path

from .manifest import load_manifest, validate_manifest
from .packet import load_packet, validate_packet
from .validation import ValidationResult


def validate_fixture(path: str | Path) -> ValidationResult:
    fixture_path = Path(path)
    if fixture_path.name.endswith(".packet.json"):
        return validate_packet(load_packet(fixture_path))
    return validate_manifest(load_manifest(fixture_path))
