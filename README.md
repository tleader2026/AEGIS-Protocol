# AEGIS

Adaptive Execution & Governance Integrity Standard

AEGIS is a draft open-source metadata library and protocol specification for AI provenance, agent identity, signed intent, runtime attestation, semantic lineage, and accountable execution impact.

The primary artifact is not a website. The primary artifact is a deployable, language-neutral metadata layer that agentic AI systems can embed to create, exchange, validate, and preserve execution provenance records.

> The internet authenticated machines. AEGIS authenticates intelligence.

## Repository Topology

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

## What Is Here

- `/aegis/docs` contains protocol architecture, governance, and developer documentation.
- `/aegis/rfcs` contains the RFC process and proposal templates.
- `/aegis/schemas` contains canonical protocol object schemas and examples.
- `/aegis/sdk` contains deployable language libraries for creating and validating AEGIS metadata.
- `/aegis/examples` contains packet, manifest, and provenance examples.
- `/aegis/reference-implementations` contains reference component plans and conformance notes.
- `/aegis/registry` contains trust registry, federation, and reconciliation models.
- `/aegis/site` contains an optional documentation and demo portal.

## Library Development

Python:

```bash
cd aegis/sdk/python
python -m unittest
```

Go:

```bash
cd aegis/sdk/go
go test ./...
```

## Credibility Anchors

- Strong schemas: `/aegis/schemas`
- Packet examples: `/aegis/examples/packets`
- Diagrams: `/aegis/docs/diagrams.md`
- RFC formatting: `/aegis/rfcs/0000-template.md`
- Deterministic terminology: `/aegis/docs/terminology.md`
- Governance: `/aegis/docs/governance.md`

## Optional Site Development

```bash
cd aegis/site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
cd aegis/site
npm run build
```

## Status

AEGIS is written as a serious draft infrastructure standard. It is not a cryptocurrency, token system, NFT provenance proposal, or blockchain-first architecture. It is designed for interoperability across labs, governments, browsers, cloud providers, autonomous agents, robotics, media systems, enterprise AI platforms, and distributed inference networks.

## License

Apache License 2.0. See [LICENSE](LICENSE).
