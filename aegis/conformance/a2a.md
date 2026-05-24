# AEGIS-A2A-1.0-draft

AEGIS-A2A-1.0-draft defines the conformance profile for accountable agent-to-agent sessions.

## Scope

An A2A implementation is AEGIS-conformant when inter-agent activity can produce signed `ProvenanceEnvelope` records for:

- agent identity assertions
- messages between agents
- task delegation
- task acceptance, refusal, and completion
- handoff lineage
- session open and close events

## Required Envelope Mapping

| A2A surface | AEGIS field |
| --- | --- |
| A2A protocol version | `transport.protocolVersion` |
| sending agent | `actor.agentId` |
| receiving agent | `transport.endpoint` or claim `target` |
| delegation | `execution.claims[].claimType = "agent.delegate"` |
| message | `execution.claims[].claimType = "agent.message"` |
| prior task or artifact | `lineage.parents[]` |

## Conformance Requirements

A2A implementations MUST:

- bind each accountable exchange to an AEGIS `sessionId`
- emit execution claims for messages and delegations that cross an agent boundary
- preserve lineage when a downstream agent acts on upstream output
- sign each `ProvenanceEnvelope`

A2A implementations SHOULD:

- identify both sending and receiving agents when identity material is available
- distinguish delegation from ordinary messaging
- include refusal and completion events as state checkpoints

## Non-Goals

This profile does not define agent semantics or task planning behavior. It defines the AEGIS evidence required when agents communicate or delegate.
