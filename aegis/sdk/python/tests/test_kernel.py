import unittest

from aegis import collect_machine_evidence, create_machine_anchor


class KernelTests(unittest.TestCase):
    def test_collect_machine_evidence_returns_platform_shape(self) -> None:
        evidence = collect_machine_evidence()
        self.assertIn("system", evidence)
        self.assertIn("machine", evidence)
        self.assertIn("hostname", evidence)

    def test_create_machine_anchor_returns_aegis_ids(self) -> None:
        anchor = create_machine_anchor(runtime_id="aegis:runtime:test")
        self.assertTrue(anchor.machine_id.startswith("aegis:machine:"))
        self.assertEqual(anchor.runtime_id, "aegis:runtime:test")
        self.assertIsNotNone(anchor.attestation_digest)


if __name__ == "__main__":
    unittest.main()
