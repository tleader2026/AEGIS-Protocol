# AEGIS Protocol Specification

Status: `1.0-draft`

## 1. Purpose

AEGIS defines a cross-transport standard for accountable AI execution provenance. It records who initiated an action, which agent and runtime performed it, what intent was declared, what execution claims occurred, and how the result connects to prior lineage.

AEGIS does not define governance policy. It produces verifiable evidence.

## 2. Layering

```text
MCP / A2A / ACP
transport protocols

AEGIS transport implementations
conformance emitters for accountable sessions

AEGIS runtime
session lifecycle, signing, attestation hooks, record storage

AEGIS metadata
canonical schemas and object definitions

AEGIS core
hashing, validation, signature verification, session binding, attestation verification
```

NSGP and other downstream systems may consume AEGIS records, but AEGIS has no dependency on them.

## 3. Core Record

The core operational record is `ProvenanceEnvelope`.

An envelope MUST include:

- `aegisVersion`
- `envelopeId`
- `transport`
- `session`
- `machine`
- `actor`
- `intent`
- `execution`
- `lineage`
- `issuedAt`
- `signature`

An envelope SHOULD include `jurisdictionHints` when reliable region, data-residency, or policy-domain metadata is available.

## 4. JSON-RPC Runtime Methods

The runtime interface defines these methods:

- `aegis.hello`
- `aegis.negotiate`
- `aegis.bindSession`
- `aegis.submitIntent`
- `aegis.attestRuntime`
- `aegis.recordExecution`
- `aegis.resolveLineage`
- `aegis.publishEnvelope`
- `aegis.verifyEnvelope`
- `aegis.queryEnvelopes`
- `aegis.closeSession`

Each method MUST return a JSON-RPC 2.0 response.

## 5. Transport Conformance

A transport is AEGIS-conformant when its accountable sessions emit valid signed `ProvenanceEnvelope` records.

Initial conformance profiles:

- `AEGIS-MCP-1.0-draft`
- `AEGIS-A2A-1.0-draft`
- `AEGIS-ACP-1.0-draft`

## 6. Queryability

AEGIS record stores MUST support indexing or efficient filtering by:

- `envelopeId`
- `session.sessionId`
- `machine.machineId`
- `machine.runtimeId`
- `transport.kind`
- `transport.conformanceProfile`
- `actor.agentId`
- `issuedAt`
- `lineage.parents[]`
- `execution.claims[].claimType`
- `jurisdictionHints[]`

## 7. Security Model

The draft implementation uses development signatures and adapter-backed attestation. Candidate-standard releases MUST define normative canonicalization, cryptographic signing, key management, revocation, attestation verification, and replay protection.
