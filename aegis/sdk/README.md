# SDKs

SDKs provide deployable implementation support for AEGIS packets, manifests, registry lookups, signatures, and validation results.

Initial language targets:

- TypeScript for browsers, Node.js agents, and developer tools
- Python for labs, audits, and offline verification
- Go for registries, admission controllers, and high-throughput validators

SDKs must expose validation failures as structured results and avoid making hidden policy decisions.

## Minimum Common API

Every SDK SHOULD expose:

- `load_manifest`
- `load_packet`
- `validate_manifest`
- `validate_packet`
- `ValidationResult`
- deterministic validation outcome values: `valid`, `invalid`, `quarantined`, `indeterminate`
- deterministic error codes such as `AEGIS_E_PARSE`, `AEGIS_E_DIGEST_MISMATCH`, and `AEGIS_E_SIGNATURE_INVALID`

Cryptographic verification, registry resolution, and attestation verification MAY be adapter-backed until the relevant RFCs stabilize.
