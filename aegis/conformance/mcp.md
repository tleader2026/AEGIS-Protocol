# AEGIS-MCP-1.0-draft

AEGIS-MCP-1.0-draft defines the conformance profile for accountable Model Context Protocol sessions.

## Scope

An MCP implementation is AEGIS-conformant when MCP session activity can produce signed `ProvenanceEnvelope` records for:

- client and server identity claims
- capability negotiation
- tool calls
- resource reads
- prompt rendering
- session open and close events
- lineage links to prior envelopes or artifacts

## Required Envelope Mapping

| MCP surface | AEGIS field |
| --- | --- |
| MCP protocol version | `transport.protocolVersion` |
| MCP client/server | `actor.issuer`, `transport.endpoint` |
| MCP session | `session.sessionId` |
| Tool call | `execution.claims[].claimType = "tool.call"` |
| Resource read | `execution.claims[].claimType = "resource.read"` |
| Prompt render | `execution.claims[].claimType = "prompt.render"` |
| Prior artifact or envelope | `lineage.parents[]` |

## Conformance Requirements

MCP implementations MUST:

- emit at least one `session.open` or transport-equivalent claim for each accountable session
- emit a claim for each tool call, resource read, and prompt render that crosses the MCP boundary
- bind the MCP session to an AEGIS `sessionId`
- bind the executing runtime to a `machine.machineId` and `machine.runtimeId`
- sign each `ProvenanceEnvelope`

MCP implementations SHOULD:

- include `jurisdictionHints` when a server, client, or runtime has reliable location or policy-domain metadata
- preserve lineage across chained tool calls and generated artifacts
- expose envelope export for audit, incident response, and downstream governance analytics

## Non-Goals

This profile does not change the MCP transport. It specifies the AEGIS record obligations an accountable MCP implementation must satisfy.
