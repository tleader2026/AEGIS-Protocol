package aegis

var transportProfiles = map[string]string{
	"mcp": "AEGIS-MCP-1.0-draft",
	"a2a": "AEGIS-A2A-1.0-draft",
	"acp": "AEGIS-ACP-1.0-draft",
}

var claimTypes = map[string]bool{
	"session.open":     true,
	"tool.call":        true,
	"resource.read":    true,
	"prompt.render":    true,
	"agent.message":    true,
	"agent.delegate":   true,
	"state.checkpoint": true,
	"session.close":    true,
}

func LoadProvenanceEnvelope(path string) (Document, error) {
	return loadJSON(path)
}

func ValidateProvenanceEnvelope(document Document) ValidationResult {
	failures := []ValidationFailure{}

	if document["aegisVersion"] != AegisVersion {
		failures = append(failures, failure(ErrRequiredField, "$.aegisVersion", "expected 1.0-draft"))
	}
	envelopeID := requireString(document, "envelopeId", "$", &failures)
	validateAegisURI(envelopeID, "$.envelopeId", &failures)

	transport, ok := requireObject(document["transport"], "$.transport", &failures)
	transportKind := ""
	if ok {
		transportKind = requireString(transport, "kind", "$.transport", &failures)
		requireString(transport, "protocolVersion", "$.transport", &failures)
		profile := requireString(transport, "conformanceProfile", "$.transport", &failures)
		expectedProfile, supported := transportProfiles[transportKind]
		if transportKind != "" && !supported {
			failures = append(failures, failure(ErrRequiredField, "$.transport.kind", "unsupported transport kind"))
		}
		if supported && profile != expectedProfile {
			failures = append(failures, failure(ErrRequiredField, "$.transport.conformanceProfile", "profile does not match transport kind"))
		}
	}

	session, ok := requireObject(document["session"], "$.session", &failures)
	if ok {
		sessionID := requireString(session, "sessionId", "$.session", &failures)
		validateAegisURI(sessionID, "$.session.sessionId", &failures)
		requireString(session, "startedAt", "$.session", &failures)
	}

	machine, ok := requireObject(document["machine"], "$.machine", &failures)
	if ok {
		machineID := requireString(machine, "machineId", "$.machine", &failures)
		validateAegisURI(machineID, "$.machine.machineId", &failures)
		runtimeID := requireString(machine, "runtimeId", "$.machine", &failures)
		validateAegisURI(runtimeID, "$.machine.runtimeId", &failures)
		if attestationDigest, ok := machine["attestationDigest"].(string); ok {
			validateDigest(attestationDigest, "$.machine.attestationDigest", &failures)
		}
	}

	actor, ok := requireObject(document["actor"], "$.actor", &failures)
	if ok {
		requireString(actor, "agentId", "$.actor", &failures)
		requireString(actor, "issuer", "$.actor", &failures)
	}

	intent, ok := requireObject(document["intent"], "$.intent", &failures)
	if ok {
		intentID := requireString(intent, "intentId", "$.intent", &failures)
		validateAegisURI(intentID, "$.intent.intentId", &failures)
		requireString(intent, "summary", "$.intent", &failures)
		intentDigest := requireString(intent, "intentDigest", "$.intent", &failures)
		validateDigest(intentDigest, "$.intent.intentDigest", &failures)
	}

	execution, ok := requireObject(document["execution"], "$.execution", &failures)
	if ok {
		claims := requireArray(execution, "claims", "$.execution", &failures)
		if len(claims) == 0 {
			failures = append(failures, failure(ErrRequiredField, "$.execution.claims", "at least one claim is required"))
		}
		for index, value := range claims {
			claimPath := "$.execution.claims[" + itoa(index) + "]"
			claim, ok := requireObject(value, claimPath, &failures)
			if !ok {
				continue
			}
			claimID := requireString(claim, "claimId", claimPath, &failures)
			validateAegisURI(claimID, claimPath+".claimId", &failures)
			claimType := requireString(claim, "claimType", claimPath, &failures)
			if claimType != "" && !claimTypes[claimType] {
				failures = append(failures, failure(ErrRequiredField, claimPath+".claimType", "unsupported claim type"))
			}
			requireString(claim, "occurredAt", claimPath, &failures)
			claimDigest := requireString(claim, "claimDigest", claimPath, &failures)
			validateDigest(claimDigest, claimPath+".claimDigest", &failures)
		}
	}

	lineage, ok := requireObject(document["lineage"], "$.lineage", &failures)
	if ok {
		parents := requireArray(lineage, "parents", "$.lineage", &failures)
		for index, value := range parents {
			parentID, ok := value.(string)
			if !ok {
				failures = append(failures, failure(ErrIdentifier, "$.lineage.parents["+itoa(index)+"]", "invalid AEGIS URI"))
				continue
			}
			validateAegisURI(parentID, "$.lineage.parents["+itoa(index)+"]", &failures)
		}
		if lineageDigest, ok := lineage["lineageDigest"].(string); ok {
			validateDigest(lineageDigest, "$.lineage.lineageDigest", &failures)
		}
	}

	requireString(document, "issuedAt", "$", &failures)
	validateSignature(document["signature"], "$.signature", &failures)

	if len(failures) > 0 {
		return invalidResult(failures)
	}
	return validResult(map[string]string{"kind": "provenance-envelope", "transport": transportKind})
}
