import unittest
from pathlib import Path

from aegis import load_manifest, load_packet, validate_manifest, validate_packet


ROOT = Path(__file__).resolve().parents[3]


class FixtureTests(unittest.TestCase):
    def test_supervised_remediation_manifest_is_valid(self) -> None:
        manifest = load_manifest(ROOT / "examples" / "supervised-remediation.manifest.json")
        result = validate_manifest(manifest)
        self.assertTrue(result.valid, result.failures)

    def test_packet_fixtures_are_valid(self) -> None:
        packet_dir = ROOT / "examples" / "packets"
        for path in packet_dir.glob("*.packet.json"):
            with self.subTest(path=path.name):
                packet = load_packet(path)
                result = validate_packet(packet)
                self.assertTrue(result.valid, result.failures)


if __name__ == "__main__":
    unittest.main()
