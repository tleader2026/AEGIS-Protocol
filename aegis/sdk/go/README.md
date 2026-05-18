# AEGIS Go SDK

Module: `github.com/aegis-protocol/aegis/sdk/go`

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

## Development

```bash
go test ./...
```
