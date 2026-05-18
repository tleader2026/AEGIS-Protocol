package aegis

type ValidationFailure struct {
	Code    ErrorCode `json:"code"`
	Path    string    `json:"path"`
	Message string    `json:"message"`
}

type ValidationResult struct {
	Outcome  ValidationOutcome  `json:"outcome"`
	Failures []ValidationFailure `json:"failures,omitempty"`
	Metadata map[string]string  `json:"metadata,omitempty"`
}

func (r ValidationResult) Valid() bool {
	return r.Outcome == OutcomeValid
}

func validResult(metadata map[string]string) ValidationResult {
	return ValidationResult{Outcome: OutcomeValid, Metadata: metadata}
}

func invalidResult(failures []ValidationFailure) ValidationResult {
	return ValidationResult{Outcome: OutcomeInvalid, Failures: failures}
}

func failure(code ErrorCode, path string, message string) ValidationFailure {
	return ValidationFailure{Code: code, Path: path, Message: message}
}
