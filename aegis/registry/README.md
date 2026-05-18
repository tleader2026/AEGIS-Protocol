# AEGIS Registry

AEGIS registries provide identity resolution, trust assertions, revocation, transparency, and reconciliation.

## Registry Responsibilities

- publish trust roots
- resolve agent identities
- publish revocation material
- witness provenance blocks
- provide Merkle inclusion and consistency proofs
- support delayed reconciliation for air-gapped or orbital networks

## Federation Model

Federations can cross-witness one another without merging authority:

```yaml
namespace: aegis://gov.us/critical-infrastructure
witnesses:
  - aegis://cloud.provider/root
  - aegis://browser.vendor/root
revocation: https://registry.example/revocations.cbor
reconciliation: merkle-consistency-v1
```
