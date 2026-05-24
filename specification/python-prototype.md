# Python Prototype Plan

The Python implementation is the first AEGIS reference implementation.

## Goals

- Provide the canonical developer experience for AEGIS metadata objects.
- Provide a userspace runtime daemon with JSON-RPC methods.
- Produce valid `ProvenanceEnvelope` records for MCP and A2A sessions.
- Support JSONL record storage and query.
- Run on Windows 11, macOS, Linux, and Raspberry Pi OS.

## Package Shape

Current package: `aegis-protocol`

Planned module boundaries:

- `aegis.metadata`: canonical object model
- `aegis.provenance`: envelope validation
- `aegis.runtime`: userspace runtime daemon
- `aegis.kernel`: userspace machine anchor and attestation evidence
- `aegis.transports`: MCP, A2A, and ACP conformance implementations
- `aegis.daemon`: stdio JSON-RPC daemon entrypoint

Future packages may split into:

- `aegis-metadata`
- `aegis-protocol`
- `aegis-runtime`
- `aegis-mcp`
- `aegis-a2a`
- `aegis-acp`

The monorepo package remains preferred until the reference implementation has passing tests and stable object boundaries.

## Immediate Prototype Milestones

1. Run Python tests in CI.
2. Replace development signatures with a real Ed25519 implementation.
3. Add CLI commands for `verify`, `query`, and `serve`.
4. Add MCP and A2A smoke examples.
5. Add Raspberry Pi runtime smoke test documentation.
