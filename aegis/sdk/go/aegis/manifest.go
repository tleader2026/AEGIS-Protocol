package aegis

func LoadManifest(path string) (Document, error) {
	return loadJSON(path)
}

func ValidateManifest(document Document) ValidationResult {
	failures := []ValidationFailure{}

	if document["aegisVersion"] != AegisVersion {
		failures = append(failures, failure(ErrRequiredField, "$.aegisVersion", "expected 1.0-draft"))
	}

	manifestID := requireString(document, "manifestId", "$", &failures)
	validateAegisURI(manifestID, "$.manifestId", &failures)

	if subject, ok := requireObject(document["subject"], "$.subject", &failures); ok {
		requireString(subject, "did", "$.subject", &failures)
		requireString(subject, "namespace", "$.subject", &failures)
		requireString(subject, "controller", "$.subject", &failures)
	}

	if intent, ok := requireObject(document["intent"], "$.intent", &failures); ok {
		intentID := requireString(intent, "intentId", "$.intent", &failures)
		validateAegisURI(intentID, "$.intent.intentId", &failures)
		scopes := requireArray(intent, "scopes", "$.intent", &failures)
		if scopes != nil && len(scopes) == 0 {
			failures = append(failures, failure(ErrIntentScopeDenied, "$.intent.scopes", "at least one scope is required"))
		}
		validateSignature(intent["signature"], "$.intent.signature", &failures)
	}

	if execution, ok := requireObject(document["execution"], "$.execution", &failures); ok {
		envelopeID := requireString(execution, "envelopeId", "$.execution", &failures)
		validateAegisURI(envelopeID, "$.execution.envelopeId", &failures)
		steps := requireArray(execution, "steps", "$.execution", &failures)
		if steps != nil && len(steps) == 0 {
			failures = append(failures, failure(ErrRequiredField, "$.execution.steps", "at least one execution step is required"))
		}
		if reasoningDigest, ok := execution["reasoningDigest"].(string); ok {
			validateDigest(reasoningDigest, "$.execution.reasoningDigest", &failures)
		}
	}

	provenance := requireArray(document, "provenance", "$", &failures)
	seen := map[string]bool{}
	for index, value := range provenance {
		path := "$.provenance[" + itoa(index) + "]"
		if block, ok := requireObject(value, path, &failures); ok {
			blockID := requireString(block, "blockId", path, &failures)
			validateAegisURI(blockID, path+".blockId", &failures)
			if seen[blockID] {
				failures = append(failures, failure(ErrProvenanceGap, path+".blockId", "duplicate provenance block"))
			}
			seen[blockID] = true
			if artifactDigest, ok := block["artifactDigest"].(string); ok {
				validateDigest(artifactDigest, path+".artifactDigest", &failures)
			}
			validateSignature(block["signature"], path+".signature", &failures)
		}
	}

	if impact, ok := requireObject(document["impact"], "$.impact", &failures); ok {
		receiptID := requireString(impact, "receiptId", "$.impact", &failures)
		validateAegisURI(receiptID, "$.impact.receiptId", &failures)
		review, _ := impact["review"].(string)
		if review != "none" && review != "pending" && review != "approved" && review != "rejected" {
			failures = append(failures, failure(ErrImpactUnreviewed, "$.impact.review", "invalid review state"))
		}
	}

	signatures := requireArray(document, "signatures", "$", &failures)
	if signatures != nil && len(signatures) == 0 {
		failures = append(failures, failure(ErrSignatureInvalid, "$.signatures", "at least one runtime signature is required"))
	}

	if len(failures) > 0 {
		return invalidResult(failures)
	}
	return validResult(map[string]string{"kind": "manifest", "manifestId": manifestID})
}
