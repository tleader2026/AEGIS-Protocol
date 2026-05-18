# AEGIS

Adaptive Execution & Governance Integrity Standard

AEGIS is a draft open-source protocol specification and developer ecosystem for AI provenance, agent identity, signed intent, runtime attestation, semantic lineage, and accountable execution impact.

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
- `/aegis/sdk` contains language SDK design notes and starter interfaces.
- `/aegis/examples` contains packet, manifest, and provenance examples.
- `/aegis/reference-implementations` contains reference component plans and conformance notes.
- `/aegis/registry` contains trust registry, federation, and reconciliation models.
- `/aegis/site` contains the Next.js public standards portal.

## Site Development

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
