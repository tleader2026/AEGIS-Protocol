# Governance

AEGIS is governed like infrastructure, not like a single-vendor product.

## Charter

The AEGIS project exists to define interoperable trust, provenance, intent, execution, registry, and impact protocols for autonomous and semi-autonomous AI systems. The project SHALL prioritize implementability, public review, security, privacy, jurisdictional interoperability, and long-term neutrality.

The project SHALL NOT require adoption of any single cloud provider, model provider, registry operator, blockchain, hardware vendor, or national trust root.

## Bodies

- Steering Council
- Identity Working Group
- Runtime Attestation Working Group
- Provenance Graph Working Group
- Browser and Media Working Group
- Robotics and Edge Working Group
- Compliance Working Group
- Interoperability Working Group
- Security Response Working Group

## Steering Council Composition

The Steering Council SHOULD include:

- two implementer representatives
- two infrastructure or cloud representatives
- one browser or user-agent representative
- one public-sector or standards representative
- one civil-society, auditor, or public-interest representative
- one security response lead

No single employer or affiliated organization SHOULD hold more than two voting seats.

## RFC Process

1. Problem statement
2. Internet-Draft style proposal
3. Security review
4. Privacy review
5. Interoperability report
6. Two independent implementations
7. Working group last call
8. Standard status vote

## Decision States

RFCs move through these states:

- `idea`
- `draft`
- `working-group-adopted`
- `last-call`
- `candidate-standard`
- `standard`
- `deprecated`
- `withdrawn`

`candidate-standard` requires public test vectors and at least two independent implementation reports. `standard` requires interoperability evidence, security review closure, and documented migration behavior.

## Trust Authority Model

AEGIS supports federated trust roots:

- national roots
- cloud provider roots
- browser roots
- enterprise roots
- lab roots
- independent auditor roots

The protocol specifies reconciliation, transparency, witness, and revocation semantics rather than mandating one universal authority.

## Conformance Levels

- `AEGIS-Core`: packet parsing, canonicalization, signatures, identifiers, and manifest validation.
- `AEGIS-Runtime`: execution envelope, runtime signature, checkpoint, and attestation validation.
- `AEGIS-Provenance`: provenance block graph, semantic lineage map, and artifact ancestry validation.
- `AEGIS-Registry`: identity resolution, transparency, revocation, witness, and reconciliation behavior.
- `AEGIS-Impact`: impact receipts, human approval tokens, risk metadata, and review state validation.

Products MUST NOT claim general AEGIS compliance without declaring the conformance level and RFC versions tested.
