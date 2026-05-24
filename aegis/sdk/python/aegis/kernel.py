import hashlib
import os
import platform
import socket
import uuid
from pathlib import Path
from typing import Any

from .metadata import MachineAnchor, sha256_digest


def collect_machine_evidence() -> dict[str, Any]:
    evidence: dict[str, Any] = {
        "system": platform.system(),
        "release": platform.release(),
        "machine": platform.machine(),
        "processor": platform.processor(),
        "hostname": socket.gethostname(),
        "node": uuid.getnode(),
    }

    machine_id = _read_first_existing(
        [
            Path("/etc/machine-id"),
            Path("/var/lib/dbus/machine-id"),
        ]
    )
    if machine_id:
        evidence["linuxMachineIdDigest"] = sha256_digest(machine_id)

    if platform.system() == "Darwin":
        evidence["darwinHostId"] = os.environ.get("HOSTID", "")

    if platform.system() == "Windows":
        evidence["windowsMachineGuidDigest"] = _windows_machine_guid_digest()

    return evidence


def create_machine_anchor(runtime_id: str, machine_id: str | None = None, region_hint: str | None = None) -> MachineAnchor:
    evidence = collect_machine_evidence()
    resolved_machine_id = machine_id or _default_machine_id(evidence)
    return MachineAnchor(
        machine_id=resolved_machine_id,
        runtime_id=runtime_id,
        attestation_digest=sha256_digest(evidence),
        region_hint=region_hint,
    )


def _default_machine_id(evidence: dict[str, Any]) -> str:
    digest = hashlib.sha256(repr(sorted(evidence.items())).encode("utf-8")).hexdigest()[:16]
    return f"aegis:machine:{digest}"


def _read_first_existing(paths: list[Path]) -> str | None:
    for path in paths:
        try:
            value = path.read_text(encoding="utf-8").strip()
        except OSError:
            continue
        if value:
            return value
    return None


def _windows_machine_guid_digest() -> str | None:
    try:
        import winreg

        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Cryptography") as key:
            value, _ = winreg.QueryValueEx(key, "MachineGuid")
            return sha256_digest(str(value))
    except Exception:
        return None
