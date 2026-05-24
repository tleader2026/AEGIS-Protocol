# Conformance

AEGIS conformance is fixture-first. Implementations are expected to validate the shared examples in `/aegis/examples` and return deterministic outcomes and error codes.

AEGIS is not a wrapper around MCP, A2A, or ACP. AEGIS is the execution and provenance standard those transport layers must uphold. A transport may speak MCP, A2A, or ACP, but it is not AEGIS-conformant unless its sessions, intents, executions, and lineage produce verifiable `ProvenanceEnvelope` records.

## Transport Profiles

- [`AEGIS-MCP-1.0-draft`](./mcp.md): accountable MCP sessions, tool calls, resources, prompts, and server/client identity.
- [`AEGIS-A2A-1.0-draft`](./a2a.md): accountable agent-to-agent messages, delegation, task state, and handoff lineage.
- [`AEGIS-ACP-1.0-draft`](./acp.md): accountable ACP session lifecycle, communication, execution claims, and delegation.

## Levels

- `AEGIS-Core`: packet parsing, identifiers, digests, signatures, and manifest structure.
- `AEGIS-Runtime`: execution envelopes, runtime signatures, checkpoints, and attestation adapters.
- `AEGIS-Provenance`: provenance block graphs, semantic lineage, and artifact ancestry.
- `AEGIS-Registry`: identity resolution, trust assertions, revocation, witness, and reconciliation.
- `AEGIS-Impact`: impact receipts, human approval tokens, risk metadata, and review state.

## Fixture Contract

Each SDK MUST validate:

- `examples/supervised-remediation.manifest.json`
- every `examples/packets/*.packet.json`
- every `examples/provenance/*.provenance.json`

Each SDK SHOULD expose:

- a typed validation result
- a deterministic outcome string
- stable error codes
- an implementation metadata map

## Expected Result Shape

```json
{
  "outcome": "valid",
  "failures": [],
  "metadata": {
    "kind": "manifest",
    "manifestId": "aegis:manifest:01JZK7QYB4R3"
  }
}
```

## Non-Goals

The current conformance fixtures do not yet prove cryptographic signature validity, registry availability, or hardware attestation. Those checks are adapter-backed until the relevant RFCs reach candidate-standard status.

NSGP is not part of AEGIS conformance. NSGP is a downstream read-only consumer of AEGIS records.
