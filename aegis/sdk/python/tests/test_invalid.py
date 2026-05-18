import unittest

from aegis import validate_packet


class InvalidPacketTests(unittest.TestCase):
    def test_missing_signature_is_invalid(self) -> None:
        result = validate_packet(
            {
                "aegisVersion": "1.0-draft",
                "packetType": "aegis.identity.hello.v1",
                "packetId": "aegis:packet:test",
                "issuer": "did:aegis:agent:test",
                "audience": "aegis://example.test/verifier",
                "issuedAt": "2026-05-18T00:00:00Z",
                "bodyDigest": "sha256:4a9d9ec0b44e52ad82bdf20a191c7a91",
                "body": {}
            }
        )
        self.assertFalse(result.valid)
        self.assertTrue(any(failure.code == "AEGIS_E_SIGNATURE_INVALID" for failure in result.failures))


if __name__ == "__main__":
    unittest.main()
