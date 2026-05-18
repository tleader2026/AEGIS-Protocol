# AEGIS Architecture

AEGIS defines a layered execution-trust protocol for AI-native systems.

Normative terminology is defined in [terminology.md](./terminology.md). Diagrams are collected in [diagrams.md](./diagrams.md).

## Layer 1: Identity

Verifiable agent identity, hardware-bound signatures, human approval chains, execution credentials, and device attestation.

Canonical objects:

- `AgentIdentity`
- `RuntimeSignature`
- `HumanApprovalToken`

## Layer 2: Intent

Signed intent declarations, permission scopes, goal declarations, human versus autonomous execution mode, and policy constraints.

Canonical objects:

- `IntentCertificate`
- `TrustAssertion`

## Layer 3: Execution

Tool usage tracking, model/runtime metadata, container attestation, reasoning hashes, and execution DAG tracking.

Canonical objects:

- `ExecutionEnvelope`
- `RuntimeSignature`

## Layer 4: Provenance

Immutable provenance graph, semantic lineage, multi-agent transaction history, data ancestry, and transformation chains.

Canonical objects:

- `ProvenanceBlock`
- `SemanticLineageMap`

## Layer 5: Impact

Actions performed, external systems touched, risk scoring, human review status, and compliance metadata.

Canonical objects:

- `ImpactReceipt`
- `AegisManifest`

## Protocol Assumptions

- Canonical JSON follows RFC 8785 JSON Canonicalization.
- Binary transport may use CBOR with deterministic encoding.
- Signatures use COSE envelopes, Ed25519, P-256, or future registered algorithms.
- Registries provide transparency, revocation, reconciliation, and witness evidence.
- Private reasoning text is not required for validation; reasoning digests and policy-bound checkpoints can be validated without disclosure.

## Packet Classes

AEGIS defines six initial packet classes:

- `aegis.identity.hello.v1`
- `aegis.intent.present.v1`
- `aegis.execution.checkpoint.v1`
- `aegis.provenance.publish.v1`
- `aegis.impact.receipt.v1`
- `aegis.registry.reconcile.v1`

Packet validation is transport-neutral. A verifier MUST validate canonical body digest, packet signature, issuer authority, expiry, nonce freshness, registry status, and packet-type-specific requirements before trusting the payload.

## Validation Outcomes

Implementations SHOULD return one of these deterministic outcomes:

- `valid`: all required checks passed.
- `invalid`: packet or manifest is malformed, expired, incorrectly signed, or cryptographically inconsistent.
- `quarantined`: evidence is structurally valid but policy, registry, trust authority, revocation, or impact constraints require isolation.
- `indeterminate`: validation depends on unavailable registry, time, witness, or selective-disclosure evidence.

Implementations MUST NOT silently coerce `quarantined` or `indeterminate` into `valid`.
