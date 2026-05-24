# Schemas

This directory contains canonical JSON Schema definitions for AEGIS protocol objects.

Draft object set:

- `AegisManifest`
- `AegisPacket`
- `ProvenanceEnvelope`
- `AgentIdentity`
- `IntentCertificate`
- `ExecutionEnvelope`
- `ProvenanceBlock`
- `TrustAssertion`
- `RuntimeSignature`
- `HumanApprovalToken`
- `SemanticLineageMap`
- `ImpactReceipt`

`ProvenanceEnvelope` is the primary operational record for AEGIS-conformant transport sessions. MCP, A2A, and ACP implementations prove conformance by producing signed envelopes that bind session, machine, runtime, declared intent, execution claims, and lineage.

Shared definitions live in `defs.schema.json`. Protocol objects SHOULD reference those definitions instead of redefining identifier, digest, registry, and signature shapes.

Schemas are validation aids, not the full protocol. RFCs define normative canonicalization, cryptographic validation, registry resolution, and failure behavior.
