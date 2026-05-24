# JSON-RPC Runtime Handshake

AEGIS uses JSON-RPC as the reference handshake surface for runtimes that need a transport-neutral way to create sessions, submit intent, stamp execution, and publish provenance.

The handshake is not a replacement for MCP, A2A, or ACP. It is the local AEGIS runtime interface those transport implementations can call to produce conformant records.

## Methods

| Method | Purpose |
| --- | --- |
| `aegis.hello` | Discover runtime version, supported algorithms, and conformance profiles. |
| `aegis.negotiate` | Agree on protocol version, canonicalization, signing algorithm, and required evidence classes. |
| `aegis.bindSession` | Bind a transport session to an AEGIS session and machine/runtime anchor. |
| `aegis.submitIntent` | Register declared intent before accountable execution. |
| `aegis.attestRuntime` | Attach runtime, machine, TPM2, enclave, or adapter-backed attestation evidence. |
| `aegis.recordExecution` | Record an execution claim such as a tool call, message, delegation, or checkpoint. |
| `aegis.resolveLineage` | Resolve parent envelopes, prior artifacts, and lineage chain continuity. |
| `aegis.publishEnvelope` | Seal and store a signed `ProvenanceEnvelope`. |
| `aegis.verifyEnvelope` | Validate envelope structure, digests, and signature material. |
| `aegis.queryEnvelopes` | Query stored envelopes by session, machine, transport, time window, or lineage. |
| `aegis.closeSession` | Close an accountable session and emit final provenance. |

## Minimal Flow

```text
transport implementation -> aegis.hello
runtime -> capabilities

transport implementation -> aegis.negotiate
runtime -> negotiated conformance profile and evidence requirements

transport implementation -> aegis.bindSession
runtime -> sessionId, machineId, runtimeId

transport implementation -> aegis.submitIntent
runtime -> intent receipt

transport implementation -> aegis.attestRuntime
runtime -> attestation receipt

transport implementation -> aegis.recordExecution
runtime -> execution claim receipt

transport implementation -> aegis.resolveLineage
runtime -> lineage continuity receipt

transport implementation -> aegis.publishEnvelope
runtime -> signed ProvenanceEnvelope
```

## Queryability

AEGIS records MUST be indexable by:

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

NSGP and other downstream systems depend on this queryability, but AEGIS does not depend on those systems.
