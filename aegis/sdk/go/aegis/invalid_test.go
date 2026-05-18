package aegis

import "testing"

func TestMissingSignatureIsInvalid(t *testing.T) {
	result := ValidatePacket(Document{
		"aegisVersion": "1.0-draft",
		"packetType":   "aegis.identity.hello.v1",
		"packetId":     "aegis:packet:test",
		"issuer":       "did:aegis:agent:test",
		"audience":     "aegis://example.test/verifier",
		"issuedAt":     "2026-05-18T00:00:00Z",
		"bodyDigest":   "sha256:4a9d9ec0b44e52ad82bdf20a191c7a91",
		"body":         Document{},
	})
	if result.Valid() {
		t.Fatal("expected missing signature packet to be invalid")
	}
	found := false
	for _, item := range result.Failures {
		if item.Code == ErrSignatureInvalid {
			found = true
		}
	}
	if !found {
		t.Fatalf("expected signature failure, got %+v", result.Failures)
	}
}
