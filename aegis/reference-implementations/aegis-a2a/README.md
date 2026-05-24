# AEGIS A2A Implementation

`aegis-a2a` is the AEGIS transport implementation for accountable agent-to-agent sessions.

It does not replace A2A. It makes A2A exchanges AEGIS-conformant by emitting signed `ProvenanceEnvelope` records for:

- agent messages
- task delegation
- handoff lineage
- state checkpoints
- session open and close events

## Python MVP

The initial implementation is exposed as `AegisA2aSession` in the Python SDK.

```python
from aegis import AegisA2aSession

session = AegisA2aSession(
    runtime=runtime,
    protocol_version="0.1-draft",
    endpoint="a2a://agent/researcher",
    session_id="aegis:session:a2a-demo",
    agent_id="aegis-agent:planner",
    issuer="did:web:aegis.dev",
)
```

See `aegis/examples/provenance/a2a-delegation.provenance.json` for the fixture.
