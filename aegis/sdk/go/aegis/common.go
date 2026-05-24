package aegis

import (
	"encoding/json"
	"os"
	"regexp"
)

const AegisVersion = "1.0-draft"

var (
	aegisURI = regexp.MustCompile(`^aegis:(manifest|intent|exec|prov|impact|trust|runtime|approval|semantic|packet|session|machine|envelope):[A-Za-z0-9._:-]+$`)
	digest   = regexp.MustCompile(`^(sha256|sha512-256):[A-Fa-f0-9]{16,128}$`)
)

type Document map[string]any

func loadJSON(path string) (Document, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var document Document
	if err := json.Unmarshal(data, &document); err != nil {
		return nil, err
	}
	return document, nil
}

func requireString(document Document, key string, path string, failures *[]ValidationFailure) string {
	value, ok := document[key].(string)
	if !ok || value == "" {
		*failures = append(*failures, failure(ErrRequiredField, path+"."+key, "required non-empty string"))
		return ""
	}
	return value
}

func requireObject(value any, path string, failures *[]ValidationFailure) (Document, bool) {
	object, ok := value.(map[string]any)
	if !ok {
		*failures = append(*failures, failure(ErrType, path, "expected object"))
		return nil, false
	}
	return Document(object), true
}

func requireArray(document Document, key string, path string, failures *[]ValidationFailure) []any {
	value, ok := document[key].([]any)
	if !ok {
		*failures = append(*failures, failure(ErrRequiredField, path+"."+key, "required array"))
		return nil
	}
	return value
}

func validateAegisURI(value string, path string, failures *[]ValidationFailure) {
	if value != "" && !aegisURI.MatchString(value) {
		*failures = append(*failures, failure(ErrIdentifier, path, "invalid AEGIS URI"))
	}
}

func validateDigest(value string, path string, failures *[]ValidationFailure) {
	if value != "" && !digest.MatchString(value) {
		*failures = append(*failures, failure(ErrDigestMismatch, path, "invalid digest syntax"))
	}
}

func validateSignature(value any, path string, failures *[]ValidationFailure) {
	signature, ok := requireObject(value, path, failures)
	if !ok {
		return
	}
	for _, key := range []string{"alg", "kid", "value"} {
		if field, ok := signature[key].(string); !ok || field == "" {
			*failures = append(*failures, failure(ErrSignatureInvalid, path+"."+key, "signature field is required"))
		}
	}
}
