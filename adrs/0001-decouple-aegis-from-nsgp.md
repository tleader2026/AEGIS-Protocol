# ADR-0001: Decouple AEGIS from NSGP

## Status

Accepted

## Context

AEGIS produces provenance records for accountable AI execution. NSGP may later consume those records for scale-governance analytics, but coupling AEGIS to NSGP would make adoption harder and blur the boundary between evidence and policy.

## Decision

AEGIS does not know NSGP exists. AEGIS emits signed, queryable `ProvenanceEnvelope` records. NSGP is a downstream read-only consumer.

## Consequences

- AEGIS can be adopted by developers, enterprises, auditors, and researchers without accepting any governance framework.
- NSGP can evolve independently once real AEGIS records exist.
- AEGIS record design must remain queryable by session, machine, transport, time window, jurisdiction hints, and lineage chain.

## Alternatives Considered

- Have AEGIS call NSGP policy checks directly.
- Treat NSGP as a required governance layer for all AEGIS deployments.
