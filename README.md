# AEGIS
## Adaptive Execution & Governance Integrity Standard

> *The internet authenticated machines. AEGIS authenticates intelligence.*

---

AEGIS is an open-source metadata library and protocol specification for AI provenance, agent identity, runtime attestation, semantic lineage, and accountable execution impact.

The primary artifact is a deployable, language-neutral metadata layer that agentic AI systems can embed to create, exchange, validate, and preserve execution provenance records.

---

## Start Here

If you are new to AEGIS, read [FRAMEWORK.md](./FRAMEWORK.md) first.

The framework document walks four layers in sequence — philosophy, technology, geopolitics, and protocol — and explains why each layer is necessary. The protocol specification makes full sense only in the context of the layers beneath it. Most provenance proposals fail because they are designed without a theory of governance. AEGIS is designed with one.

---

## What AEGIS Is

AEGIS is infrastructure for a world where AI agents act consequentially on behalf of humans — writing files, executing code, managing systems, taking actions across organizational and national boundaries — and where the question "who authorized this, and can you prove it?" must have a cryptographically verifiable answer.

The core insight is that **the agent is a bridge, not a process.**

In conventional cloud computing, a user connects to a virtual machine that abstracts the underlying hardware. The hardware is invisible. Accountability stops at the abstraction layer.

In the AEGIS model, an agent session is a live coupling between two physical realities: the end-user's hardware and the cluster node executing the model. The protocol stamps this coupling at the network layer — not at the application layer, where it can be forged. The stamp is produced by satellite ASICs routing the session traffic, above any single jurisdiction's control.

**Agent identity** in AEGIS is compound: session plus machine. The session carries continuity of purpose. The machine provides continuity of physical location. If the machine changes, the session persists — and the identity record updates to reflect the transition. Every machine the session touches is part of the provenance chain.

---

## What AEGIS Is Not

AEGIS is not a cryptocurrency, token system, NFT provenance proposal, or blockchain-first architecture.

AEGIS is not a logging system. Logs can be deleted. Provenance records stamped at the satellite layer cannot be altered after the fact by the parties to the transaction.

AEGIS is not a replacement for C2PA, OAuth, TLS, OpenTelemetry, or SBOM ecosystems. It is the layer that connects these standards in the context of agentic AI execution.

---

## Architecture Overview

```
[Orbital Layer]     Satellite ASIC stamping — neutral trust root above all jurisdictions
      ↑
[Agent Layer]       Session bridges user machine ↔ cluster node (not via VM)
      ↑
[Cloud Layer]       Cluster nodes, racks, data centers — stampable compute substrate
      ↑
[Kernel Layer]      Hardware attestation — the physical anchor
```

The orbital layer is not speculative infrastructure. LEO satellite constellations with inter-satellite laser links are already deployed. The transition from ground-based telco routing to orbital routing is underway. AEGIS is designed for the network topology that is arriving, not the one that is departing.

---

## Repository Structure

```
/aegis
  /docs                 Protocol architecture, governance, developer documentation
  /rfcs                 RFC process and proposal templates
  /schemas              Canonical protocol object schemas and examples
  /sdk
    /typescript
    /python
    /go
  /conformance          Shared fixture metadata and compliance expectations
  /examples             Packet, manifest, and provenance examples
  /reference-implementations
  /registry             Trust registry, federation, and reconciliation models
  /site                 Documentation and demo portal
```

---

## Getting Started

**Read the framework:**
```
FRAMEWORK.md
```

**Run the Python SDK:**
```bash
cd aegis/sdk/python
python -m unittest
```

**Run the Go SDK:**
```bash
cd aegis/sdk/go
go test ./...
```

**Inspect conformance fixtures:**
```
aegis/conformance/fixtures.json
```

**Run the documentation site locally:**
```bash
cd aegis/site
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## Status

AEGIS is a serious draft infrastructure standard. It is not a research paper. It is not a whitepaper. It is designed for deployment.

The protocol is early. The architecture is not. Four years of foundational work — in philosophy, technology, geopolitics, and protocol design — precede what you are reading. The repository is the surface. The framework document is the depth.

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the RFC process and contribution guidelines.

---

## License

MIT License. See [LICENSE](./LICENSE).
