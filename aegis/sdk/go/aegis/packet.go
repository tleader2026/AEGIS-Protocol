package aegis

var packetTypes = map[string]bool{
	"aegis.identity.hello.v1":       true,
	"aegis.intent.present.v1":       true,
	"aegis.execution.checkpoint.v1": true,
	"aegis.provenance.publish.v1":   true,
	"aegis.impact.receipt.v1":       true,
	"aegis.registry.reconcile.v1":   true,
}

func LoadPacket(path string) (Document, error) {
	return loadJSON(path)
}

func ValidatePacket(document Document) ValidationResult {
	failures := []ValidationFailure{}

	if document["aegisVersion"] != AegisVersion {
		failures = append(failures, failure(ErrRequiredField, "$.aegisVersion", "expected 1.0-draft"))
	}

	packetType := requireString(document, "packetType", "$", &failures)
	if packetType != "" && !packetTypes[packetType] {
		failures = append(failures, failure(ErrRequiredField, "$.packetType", "unregistered packet type"))
	}

	packetID := requireString(document, "packetId", "$", &failures)
	validateAegisURI(packetID, "$.packetId", &failures)
	requireString(document, "issuer", "$", &failures)
	requireString(document, "audience", "$", &failures)
	requireString(document, "issuedAt", "$", &failures)
	bodyDigest := requireString(document, "bodyDigest", "$", &failures)
	validateDigest(bodyDigest, "$.bodyDigest", &failures)
	requireObject(document["body"], "$.body", &failures)
	validateSignature(document["signature"], "$.signature", &failures)

	if len(failures) > 0 {
		return invalidResult(failures)
	}
	return validResult(map[string]string{"kind": "packet", "packetType": packetType})
}
