import {
  Activity,
  BadgeCheck,
  Boxes,
  Braces,
  Cable,
  CircuitBoard,
  Fingerprint,
  GitBranch,
  Globe2,
  Handshake,
  KeyRound,
  Landmark,
  LockKeyhole,
  Network,
  Orbit,
  Radar,
  Route,
  ScanEye,
  ShieldCheck,
  SquareCode,
  Workflow,
  type LucideIcon
} from "lucide-react";

export type ProtocolLayer = {
  number: number;
  name: string;
  summary: string;
  capabilities: string[];
  artifacts: string[];
  icon: LucideIcon;
};

export const layers: ProtocolLayer[] = [
  {
    number: 1,
    name: "Identity",
    summary: "Verifiable identities for agents, humans, models, devices, runtimes, and delegated execution subjects.",
    capabilities: [
      "Verifiable agent identity",
      "Hardware-bound signatures",
      "Human approval chains",
      "Execution credentials",
      "Device attestation"
    ],
    artifacts: ["AgentIdentity", "RuntimeSignature", "HumanApprovalToken"],
    icon: Fingerprint
  },
  {
    number: 2,
    name: "Intent",
    summary: "Signed declarations of goals, scopes, constraints, policy bindings, and autonomy boundaries.",
    capabilities: [
      "Signed intent declarations",
      "Permission scopes",
      "Goal declarations",
      "Human vs autonomous execution",
      "Policy constraints"
    ],
    artifacts: ["IntentCertificate", "TrustAssertion"],
    icon: KeyRound
  },
  {
    number: 3,
    name: "Execution",
    summary: "Runtime evidence for model calls, tools, environments, containers, state transitions, and reasoning digests.",
    capabilities: [
      "Tool usage tracking",
      "Model and runtime metadata",
      "Container/environment attestation",
      "Reasoning hashes",
      "Execution DAG tracking"
    ],
    artifacts: ["ExecutionEnvelope", "RuntimeSignature"],
    icon: CircuitBoard
  },
  {
    number: 4,
    name: "Provenance",
    summary: "Immutable lineage for artifacts, prompts, transformations, multi-agent transactions, and semantic inheritance.",
    capabilities: [
      "Immutable provenance graph",
      "Semantic lineage",
      "Multi-agent transaction history",
      "Data ancestry",
      "Transformation chains"
    ],
    artifacts: ["ProvenanceBlock", "SemanticLineageMap"],
    icon: GitBranch
  },
  {
    number: 5,
    name: "Impact",
    summary: "External effects, system touchpoints, review obligations, compliance surfaces, and post-action accountability.",
    capabilities: [
      "Actions performed",
      "External systems touched",
      "Risk scoring",
      "Human review status",
      "Compliance metadata"
    ],
    artifacts: ["ImpactReceipt", "AegisManifest"],
    icon: Radar
  }
];

export type CoreObject = {
  name: string;
  purpose: string;
  lifecycle: string[];
  validation: string[];
  crypto: string[];
  schema: string;
  example: string;
};

export const coreObjects: CoreObject[] = [
  {
    name: "AegisManifest",
    purpose: "Root manifest binding identity, intent, execution, provenance, impact, policy, and trust registry references into one verifiable record.",
    lifecycle: ["drafted by initiator", "signed by identity subject", "extended by runtime", "sealed by provenance registry", "audited by relying party"],
    validation: ["canonicalize with RFC 8785 JSON Canonicalization", "verify manifest digest", "resolve trust roots", "validate linked block continuity"],
    crypto: ["Ed25519 or P-256 signatures", "SHA-256 or SHA-512/256 digests", "COSE_Sign1 envelopes", "Merkle inclusion proofs"],
    schema: `type AegisManifest = {
  aegisVersion: "1.0-draft";
  manifestId: string;
  subject: AgentIdentity;
  intent: IntentCertificate;
  execution: ExecutionEnvelope;
  provenance: ProvenanceBlock[];
  impact: ImpactReceipt;
  trust: TrustAssertion[];
  signatures: RuntimeSignature[];
};`,
    example: `{
  "aegisVersion": "1.0-draft",
  "manifestId": "aegis:manifest:01JZK7QYB4R3",
  "subject": "did:aegis:agent:cloudflare.l7.verifier",
  "intent": "aegis:intent:ticket-8128",
  "execution": "aegis:exec:run-19f4",
  "provenanceRoot": "sha256:65a31b...",
  "impact": "aegis:impact:receipt-7731",
  "registry": "aegis.registry://us-gov-east/root"
}`
  },
  {
    name: "ExecutionEnvelope",
    purpose: "Tamper-evident packet around an AI execution segment, including model, tool, environment, input/output digest, and state transition evidence.",
    lifecycle: ["opened by runtime", "updated per tool call", "checkpointed at model boundary", "sealed after output", "anchored to provenance graph"],
    validation: ["verify monotonic step numbers", "compare tool result digests", "check runtime attestation freshness", "replay DAG hashes"],
    crypto: ["TEE attestation quote", "signed checkpoint hashes", "hash-linked execution steps"],
    schema: `type ExecutionEnvelope = {
  envelopeId: string;
  agent: string;
  model: { provider: string; id: string; version: string };
  runtime: { imageDigest: string; attestation: string };
  steps: ExecutionStep[];
  reasoningDigest?: string;
  sealedAt: string;
};`,
    example: `{
  "envelopeId": "aegis:exec:run-19f4",
  "model": { "provider": "open-lab", "id": "frontier-r2", "version": "2026-05-01" },
  "runtime": { "imageDigest": "sha256:7a91...", "attestation": "cose:0oRDoQ..." },
  "steps": [
    { "n": 1, "kind": "tool.call", "scope": "crm.write", "digest": "sha256:52ad..." },
    { "n": 2, "kind": "human.approval", "token": "aegis:approval:9120" }
  ],
  "reasoningDigest": "sha256:private-redacted-digest"
}`
  },
  {
    name: "IntentCertificate",
    purpose: "Signed intent and autonomy boundary declaring what an agent is allowed to attempt before execution begins.",
    lifecycle: ["issued by principal", "bound to policy", "presented during handshake", "checked before tool use", "revoked or expires"],
    validation: ["verify issuer authority", "evaluate scopes against policy", "check temporal and contextual constraints", "require approval if autonomy exceeds threshold"],
    crypto: ["detached signatures", "capability attenuation", "short-lived nonce binding"],
    schema: `type IntentCertificate = {
  intentId: string;
  issuer: string;
  subject: string;
  goal: string;
  scopes: string[];
  constraints: PolicyConstraint[];
  autonomy: "human-directed" | "supervised" | "autonomous";
  expiresAt: string;
};`,
    example: `{
  "intentId": "aegis:intent:ticket-8128",
  "issuer": "did:web:enterprise.example",
  "subject": "did:aegis:agent:sre.remediator",
  "goal": "restore degraded checkout service",
  "scopes": ["k8s.rollout.read", "k8s.rollout.restart"],
  "autonomy": "supervised",
  "constraints": [{ "type": "maxRisk", "value": 0.42 }]
}`
  },
  {
    name: "ProvenanceBlock",
    purpose: "Hash-linked event in the provenance graph, compatible with media provenance while extending into AI execution and semantic lineage.",
    lifecycle: ["created per event", "linked to parent blocks", "signed by executor", "published to registry", "reconciled across federations"],
    validation: ["verify parent hash continuity", "check semantic map references", "validate timestamp tolerance", "compare registry inclusion proofs"],
    crypto: ["Merkle DAG", "registry witness signatures", "timestamp authority countersignatures"],
    schema: `type ProvenanceBlock = {
  blockId: string;
  parentIds: string[];
  eventType: string;
  actor: string;
  artifactDigest: string;
  semanticRefs: string[];
  timestamp: string;
  signature: string;
};`,
    example: `{
  "blockId": "aegis:prov:block-44c2",
  "parentIds": ["aegis:prov:block-44c1"],
  "eventType": "artifact.transform",
  "actor": "did:aegis:agent:media.verifier",
  "artifactDigest": "sha256:bb08...",
  "semanticRefs": ["aegis:semantic:claim:origin"],
  "timestamp": "2026-05-18T08:43:13Z"
}`
  },
  {
    name: "TrustAssertion",
    purpose: "Claim made by a trust authority, auditor, lab, enterprise, or federation about identity, runtime, policy, registry, or compliance status.",
    lifecycle: ["requested by relying party", "issued by authority", "attached to manifest", "challenged during audit", "rotated or revoked"],
    validation: ["resolve issuer accreditation", "check revocation lists", "verify assertion scope", "enforce jurisdictional constraints"],
    crypto: ["VC data integrity proofs", "COSE Web Tokens", "signed transparency log entries"],
    schema: `type TrustAssertion = {
  assertionId: string;
  issuer: string;
  subject: string;
  claim: string;
  evidence: string[];
  jurisdiction?: string;
  validUntil: string;
};`,
    example: `{
  "assertionId": "aegis:trust:fips-runtime-29",
  "issuer": "did:aegis:authority:nist-lab-a",
  "subject": "sha256:7a91...",
  "claim": "runtime.attested.confidential-compute",
  "jurisdiction": "US",
  "validUntil": "2026-06-18T00:00:00Z"
}`
  },
  {
    name: "AgentIdentity",
    purpose: "Stable, resolvable identity for software agents, embodied agents, model delegates, browser agents, and infrastructure control planes.",
    lifecycle: ["registered in namespace", "bound to keys and hardware", "delegated via credentials", "rotated through registry", "retired with audit continuity"],
    validation: ["resolve DID document", "verify key purpose", "check hardware binding", "confirm delegated capability path"],
    crypto: ["DID methods", "hardware-backed keys", "key transparency", "certificate transparency bridging"],
    schema: `type AgentIdentity = {
  did: string;
  namespace: string;
  controller: string;
  keyRefs: string[];
  attestationRefs: string[];
  delegation?: string;
};`,
    example: `{
  "did": "did:aegis:agent:browser.autofill.enterprise.42",
  "namespace": "aegis://enterprise.example/browser",
  "controller": "did:web:enterprise.example",
  "keyRefs": ["kid:signing-2026-q2"],
  "attestationRefs": ["aegis:trust:fips-runtime-29"]
}`
  },
  {
    name: "RuntimeSignature",
    purpose: "Runtime-level cryptographic statement that a specific environment executed a specific envelope under declared constraints.",
    lifecycle: ["generated inside trusted runtime", "attached to checkpoints", "sealed at completion", "verified by auditor", "archived with manifest"],
    validation: ["validate quote chain", "match image digest", "check clock source", "compare policy digest"],
    crypto: ["TPM/TEE quotes", "COSE countersignatures", "remote attestation chains"],
    schema: `type RuntimeSignature = {
  runtimeId: string;
  envelopeDigest: string;
  imageDigest: string;
  policyDigest: string;
  attestation: string;
  signature: string;
};`,
    example: `{
  "runtimeId": "aegis:runtime:aks-confidential-88",
  "envelopeDigest": "sha256:82bd...",
  "imageDigest": "sha256:7a91...",
  "policyDigest": "sha256:11cf...",
  "attestation": "cose:0oRDoQ..."
}`
  },
  {
    name: "HumanApprovalToken",
    purpose: "Non-repudiable approval, denial, or escalation event injected into an autonomous workflow by a human or human-controlled organization.",
    lifecycle: ["requested by policy engine", "displayed with context", "signed by approver", "bound to intent and impact", "audited after action"],
    validation: ["verify approver identity", "check challenge binding", "validate UI context digest", "enforce freshness window"],
    crypto: ["WebAuthn/FIDO2 signatures", "detached UI context hash", "challenge-response nonce"],
    schema: `type HumanApprovalToken = {
  approvalId: string;
  approver: string;
  intentId: string;
  permittedImpact: string[];
  contextDigest: string;
  decision: "approve" | "deny" | "escalate";
};`,
    example: `{
  "approvalId": "aegis:approval:9120",
  "approver": "did:web:enterprise.example#alice",
  "intentId": "aegis:intent:ticket-8128",
  "permittedImpact": ["restart.checkout-deployment"],
  "decision": "approve"
}`
  },
  {
    name: "SemanticLineageMap",
    purpose: "Graph of claims, embeddings, labels, transformations, and semantic dependencies that survive format changes and agent handoffs.",
    lifecycle: ["derived at ingestion", "extended during reasoning", "linked to artifacts", "compacted for privacy", "queried by auditors"],
    validation: ["check source claim digests", "verify transformation declarations", "detect orphaned claims", "enforce privacy redaction proofs"],
    crypto: ["claim-level digests", "selective disclosure proofs", "private set membership proofs"],
    schema: `type SemanticLineageMap = {
  mapId: string;
  claims: SemanticClaim[];
  edges: SemanticEdge[];
  redactions?: RedactionProof[];
};`,
    example: `{
  "mapId": "aegis:semantic:map-5ac",
  "claims": [{ "id": "claim:origin", "digest": "sha256:aa10...", "label": "source attribution" }],
  "edges": [{ "from": "claim:origin", "to": "claim:summary", "kind": "summarized" }]
}`
  },
  {
    name: "ImpactReceipt",
    purpose: "Signed receipt of external consequences: systems touched, writes performed, risk score, compliance metadata, and review state.",
    lifecycle: ["initialized with intent", "updated by connectors", "risk-scored by policy engine", "reviewed by humans", "retained for compliance"],
    validation: ["compare connector logs", "verify external system receipts", "evaluate risk scoring model", "check required review completion"],
    crypto: ["external receipt signatures", "audit log anchoring", "policy engine signatures"],
    schema: `type ImpactReceipt = {
  receiptId: string;
  actions: ExternalAction[];
  systems: string[];
  risk: { score: number; basis: string[] };
  review: "none" | "pending" | "approved" | "rejected";
  compliance: string[];
};`,
    example: `{
  "receiptId": "aegis:impact:receipt-7731",
  "actions": [{ "system": "kubernetes", "operation": "rollout.restart", "digest": "sha256:e31b..." }],
  "systems": ["prod-checkout-cluster"],
  "risk": { "score": 0.31, "basis": ["bounded blast radius", "human approved"] },
  "review": "approved"
}`
  }
];

export const technicalSections = [
  {
    title: "Packet Schema",
    icon: Braces,
    copy: "AEGIS packets are canonical JSON or CBOR documents carried over HTTPS, gRPC, message queues, browser agent channels, robotics buses, and air-gapped transfer media. Every packet contains an identity subject, intent binding, execution envelope digest, time source, registry hint, and detached signature.",
    code: `{
  "packetType": "aegis.execution.v1",
  "packetId": "aegis:packet:01JZK8ZP91",
  "issuer": "did:aegis:agent:sre.remediator",
  "audience": "aegis://k8s/prod-checkout",
  "intent": "sha256:4a9d...",
  "envelope": "sha256:82bd...",
  "time": { "source": "rfc3161", "notBefore": "2026-05-18T08:40:00Z" },
  "signature": { "alg": "EdDSA", "kid": "did:aegis:agent:sre.remediator#k1", "value": "..." }
}`
  },
  {
    title: "gRPC Interface",
    icon: Cable,
    copy: "Control planes can validate packets inline, stream provenance blocks, reconcile registries, and request human approval without coupling to a single vendor runtime.",
    code: `service AegisVerifier {
  rpc VerifyPacket(VerifyPacketRequest) returns (VerifyPacketResponse);
  rpc StreamProvenance(stream ProvenanceBlock) returns (ReconciliationReceipt);
  rpc ResolveIdentity(IdentityQuery) returns (AgentIdentityDocument);
  rpc RequestApproval(ApprovalChallenge) returns (HumanApprovalToken);
}`
  },
  {
    title: "REST API",
    icon: Route,
    copy: "REST resources expose validator, registry, manifest, and impact endpoints for browsers, CI systems, edge workers, media systems, and enterprise audit tooling.",
    code: `POST /v1/verify
GET  /v1/identity/{did}
POST /v1/manifests
GET  /v1/provenance/{artifactDigest}
POST /v1/reconcile
POST /v1/approval/challenges`
  },
  {
    title: "SDK Example",
    icon: SquareCode,
    copy: "SDKs wrap signing, canonicalization, validation, registry resolution, and envelope checkpointing while leaving policy decisions to the host system.",
    code: `import { AegisRuntime } from "@aegis/sdk";

const runtime = await AegisRuntime.attest({
  agent: "did:aegis:agent:sre.remediator",
  registry: "aegis.registry://enterprise/root"
});

const envelope = await runtime.openEnvelope(intentCertificate);
await envelope.recordToolCall("k8s.rollout.read", result);
await envelope.requireHumanApproval({ maxRisk: 0.42 });
await envelope.seal({ impactReceipt });`
  },
  {
    title: "Agent Handshake",
    icon: Handshake,
    copy: "Agents establish a session by exchanging identity documents, intent certificates, supported scopes, registry roots, clock proofs, and challenge-bound runtime signatures.",
    code: `1. HELLO: supported AEGIS versions, namespaces, registry roots
2. IDENTITY: DID document, key purposes, hardware attestations
3. INTENT: goal, scopes, autonomy mode, expiration, policy digest
4. CHALLENGE: nonce, clock proof, environment challenge
5. ACCEPT: signed session, envelope id, revocation channels`
  },
  {
    title: "Federated Registries",
    icon: Globe2,
    copy: "Registries behave like certificate transparency plus package registries for AI execution. Enterprises, labs, governments, browsers, and cloud providers can operate independent roots that cross-witness one another.",
    code: `registry_root:
  namespace: aegis://gov.us/critical-infrastructure
  witnesses:
    - aegis://cloud.provider/root
    - aegis://browser.vendor/root
  revocation: https://registry.example/revocations.cbor
  reconciliation: merkle-consistency-v1`
  },
  {
    title: "Air-Gapped Exchange",
    icon: LockKeyhole,
    copy: "AEGIS packets can move through QR, removable media, diplomatic pouch, or offline serial links by preserving canonical envelopes, timestamp countersignatures, and delayed reconciliation receipts.",
    code: `aegis bundle export --manifest aegis:manifest:01JZK7QYB4R3 --format cbor
aegis bundle inspect ./offline-transfer.aegis
aegis registry reconcile --deferred ./offline-transfer.aegis`
  },
  {
    title: "Orbital Sync",
    icon: Orbit,
    copy: "Delay-tolerant trust exchange lets satellites, ships, rural robotics, and disaster systems issue locally verifiable execution proofs and reconcile when registry contact returns.",
    code: `sync_window:
  mode: delay-tolerant
  max_clock_drift_ms: 750
  witness_quorum: 2/5
  route: leo-relay -> ground-root -> federation-peer`
  },
  {
    title: "Address Space",
    icon: Network,
    copy: "AEGIS namespaces separate legal control, infrastructure location, capability family, and agent subject while remaining resolvable through DID and DNS-compatible adapters.",
    code: `aegis://{authority}/{domain}/{agent-class}/{subject}
did:aegis:agent:{authority}.{class}.{instance}
aegis.registry://{federation}/{root}
aegis.intent://{issuer}/{purpose}/{nonce}`
  }
];

export const governance = [
  {
    title: "Steering Council",
    icon: Landmark,
    body: "Elected maintainers from labs, public institutions, cloud providers, civil-society auditors, browser vendors, robotics operators, and enterprise adopters. Owns charter, trademark, antitrust policy, and release criteria."
  },
  {
    title: "Working Groups",
    icon: Boxes,
    body: "Identity WG, Runtime Attestation WG, Provenance Graph WG, Browser and Media WG, Robotics and Edge WG, Compliance WG, Interop WG, and Security Response WG."
  },
  {
    title: "RFC Process",
    icon: Workflow,
    body: "Ideas begin as AEGIS Internet-Drafts, require two independent implementations, security review, privacy review, migration notes, and a public interoperability report before standard status."
  },
  {
    title: "Trust Authorities",
    icon: ShieldCheck,
    body: "Federations can include national roots, cloud roots, enterprise roots, lab roots, and browser roots. AEGIS specifies reconciliation and transparency rules rather than a single global authority."
  },
  {
    title: "Certification",
    icon: BadgeCheck,
    body: "Conformance levels cover packet validity, identity resolution, runtime attestation, provenance graph continuity, human approval binding, impact receipts, and air-gapped reconciliation."
  },
  {
    title: "Reference Stack",
    icon: Activity,
    body: "Reference implementations include a validator, registry, TypeScript SDK, Python SDK, Rust packet library, Kubernetes admission controller, browser verifier, and OpenTelemetry bridge."
  }
];

export const comparisons = [
  ["C2PA", "Media provenance", "AEGIS extends provenance into execution, intent, agents, tools, semantic lineage, and runtime trust."],
  ["OAuth", "Delegated authorization", "AEGIS adds agent identity, signed goals, autonomy boundaries, human approval tokens, and execution receipts."],
  ["TLS", "Channel security", "AEGIS secures who acted, why, in which runtime, with which model, and what external impact occurred."],
  ["MCP", "Tool interoperability", "AEGIS wraps tool calls in signed intent, permission scope, provenance, and impact evidence."],
  ["OpenTelemetry", "Operational traces", "AEGIS makes cognitive workflow traces attestable, policy-bound, and provenance-linked."],
  ["Kubernetes", "Declarative orchestration", "AEGIS adds admission-time and runtime proofs for autonomous workloads and AI control planes."],
  ["SBOMs", "Software composition", "AEGIS provides execution composition: models, data, tools, policies, humans, and transformations."],
  ["AEGIS", "AI execution trust", "Unifies provenance, execution trust, agent accountability, semantic lineage, and runtime integrity."]
];

export const rfcTemplate = `# AEGIS-RFC: <short title>

Status: Draft
Authors:
Working Group:
Created:
Updates:

## Abstract
State the protocol change in one paragraph.

## Motivation
Describe the interoperability, safety, governance, or operational problem.

## Wire Format
Define canonical JSON/CBOR fields, required algorithms, and failure modes.

## Security Considerations
Describe replay, confused deputy, key compromise, privacy leakage, and downgrade risks.

## Interoperability Requirements
List required test vectors and at least two independent implementations.

## Migration
Explain version negotiation, backwards compatibility, and registry rollout.
`;

export const cliExamples = [
  "aegis init --namespace aegis://enterprise.example/agents",
  "aegis identity create sre.remediator --hardware-bound",
  "aegis intent sign ./restore-checkout.intent.json",
  "aegis verify ./manifest.aegis --registry aegis.registry://cloud/root",
  "aegis provenance graph sha256:65a31b --format dot",
  "aegis packet inspect ./offline-transfer.aegis --explain"
];
