# Protocol Diagrams

These diagrams are non-normative, but they define the expected mental model for implementers.

## Layer Model

```mermaid
flowchart TB
  L5["Layer 5: Impact\nexternal effects, review, compliance"] --> L4["Layer 4: Provenance\nlineage, ancestry, transformation"]
  L4 --> L3["Layer 3: Execution\nruntime, model, tools, checkpoints"]
  L3 --> L2["Layer 2: Intent\ngoal, scopes, autonomy, policy"]
  L2 --> L1["Layer 1: Identity\nagent, human, device, keys"]
```

## Agent Handshake

```mermaid
sequenceDiagram
  participant A as Initiating Agent
  participant V as Verifier
  participant R as Registry
  participant H as Human Approver
  A->>V: HELLO versions, namespaces, registry hints
  A->>V: IDENTITY AgentIdentity, key refs, attestations
  V->>R: Resolve identity and revocation state
  R-->>V: Identity document, trust assertions, proofs
  A->>V: INTENT IntentCertificate, scopes, constraints
  V->>A: CHALLENGE nonce, clock proof, runtime challenge
  A->>V: ACCEPT RuntimeSignature, envelope id
  V->>H: Approval challenge if policy requires
  H-->>V: HumanApprovalToken
  V-->>A: Session accepted or quarantined
```

## Execution DAG

```mermaid
flowchart LR
  I["IntentCertificate"] --> E0["Envelope Open"]
  E0 --> M1["Model Step\nreasoningDigest"]
  M1 --> T1["Tool Call\nscope verified"]
  T1 --> H1["HumanApprovalToken"]
  H1 --> T2["External Action"]
  T2 --> P1["ProvenanceBlock"]
  P1 --> IR["ImpactReceipt"]
  IR --> AM["AegisManifest"]
```

## Tamper Detection

```mermaid
flowchart LR
  A["Artifact Digest A"] --> B["ProvenanceBlock B"]
  B --> C["ExecutionEnvelope C"]
  C --> D["Manifest D"]
  X["Modified Output"] -. digest mismatch .-> C
  V["Verifier"] --> A
  V --> B
  V --> C
  V --> D
  V --> Q["Quarantine Decision"]
```

## Federated Registry Reconciliation

```mermaid
flowchart TB
  E["Enterprise Root"] <-->|cross-witness| C["Cloud Root"]
  C <-->|consistency proof| B["Browser Root"]
  B <-->|revocation mirror| G["Government Root"]
  G <-->|delayed bundle| O["Orbital / Air-Gapped Node"]
  E --> RP["Relying Parties"]
  C --> RP
  B --> RP
  G --> RP
```
