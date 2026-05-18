package aegis

type ValidationOutcome string

const (
	OutcomeValid         ValidationOutcome = "valid"
	OutcomeInvalid       ValidationOutcome = "invalid"
	OutcomeQuarantined   ValidationOutcome = "quarantined"
	OutcomeIndeterminate ValidationOutcome = "indeterminate"
)

type ErrorCode string

const (
	ErrParse                   ErrorCode = "AEGIS_E_PARSE"
	ErrCanonicalization        ErrorCode = "AEGIS_E_CANONICALIZATION"
	ErrDigestMismatch         ErrorCode = "AEGIS_E_DIGEST_MISMATCH"
	ErrSignatureInvalid       ErrorCode = "AEGIS_E_SIGNATURE_INVALID"
	ErrIdentityUnresolved     ErrorCode = "AEGIS_E_IDENTITY_UNRESOLVED"
	ErrIntentScopeDenied      ErrorCode = "AEGIS_E_INTENT_SCOPE_DENIED"
	ErrRuntimeAttestationStale ErrorCode = "AEGIS_E_RUNTIME_ATTESTATION_STALE"
	ErrProvenanceGap          ErrorCode = "AEGIS_E_PROVENANCE_GAP"
	ErrImpactUnreviewed       ErrorCode = "AEGIS_E_IMPACT_UNREVIEWED"
	ErrRegistryUnavailable    ErrorCode = "AEGIS_E_REGISTRY_UNAVAILABLE"
	ErrRequiredField          ErrorCode = "AEGIS_E_REQUIRED_FIELD"
	ErrType                   ErrorCode = "AEGIS_E_TYPE"
	ErrIdentifier             ErrorCode = "AEGIS_E_IDENTIFIER"
)
