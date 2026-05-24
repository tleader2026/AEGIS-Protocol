# AEGIS Go SDK

Module: `github.com/tleader2026/AEGIS-Protocol/aegis/sdk/go`

## Target Use Cases

- registry services
- admission controllers
- sidecars
- high-throughput packet validators

## Sketch

```go
manifest, err := aegis.LoadManifest("supervised-remediation.manifest.json")
if err != nil {
    return err
}
result := aegis.ValidateManifest(manifest)
if !result.Valid() {
    return fmt.Errorf("invalid AEGIS manifest: %s", result.Failures[0].Message)
}
```

Validate any shared fixture:

```go
result, err := aegis.ValidateFixture("../../examples/packets/identity-hello.packet.json")
```

Validate a provenance envelope:

```go
envelope, err := aegis.LoadProvenanceEnvelope("../../examples/provenance/a2a-delegation.provenance.json")
if err != nil {
    return err
}
result := aegis.ValidateProvenanceEnvelope(envelope)
if !result.Valid() {
    return fmt.Errorf("invalid AEGIS envelope: %s", result.Failures[0].Message)
}
```

## Publishing

Go packages are published by pushing a semantic version tag for this module path:

```bash
git tag aegis/sdk/go/v0.1.0
git push origin aegis/sdk/go/v0.1.0
```

Consumers can then import:

```go
import "github.com/tleader2026/AEGIS-Protocol/aegis/sdk/go/aegis"
```

## Development

```bash
go test ./...
```
