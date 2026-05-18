"use client";

import { CheckCircle2, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock";

const basePacket = {
  packetType: "aegis.execution.v1",
  issuer: "did:aegis:agent:sre.remediator",
  intent: "sha256:4a9d9ec0b44e",
  envelope: "sha256:82bdf20a191c",
  runtime: "sha256:7a91c0ffee11",
  signature: "ed25519:verified",
  humanApproval: "aegis:approval:9120"
};

export function PacketInspector() {
  const [tampered, setTampered] = useState(false);

  const packet = useMemo(
    () => ({
      ...basePacket,
      envelope: tampered ? "sha256:mutated-after-seal" : basePacket.envelope,
      signature: tampered ? "ed25519:invalid" : basePacket.signature
    }),
    [tampered]
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <CodeBlock title="packet inspector" code={JSON.stringify(packet, null, 2)} />
      <div className="border border-white/12 bg-white/[0.04] p-5 light:border-ink/10 light:bg-white">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Manifest Validator</h3>
            <p className="mt-1 text-sm text-white/58 light:text-ink/60">Toggle mutation to watch validation fail at the execution digest boundary.</p>
          </div>
          <button
            onClick={() => setTampered((value) => !value)}
            className="border border-white/15 px-3 py-2 text-sm text-white transition hover:border-signal hover:text-signal light:border-ink/15 light:text-ink"
          >
            {tampered ? "Restore" : "Tamper"}
          </button>
        </div>
        <div className="space-y-3">
          {[
            ["Identity", true],
            ["Intent scope", true],
            ["Runtime attestation", true],
            ["Envelope digest", !tampered],
            ["Signature", !tampered],
            ["Human approval", true]
          ].map(([label, ok]) => (
            <div key={label as string} className="flex items-center justify-between border border-white/10 px-3 py-2 light:border-ink/10">
              <span className="font-mono text-xs uppercase text-white/70 light:text-ink/70">{label}</span>
              {ok ? <CheckCircle2 className="text-signal" size={18} /> : <ShieldAlert className="text-red-400" size={18} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
