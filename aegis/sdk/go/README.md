# AEGIS Go SDK

Draft module: `github.com/aegis-protocol/aegis/sdk/go`

## Target Use Cases

- registry services
- admission controllers
- sidecars
- high-throughput packet validators

## Sketch

```go
result, err := aegis.VerifyManifest(ctx, manifest, aegis.VerifyOptions{
    Registry: "aegis.registry://cloud/root",
})
if err != nil {
    return err
}
if !result.Valid {
    return fmt.Errorf("invalid AEGIS manifest: %s", result.Failures[0].Message)
}
```
