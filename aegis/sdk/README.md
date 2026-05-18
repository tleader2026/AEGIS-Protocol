# SDKs

SDKs provide implementation support for AEGIS packets, manifests, registry lookups, signatures, and validation results.

Initial language targets:

- TypeScript for browsers, Node.js agents, and developer tools
- Python for labs, audits, and offline verification
- Go for registries, admission controllers, and high-throughput validators

SDKs must expose validation failures as structured results and avoid making hidden policy decisions.
