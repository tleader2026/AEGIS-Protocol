import tempfile
import unittest
from pathlib import Path

from aegis import AegisA2aSession, AegisMcpSession, AegisRuntimeDaemon, JsonlRecordStore, MachineAnchor, validate_provenance_envelope


class RuntimeTests(unittest.TestCase):
    def test_mcp_session_publishes_valid_envelope(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            store = JsonlRecordStore(Path(temp_dir) / "records.jsonl")
            runtime = AegisRuntimeDaemon(
                machine=MachineAnchor(
                    machine_id="aegis:machine:test",
                    runtime_id="aegis:runtime:python-test",
                    attestation_digest="sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    region_hint="US",
                ),
                store=store,
            )
            session = AegisMcpSession(
                runtime=runtime,
                protocol_version="2025-03-26",
                endpoint="mcp://local/test",
                session_id="aegis:session:test",
                agent_id="aegis-agent:test",
                issuer="did:web:aegis.dev",
            )

            session.open()
            session.submit_intent("aegis:intent:test", "Validate that MCP can emit a provenance envelope.")
            session.attest_runtime({"runtime": "python-test"})
            session.tool_call("aegis:exec:test-tool", "filesystem.read", {"path": "README.md"})
            session.resolve_lineage([])
            envelope = session.publish("aegis:envelope:test")

            result = validate_provenance_envelope(envelope)
            self.assertTrue(result.valid, result.failures)
            self.assertEqual(store.query(sessionId="aegis:session:test")[0]["envelopeId"], "aegis:envelope:test")

    def test_jsonrpc_hello_and_negotiate(self) -> None:
        runtime = AegisRuntimeDaemon(
            machine=MachineAnchor(
                machine_id="aegis:machine:test",
                runtime_id="aegis:runtime:python-test",
            )
        )

        hello = runtime.handle_jsonrpc({"jsonrpc": "2.0", "id": 1, "method": "aegis.hello", "params": {}})
        self.assertEqual(hello["result"]["aegisVersion"], "1.0-draft")

        negotiate = runtime.handle_jsonrpc(
            {
                "jsonrpc": "2.0",
                "id": 2,
                "method": "aegis.negotiate",
                "params": {"conformanceProfile": "AEGIS-MCP-1.0-draft"},
            }
        )
        self.assertTrue(negotiate["result"]["accepted"])

    def test_a2a_session_publishes_valid_delegation_envelope(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            store = JsonlRecordStore(Path(temp_dir) / "records.jsonl")
            runtime = AegisRuntimeDaemon(
                machine=MachineAnchor(
                    machine_id="aegis:machine:test",
                    runtime_id="aegis:runtime:python-test",
                    attestation_digest="sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                ),
                store=store,
            )
            session = AegisA2aSession(
                runtime=runtime,
                protocol_version="0.1-draft",
                endpoint="a2a://agent/researcher",
                session_id="aegis:session:a2a-test",
                agent_id="aegis-agent:planner",
                issuer="did:web:aegis.dev",
            )

            session.open()
            session.submit_intent("aegis:intent:a2a-test", "Delegate a bounded task to another agent.")
            session.delegate("aegis:exec:a2a-delegate-test", "aegis-agent:researcher", {"task": "summarize"})
            session.message("aegis:exec:a2a-message-test", "aegis-agent:researcher", {"status": "accepted"})
            session.resolve_lineage(["aegis:envelope:test"])
            envelope = session.publish("aegis:envelope:a2a-test")

            result = validate_provenance_envelope(envelope)
            self.assertTrue(result.valid, result.failures)
            self.assertEqual(envelope["transport"]["kind"], "a2a")
            self.assertEqual(envelope["transport"]["conformanceProfile"], "AEGIS-A2A-1.0-draft")


if __name__ == "__main__":
    unittest.main()
