# AEGIS Architecture

AEGIS defines a layered execution-trust protocol for AI-native systems. It is not a wrapper around agent transports. AEGIS is the Adaptive Execution & Governance Integrity Standard: the cross-transport execution integrity and provenance standard that accountable agent systems conform to.

Normative terminology is defined in [terminology.md](./terminology.md). Diagrams are collected in [diagrams.md](./diagrams.md).

```text
+-----------------------------------------------------+
| NSGP                                                |
| Natural Scale Governance Protocol                   |
| Read-only observability analytics                   |
| Queries ProvenanceEnvelopes; no coupling downward   |
+-----------------------------------------------------+
| AEGIS Transport Implementations                     |
| aegis-mcp / aegis-a2a / aegis-acp                   |
| Thin interceptors; transports remain unmodified     |
+-----------------------------------------------------+
| MCP / A2A / ACP                                     |
| Transport protocols; untouched                      |
+-----------------------------------------------------+
| AEGIS Protocol Layer                                |
| JSON-RPC handshake                                  |
| hello -> negotiate -> bindSession -> submitIntent   |
| -> attestRuntime -> recordExecution                 |
| -> resolveLineage -> closeSession                   |
+-----------------------------------------------------+
| AEGIS Metadata Layer                                |
| JSON Schemas; canonical object definitions          |
| Python: aegis-metadata / aegis-protocol             |
|         aegis-runtime / aegis-mcp / aegis-a2a       |
| Objects: AgentIdentity, MachineAnchor,              |
|          SessionBridge, IntentRecord,               |
|          ExecutionClaim, RuntimeAttestation,        |
|          LineageRecord, ProvenanceEnvelope          |
+-----------------------------------------------------+
| AEGIS Runtime Daemon                                |
| Local trust anchor (userspace MVP)                  |
| Session lifecycle, signing, attestation hooks       |
| Later: eBPF -> TPM2 -> secure enclave -> hardware   |
+-----------------------------------------------------+
| C Core Primitive (aegis_core)                       |
| Boring, durable, stable ABI                         |
| aegis_record_hash() / aegis_record_validate()       |
| aegis_signature_verify() / aegis_session_bind()     |
| aegis_attestation_verify()                          |
+-----------------------------------------------------+
| Kernel / Hardware Layer                             |
| TPM2 attestation; machine identity anchor           |
| Secure enclave; signing key protection              |
| eBPF hooks (future); kernel-level observability     |
+-----------------------------------------------------+
| Orbital Layer (future network trust root)           |
| Satellite ASIC stamping at each routing hop         |
| DTN / Bundle Protocol custody chain                 |
| Stamps feed up into ProvenanceEnvelope              |
| Physical tamper-resistance; above all ground law    |
+-----------------------------------------------------+
```
AEGIS does not know NSGP exists. NSGP is a downstream consumer of AEGIS records. The only downstream-driven design constraint is that `ProvenanceEnvelope` records must be queryable by session, machine, transport, time window, jurisdiction hints, and lineage chain.

## Core Boundary

MCP, A2A, and ACP define how agents communicate. AEGIS defines what accountable execution evidence those sessions must produce. NSGP later interprets that evidence at governance scale.

The AEGIS transport implementations (`aegis-mcp`, `aegis-a2a`, and `aegis-acp`) are thin interceptors. They do not fork, replace, or redefine MCP, A2A, or ACP. They make those sessions AEGIS-conformant by emitting signed provenance records.

The kernel/hardware layer starts as a userspace machine-anchor collector so the MVP is testable on Windows 11, macOS, Linux, and Raspberry Pi OS. eBPF, TPM2, secure enclave, and hardware roots are strengthening paths, not prerequisites for the first runnable implementation.

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

## Build Order

1. `aegis-core`: schemas, canonical records, hashing, signatures, verification.
2. `aegis-runtime`: JSON-RPC handshake, session binding, local record store.
3. `aegis_core`: C primitive with stable ABI for hashing, validation, signature checks, session binding, and attestation verification.
4. `aegis-mcp`: AEGIS MCP conformance implementation.
5. `aegis-a2a`: AEGIS A2A conformance implementation.
6. `aegis-acp`: AEGIS ACP conformance implementation.
7. `aegis-cli`: inspect, verify, query, export.
8. `nsgp`: later, read-only consumer of AEGIS records.

## Record Flow

```text
Transport session
  -> AEGIS runtime handshake
  -> signed ProvenanceEnvelope
  -> local or remote AEGIS record store
  -> verifier / auditor / downstream governance analytics
```
