package aegis

import "strings"

func ValidateFixture(path string) (ValidationResult, error) {
	if strings.HasSuffix(path, ".packet.json") {
		packet, err := LoadPacket(path)
		if err != nil {
			return ValidationResult{}, err
		}
		return ValidatePacket(packet), nil
	}
	if strings.HasSuffix(path, ".provenance.json") {
		envelope, err := LoadProvenanceEnvelope(path)
		if err != nil {
			return ValidationResult{}, err
		}
		return ValidateProvenanceEnvelope(envelope), nil
	}
	manifest, err := LoadManifest(path)
	if err != nil {
		return ValidationResult{}, err
	}
	return ValidateManifest(manifest), nil
}
