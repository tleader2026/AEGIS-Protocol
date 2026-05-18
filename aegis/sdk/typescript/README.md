# AEGIS TypeScript SDK

Draft package name: `@aegis-protocol/sdk`

## Target Use Cases

- browser agent verification
- Node.js agent runtimes
- packet inspection tools
- registry clients
- CI and policy checks

## Sketch

```ts
import { AegisRuntime, verifyManifest } from "@aegis-protocol/sdk";

const result = await verifyManifest(manifest, {
  registry: "aegis.registry://cloud/root"
});

if (!result.valid) {
  throw new Error(result.failures[0].message);
}

const runtime = await AegisRuntime.attest({
  agent: "did:aegis:agent:sre.remediator",
  registry: "aegis.registry://enterprise/root"
});
```
