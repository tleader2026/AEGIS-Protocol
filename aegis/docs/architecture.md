# AEGIS Architecture

AEGIS defines a layered execution-trust protocol for AI-native systems.

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
