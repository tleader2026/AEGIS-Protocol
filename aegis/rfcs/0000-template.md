# AEGIS-RFC-0000: Template

Status: Draft
Authors:
Working Group:
Created:
Updates:
Requires:
Replaces:
Discussion:
Implementation Status:

## Conventions

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `NOT RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in BCP 14 when, and only when, they appear in all capitals.

## Abstract

State the protocol change in one paragraph.

## Motivation

Describe the interoperability, safety, governance, or operational problem.

## Wire Format

Define canonical JSON/CBOR fields, required algorithms, and failure modes.

### Canonicalization

Specify how the object is canonicalized before hashing or signing.

### Identifiers

Specify identifier grammar, uniqueness requirements, and comparison rules.

### Version Negotiation

Specify how implementations advertise, accept, reject, or downgrade versions.

## Validation

Describe exactly how implementations accept, reject, or quarantine packets.

Validation outcomes MUST use deterministic names and SHOULD map to stable error codes.

## Security Considerations

Describe replay, confused deputy, key compromise, privacy leakage, downgrade, and registry poisoning risks.

## Privacy Considerations

Define what can be selectively disclosed, redacted, compacted, or proven without disclosure.

## Interoperability Requirements

List required test vectors and at least two independent implementation targets.

## IANA / Registry Considerations

List new packet types, object types, algorithms, media types, namespaces, or extension points.

## Migration

Explain version negotiation, backwards compatibility, and registry rollout.
