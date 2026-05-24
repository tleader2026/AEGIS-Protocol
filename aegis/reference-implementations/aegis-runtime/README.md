# AEGIS Runtime Daemon

The MVP runtime daemon is a userspace local trust anchor. It runs on Windows 11, macOS, Linux, and Raspberry Pi OS using the Python standard library.

## Run Directly

```bash
cd aegis/sdk/python
python -m aegis.daemon --records .aegis/records.jsonl --region-hint US
```

On Raspberry Pi OS use `python3`.

The daemon reads one JSON-RPC request per line from stdin and writes one JSON-RPC response per line to stdout.

## Smoke Test

```json
{"jsonrpc":"2.0","id":1,"method":"aegis.hello","params":{}}
```

Expected response includes:

- `aegisVersion`
- supported JSON-RPC methods
- `AEGIS-MCP-1.0-draft`
- `AEGIS-A2A-1.0-draft`
- `AEGIS-ACP-1.0-draft`

## Platform Launchers

- Windows 11: `windows/run-aegis-runtime.ps1`
- macOS: `macos/com.aegis.runtime.plist`
- Linux/Raspberry Pi: `linux/aegis-runtime.service`
