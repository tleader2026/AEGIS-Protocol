# AEGIS Governance

AEGIS is an open standard for accountable AI execution provenance. Governance is designed to keep the standard neutral, implementation-driven, and suitable for eventual foundation or standards-body stewardship.

## Project Roles

- **Maintainers** steward the repository, review changes, merge pull requests, and cut releases.
- **Specification editors** maintain normative text, conformance profiles, schemas, and RFC alignment.
- **Implementation maintainers** maintain SDKs, runtime components, reference implementations, and test fixtures.
- **Contributors** propose issues, patches, examples, tests, schemas, and documentation.

Current maintainers are listed in [MAINTAINERS.md](./MAINTAINERS.md).

## Decision Process

AEGIS uses rough consensus and running code.

Changes are expected to include:

- a clear problem statement
- compatibility notes
- tests or fixtures when behavior changes
- documentation updates when public surfaces change

Maintainers may merge routine changes after review. Normative changes to schemas, conformance profiles, protocol methods, or governance require an ADR or specification update.

## Standards Track

AEGIS distinguishes three maturity levels:

- **Draft**: experimental, expected to change.
- **Candidate**: implemented by at least two independent components or SDKs, with conformance fixtures.
- **Stable**: backwards compatibility expected; breaking changes require a new version.

The project should prefer IETF/RFC-aligned terminology where appropriate. The long-term path may include IETF discussion, Internet Society engagement, or foundation stewardship once the implementation and community are mature enough.

## Security and Disclosure

Security issues should follow [SECURITY.md](./SECURITY.md). Provenance, signing, runtime attestation, and machine identity bugs should be treated as security-sensitive.

## Neutrality

AEGIS does not define governance policy and does not depend on NSGP. AEGIS produces verifiable records. Downstream systems interpret those records.
