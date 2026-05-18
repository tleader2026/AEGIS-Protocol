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
	manifest, err := LoadManifest(path)
	if err != nil {
		return ValidationResult{}, err
	}
	return ValidateManifest(manifest), nil
}
