# ADR-0002: Transport Conformance with Unmodified Protocols

## Status

Accepted

## Context

MCP, A2A, and ACP define agent communication surfaces. AEGIS needs to hold those surfaces accountable without forking or replacing them.

## Decision

AEGIS defines transport conformance profiles and reference implementations for MCP, A2A, and ACP. These implementations act as thin interceptors and emit signed `ProvenanceEnvelope` records while leaving the underlying transports unmodified.

## Consequences

- Existing transport ecosystems can adopt AEGIS incrementally.
- AEGIS conformance can be tested through fixtures and SDK behavior.
- The project must maintain transport-specific conformance profiles alongside the transport-neutral record model.

## Alternatives Considered

- Define a new agent transport protocol.
- Modify MCP, A2A, or ACP directly.
- Treat transport implementations as optional future adapters rather than part of the MVP.
