# AEGIS Project Root

This directory is the standards body and library root for AEGIS: Adaptive Execution & Governance Integrity Standard.

AEGIS specifies how autonomous and semi-autonomous AI systems can prove:

- who initiated an action
- which agent, model, and runtime executed it
- which tools and data were used
- whether outputs or reasoning digests were modified
- whether a human approved the action
- whether the execution environment was trusted
- whether the system exceeded permissions
- whether provenance chains remain intact

The goal is a protocol-oriented metadata ecosystem: specifications, schemas, SDKs, registries, reference implementations, examples, and optional documentation surfaces. The SDKs are the center of gravity; the site is a companion.

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

## Credibility Anchors

- Strong schemas live in `/aegis/schemas`.
- Clear packet examples live in `/aegis/examples/packets`.
- Protocol diagrams live in `/aegis/docs/diagrams.md`.
- Deterministic terminology lives in `/aegis/docs/terminology.md`.
- RFC formatting lives in `/aegis/rfcs/0000-template.md`.
- Governance and conformance levels live in `/aegis/docs/governance.md`.
