# AEGIS SDKs

AEGIS SDKs provide reference implementations for the protocol objects, validation rules, runtime handshake, and transport conformance profiles.

## Current SDKs

- [Python](./python): reference implementation and runtime daemon.
- [Go](./go): infrastructure-oriented validator for manifests, packets, and provenance envelopes.
- [TypeScript](./typescript): planned web and agent developer SDK.

SDKs must expose validation failures as structured results and avoid making hidden policy decisions.

## Minimum Common API

Every SDK SHOULD expose:

- `load_manifest`
- `load_packet`
- `load_provenance_envelope`
- `validate_manifest`
- `validate_packet`
- `validate_provenance_envelope`
- `ValidationResult`
- deterministic validation outcome values: `valid`, `invalid`, `quarantined`, `indeterminate`
- deterministic error codes such as `AEGIS_E_PARSE`, `AEGIS_E_DIGEST_MISMATCH`, and `AEGIS_E_SIGNATURE_INVALID`
- `validate_fixture` or equivalent conformance helper

Cryptographic verification, registry resolution, and attestation verification MAY be adapter-backed until the relevant RFCs stabilize.

## Publish Order

1. Python: complete reference implementation, tests, and PyPI package.
2. Go: module tag release for infrastructure and services.
3. TypeScript: MCP-heavy developer workflows.
4. Rust: safe core implementation and C-compatible FFI.
5. Java / .NET: enterprise adoption.
