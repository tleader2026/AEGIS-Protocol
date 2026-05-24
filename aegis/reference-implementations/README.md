# Reference Implementations

Planned reference components:

- `aegis-runtime`: userspace daemon for session lifecycle, signing, attestation hooks, and local record storage
- `aegis-mcp`: AEGIS transport implementation for accountable MCP sessions
- `aegis-a2a`: AEGIS transport implementation for accountable agent-to-agent sessions
- `aegis-acp`: AEGIS transport implementation for accountable ACP sessions
- `aegis-validator`: canonical manifest and packet validator
- `aegis-registry`: transparency, witness, revocation, and reconciliation service
- `aegis-k8s-admission`: Kubernetes admission controller for AI workloads
- `aegis-otel-bridge`: OpenTelemetry bridge for cognitive workflow traces
- `aegis-browser-verifier`: browser extension or browser-native verification layer
- `aegis-offline-bundle`: air-gapped import/export verifier

Reference implementations must prioritize readability, conformance, and test vectors over vendor-specific optimization.
