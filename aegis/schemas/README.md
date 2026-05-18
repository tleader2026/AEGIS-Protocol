# Schemas

This directory contains canonical JSON Schema definitions for AEGIS protocol objects.

Draft object set:

- `AegisManifest`
- `AegisPacket`
- `AgentIdentity`
- `IntentCertificate`
- `ExecutionEnvelope`
- `ProvenanceBlock`
- `TrustAssertion`
- `RuntimeSignature`
- `HumanApprovalToken`
- `SemanticLineageMap`
- `ImpactReceipt`

Shared definitions live in `defs.schema.json`. Protocol objects SHOULD reference those definitions instead of redefining identifier, digest, registry, and signature shapes.

Schemas are validation aids, not the full protocol. RFCs define normative canonicalization, cryptographic validation, registry resolution, and failure behavior.
