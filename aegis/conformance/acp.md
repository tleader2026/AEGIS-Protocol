# AEGIS-ACP-1.0-draft

AEGIS-ACP-1.0-draft defines the conformance profile for accountable Agent Communication Protocol sessions.

## Scope

An ACP implementation is AEGIS-conformant when session lifecycle and execution activity can produce signed `ProvenanceEnvelope` records for:

- session establishment
- participant identity
- message exchange
- delegation
- state checkpoints
- execution claims
- session closure

## Required Envelope Mapping

| ACP surface | AEGIS field |
| --- | --- |
| ACP protocol version | `transport.protocolVersion` |
| ACP session | `session.sessionId` |
| participant identity | `actor.agentId`, `actor.issuer` |
| message | `execution.claims[].claimType = "agent.message"` |
| delegation | `execution.claims[].claimType = "agent.delegate"` |
| state transition | `execution.claims[].claimType = "state.checkpoint"` |

## Conformance Requirements

ACP implementations MUST:

- bind each accountable session to an AEGIS `sessionId`
- bind the runtime to a `machine.machineId` and `machine.runtimeId`
- emit execution claims for messages, delegations, checkpoints, and session closure
- sign each `ProvenanceEnvelope`

ACP implementations SHOULD:

- include parent session references for nested or delegated sessions
- preserve lineage across session handoffs
- expose export and verification hooks for downstream record consumers

## Non-Goals

This profile does not replace ACP. It defines the AEGIS evidence required for ACP sessions to be accountable.
