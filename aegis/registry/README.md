# AEGIS Registry

AEGIS registries provide identity resolution, trust assertions, revocation, transparency, and reconciliation.

## Registry Responsibilities

- publish trust roots
- resolve agent identities
- publish revocation material
- witness provenance blocks
- provide Merkle inclusion and consistency proofs
- support delayed reconciliation for air-gapped or orbital networks

## Registry API Surface

```http
GET  /v1/identity/{did}
GET  /v1/trust/{assertionId}
GET  /v1/revocations
POST /v1/provenance/witness
POST /v1/reconcile
GET  /v1/consistency/{treeSize}
```

Responses MUST be signed by a registry key advertised in the registry root document.

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

## Root Document

```json
{
  "registry": "aegis.registry://enterprise.example/root",
  "operator": "did:web:enterprise.example",
  "keys": [
    {
      "kid": "aegis.registry://enterprise.example/root#2026-q2",
      "alg": "EdDSA",
      "purpose": ["witness", "revocation", "reconciliation"]
    }
  ],
  "policy": "sha256:4a9d9ec0b44e52ad82bdf20a191c7a91c0ffee1111cfe31baa10bb08",
  "witnesses": ["aegis.registry://cloud.provider/root"],
  "validUntil": "2026-07-01T00:00:00Z"
}
```
