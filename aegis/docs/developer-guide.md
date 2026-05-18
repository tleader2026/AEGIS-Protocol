# Developer Guide

AEGIS implementers usually build one of five roles:

- agent runtime
- verifier
- registry
- policy engine
- explorer or observability surface

## Minimal Verification Flow

1. Parse the `AegisManifest`.
2. Canonicalize protocol objects.
3. Resolve `AgentIdentity`.
4. Verify `IntentCertificate` signatures and scopes.
5. Verify `ExecutionEnvelope` digests and runtime attestations.
6. Walk `ProvenanceBlock` parent links.
7. Validate `ImpactReceipt` and human approval requirements.
8. Check revocation and registry inclusion evidence.

## CLI Sketch

```bash
aegis verify ./manifest.aegis --registry aegis.registry://cloud/root
aegis packet inspect ./packet.json --explain
aegis provenance graph sha256:65a31b --format dot
aegis registry reconcile ./offline-transfer.aegis
```

## SDK Principles

- Keep cryptographic defaults conservative.
- Make validation failures explicit and typed.
- Avoid hiding policy decisions inside the SDK.
- Permit private or air-gapped registries.
- Support selective disclosure for sensitive lineage.
