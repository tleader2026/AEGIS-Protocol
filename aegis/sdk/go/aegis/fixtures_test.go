package aegis

import (
	"path/filepath"
	"testing"
)

func TestSupervisedRemediationManifestIsValid(t *testing.T) {
	path := filepath.Join("..", "..", "..", "examples", "supervised-remediation.manifest.json")
	manifest, err := LoadManifest(path)
	if err != nil {
		t.Fatal(err)
	}
	result := ValidateManifest(manifest)
	if !result.Valid() {
		t.Fatalf("expected valid manifest, got %+v", result.Failures)
	}
}

func TestPacketFixturesAreValid(t *testing.T) {
	packetDir := filepath.Join("..", "..", "..", "examples", "packets")
	paths, err := filepath.Glob(filepath.Join(packetDir, "*.packet.json"))
	if err != nil {
		t.Fatal(err)
	}
	if len(paths) == 0 {
		t.Fatal("expected packet fixtures")
	}
	for _, path := range paths {
		t.Run(filepath.Base(path), func(t *testing.T) {
			packet, err := LoadPacket(path)
			if err != nil {
				t.Fatal(err)
			}
			result := ValidatePacket(packet)
			if !result.Valid() {
				t.Fatalf("expected valid packet, got %+v", result.Failures)
			}
		})
	}
}

func TestProvenanceFixturesAreValid(t *testing.T) {
	provenanceDir := filepath.Join("..", "..", "..", "examples", "provenance")
	paths, err := filepath.Glob(filepath.Join(provenanceDir, "*.provenance.json"))
	if err != nil {
		t.Fatal(err)
	}
	if len(paths) == 0 {
		t.Fatal("expected provenance fixtures")
	}
	for _, path := range paths {
		t.Run(filepath.Base(path), func(t *testing.T) {
			envelope, err := LoadProvenanceEnvelope(path)
			if err != nil {
				t.Fatal(err)
			}
			result := ValidateProvenanceEnvelope(envelope)
			if !result.Valid() {
				t.Fatalf("expected valid provenance envelope, got %+v", result.Failures)
			}
		})
	}
}
