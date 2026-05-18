# AEGIS Python SDK

Package name: `aegis-protocol`

## Target Use Cases

- AI lab evaluation harnesses
- offline bundle validation
- provenance graph analysis
- compliance exports

## Sketch

```python
from aegis import load_manifest, validate_fixture, validate_manifest

manifest = load_manifest("supervised-remediation.manifest.json")
result = validate_manifest(manifest)

if not result.valid:
    raise RuntimeError(result.failures)
```

Validate any shared fixture:

```python
result = validate_fixture("../../examples/packets/identity-hello.packet.json")
```

## Development

```bash
python -m unittest
```
