import argparse
import json
import sys
from pathlib import Path
from typing import TextIO

from .kernel import create_machine_anchor
from .runtime import AegisRuntimeDaemon, JsonlRecordStore


def build_runtime(records_path: Path, runtime_id: str, region_hint: str | None = None) -> AegisRuntimeDaemon:
    machine = create_machine_anchor(runtime_id=runtime_id, region_hint=region_hint)
    return AegisRuntimeDaemon(machine=machine, store=JsonlRecordStore(records_path))


def serve_stdio(runtime: AegisRuntimeDaemon, stdin: TextIO = sys.stdin, stdout: TextIO = sys.stdout) -> None:
    for line in stdin:
        if not line.strip():
            continue
        try:
            request = json.loads(line)
            response = runtime.handle_jsonrpc(request)
        except Exception as exc:
            response = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": str(exc)}}
        stdout.write(json.dumps(response, sort_keys=True, separators=(",", ":")) + "\n")
        stdout.flush()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="AEGIS userspace runtime daemon")
    parser.add_argument("--records", default=".aegis/records.jsonl", help="JSONL record store path")
    parser.add_argument("--runtime-id", default="aegis:runtime:python-daemon", help="AEGIS runtime id")
    parser.add_argument("--region-hint", default=None, help="Optional region hint for emitted MachineAnchor")
    args = parser.parse_args(argv)

    runtime = build_runtime(Path(args.records), runtime_id=args.runtime_id, region_hint=args.region_hint)
    serve_stdio(runtime)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
