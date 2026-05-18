# Terminology

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `NOT RECOMMENDED`, `MAY`, and `OPTIONAL` are to be interpreted as described in BCP 14 when, and only when, they appear in all capitals.

## Deterministic Terms

`Actor`
: A human, agent, runtime, model delegate, service account, or system component that performs or authorizes an AEGIS-relevant operation.

`Agent`
: A software or embodied AI system capable of initiating, planning, delegating, or executing actions under an identity and intent boundary.

`AgentIdentity`
: A resolvable identity document binding an agent to namespace, controller, public keys, attestations, and optional delegations.

`Artifact`
: Data, content, code, model output, control-plane mutation, media, message, or operational state referenced by digest in an AEGIS record.

`ExecutionEnvelope`
: The ordered, signed, runtime-scoped record of model calls, tool calls, checkpoints, approvals, and state transitions.

`Impact`
: An externally meaningful effect caused or attempted by an execution, including writes to APIs, physical operations, messages sent, media published, or infrastructure changes.

`Intent`
: A signed statement of goal, scope, constraints, autonomy level, expiry, and policy bindings presented before execution.

`Manifest`
: The root AEGIS record binding identity, intent, execution, provenance, impact, trust assertions, and signatures.

`Packet`
: A transportable AEGIS message exchanged between agents, runtimes, verifiers, registries, or control planes.

`ProvenanceBlock`
: A hash-linked event in an artifact or execution lineage graph.

`Registry`
: A service or offline bundle that resolves identities, publishes trust assertions, records revocation state, and provides transparency or reconciliation proofs.

`Relying Party`
: Any verifier, user agent, service, regulator, auditor, or agent that makes a trust decision from AEGIS evidence.

`Runtime`
: The execution environment that hosts a model or agent step, including container, hardware, isolation boundary, orchestration context, and attestation source.

`Semantic Lineage`
: Claim-level or meaning-preserving ancestry that survives summarization, transformation, format conversion, or multi-agent handoff.

`Trust Assertion`
: A signed claim by a trust authority, registry, auditor, lab, enterprise, or federation about identity, runtime, policy, certification, or compliance status.

## Reserved Words

Implementations MUST NOT use the following words interchangeably:

- `identity` and `intent`
- `trace` and `provenance`
- `signature` and `attestation`
- `approval` and `authorization`
- `artifact` and `impact`
- `model` and `runtime`

## Namespace Grammar

AEGIS URI-like identifiers use this grammar:

```abnf
aegis-uri      = "aegis:" object-type ":" object-id
object-type    = "manifest" / "intent" / "exec" / "prov" / "impact" / "trust" / "runtime" / "approval" / "semantic"
object-id      = 1*( ALPHA / DIGIT / "-" / "_" / "." / ":" )

aegis-space    = "aegis://" authority "/" path
authority      = 1*( ALPHA / DIGIT / "-" / "." )
path           = 1*( ALPHA / DIGIT / "-" / "_" / "." / "/" )
```

Identifiers MUST be compared byte-for-byte after UTF-8 normalization to NFC.
