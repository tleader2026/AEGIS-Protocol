# AEGIS Python SDK

Package name: `aegis-protocol`

## Target Use Cases

- AI lab evaluation harnesses
- offline bundle validation
- provenance graph analysis
- compliance exports

## Sketch

```python
from aegis import load_manifest, validate_fixture, validate_manifest

manifest = load_manifest("supervised-remediation.manifest.json")
result = validate_manifest(manifest)

if not result.valid:
    raise RuntimeError(result.failures)
```

Validate any shared fixture:

```python
result = validate_fixture("../../examples/packets/identity-hello.packet.json")
```

Validate a transport conformance record:

```python
from aegis import load_provenance_envelope, validate_provenance_envelope

envelope = load_provenance_envelope("../../examples/provenance/mcp-tool-call.provenance.json")
result = validate_provenance_envelope(envelope)

if not result.valid:
    raise RuntimeError(result.failures)
```

Create a local accountable MCP session:

```python
from pathlib import Path
from aegis import AegisMcpSession, AegisRuntimeDaemon, JsonlRecordStore, MachineAnchor

runtime = AegisRuntimeDaemon(
    machine=MachineAnchor(
        machine_id="aegis:machine:workstation",
        runtime_id="aegis:runtime:python",
        region_hint="US",
    ),
    store=JsonlRecordStore(Path(".aegis/records.jsonl")),
)

session = AegisMcpSession(
    runtime=runtime,
    protocol_version="2025-03-26",
    endpoint="mcp://local/filesystem",
    session_id="aegis:session:demo",
    agent_id="aegis-agent:demo",
    issuer="did:web:aegis.dev",
)

session.open()
session.submit_intent("aegis:intent:demo", "Read a local file through MCP.")
session.tool_call("aegis:exec:readme-read", "filesystem.read", {"path": "README.md"})
session.resolve_lineage([])
envelope = session.publish("aegis:envelope:demo")
```

Create an accountable A2A delegation:

```python
from aegis import AegisA2aSession

a2a = AegisA2aSession(
    runtime=runtime,
    protocol_version="0.1-draft",
    endpoint="a2a://agent/researcher",
    session_id="aegis:session:a2a-demo",
    agent_id="aegis-agent:planner",
    issuer="did:web:aegis.dev",
)

a2a.open()
a2a.submit_intent("aegis:intent:a2a-demo", "Delegate a bounded task to a researcher agent.")
a2a.delegate("aegis:exec:a2a-delegate", "aegis-agent:researcher", {"task": "summarize"})
a2a.message("aegis:exec:a2a-message", "aegis-agent:researcher", {"status": "accepted"})
a2a.resolve_lineage(["aegis:envelope:demo"])
a2a_envelope = a2a.publish("aegis:envelope:a2a-demo")
```

Run the userspace runtime daemon:

```bash
python -m aegis.daemon --records .aegis/records.jsonl --region-hint US
```

On Raspberry Pi OS:

```bash
python3 -m aegis.daemon --records /tmp/aegis-records.jsonl
```

The daemon collects a userspace `MachineAnchor` with platform evidence. Later releases can replace or strengthen that evidence with eBPF, TPM2, secure enclave, or hardware-backed attestation.

## Development

```bash
python -m unittest
```
