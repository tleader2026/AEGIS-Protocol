# Kernel / Hardware Layer

The AEGIS kernel layer starts as a userspace machine-anchor collector so it can be tested on Windows 11, macOS, Linux, and Raspberry Pi without kernel privileges.

## MVP

- collect platform evidence
- derive an AEGIS `MachineAnchor`
- attach an attestation digest to runtime records
- run on Raspberry Pi OS without eBPF or TPM2 requirements

The Python implementation lives in `aegis/sdk/python/aegis/kernel.py`.

## Raspberry Pi Test

On Raspberry Pi OS:

```bash
cd aegis/sdk/python
python3 -m aegis.daemon --records /tmp/aegis-records.jsonl --region-hint GB
```

Send a JSON-RPC request:

```json
{"jsonrpc":"2.0","id":1,"method":"aegis.hello","params":{}}
```

The daemon should respond with supported methods and conformance profiles. The generated `MachineAnchor` should include a digest derived from Linux machine evidence such as `/etc/machine-id`.

## Future Kernel Hooks

Future releases can add:

- Linux eBPF probes for process, file, network, and syscall observability
- TPM2 quote verification for hardware-rooted machine identity
- secure enclave signing key protection
- macOS Endpoint Security hooks
- Windows ETW / WFP / TPM integration

These hooks feed evidence upward into `RuntimeAttestation` and `ProvenanceEnvelope`; they do not change MCP, A2A, or ACP.
