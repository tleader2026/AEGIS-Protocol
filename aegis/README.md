# AEGIS Project Root

This directory is the standards body root for AEGIS: Adaptive Execution & Governance Integrity Standard.

AEGIS specifies how autonomous and semi-autonomous AI systems can prove:

- who initiated an action
- which agent, model, and runtime executed it
- which tools and data were used
- whether outputs or reasoning digests were modified
- whether a human approved the action
- whether the execution environment was trusted
- whether the system exceeded permissions
- whether provenance chains remain intact

The goal is a protocol-oriented ecosystem: specifications, schemas, SDKs, registries, reference implementations, examples, and a public developer portal.

## Topology

```text
/aegis
  /docs
  /rfcs
  /schemas
  /sdk
    /typescript
    /python
    /go
  /examples
  /reference-implementations
  /registry
  /site
```

## Design Posture

AEGIS composes with C2PA, OAuth, TLS, MCP, OpenTelemetry, Kubernetes, SBOM ecosystems, DID methods, COSE, and transparency logs. It does not require a single global authority or chain-specific trust model.
