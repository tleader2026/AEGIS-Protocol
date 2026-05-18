# AEGIS Python SDK

Draft package name: `aegis-protocol`

## Target Use Cases

- AI lab evaluation harnesses
- offline bundle validation
- provenance graph analysis
- compliance exports

## Sketch

```python
from aegis import verify_manifest, RegistryClient

registry = RegistryClient("aegis.registry://gov.us/root")
result = verify_manifest("supervised-remediation.manifest.json", registry=registry)

if not result.valid:
    raise RuntimeError(result.failures)
```
