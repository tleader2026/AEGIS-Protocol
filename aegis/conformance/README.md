# Conformance

AEGIS conformance is fixture-first. Implementations are expected to validate the shared examples in `/aegis/examples` and return deterministic outcomes and error codes.

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
