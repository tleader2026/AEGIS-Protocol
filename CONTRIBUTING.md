# Contributing to AEGIS

AEGIS is written as an infrastructure-grade open standard. Contributions should be precise, interoperable, and implementation-oriented.

## Principles

- Prefer protocol clarity over marketing language.
- Define wire formats, validation behavior, and failure modes.
- Include privacy, security, governance, and interoperability considerations.
- Avoid cryptocurrency, NFT, or chain-specific assumptions unless an RFC explicitly defines a transport-neutral bridge.
- Preserve compatibility with existing standards such as C2PA, OAuth, TLS, OpenTelemetry, Kubernetes, SBOM ecosystems, DID methods, COSE, and transparency logs.

## Contribution Types

- Protocol object additions or revisions
- Schema examples and test vectors
- SDK and CLI examples
- Governance process improvements
- Visualization and developer experience improvements
- Accessibility, performance, and responsive design fixes

## RFC Workflow

1. Open an issue describing the interoperability problem.
2. Draft an AEGIS RFC using the template in the site.
3. Provide security and privacy considerations.
4. Provide at least one implementation sketch or test vector.
5. Request review from the relevant working group.

## Development

```bash
cd aegis/site
npm install
npm run dev
```

Before submitting a pull request:

```bash
cd aegis/site
npm run build
```

Protocol, RFC, schema, SDK, registry, and reference implementation changes should be made in the corresponding `/aegis/*` directory rather than buried inside the website.

## Governance Expectations

Contributors are expected to act in good faith, disclose conflicts of interest when relevant, and design for a federated ecosystem that can include public institutions, private infrastructure providers, independent auditors, and open-source implementations.
