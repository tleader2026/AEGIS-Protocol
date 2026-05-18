import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileCode2,
  GitPullRequest,
  Landmark,
  LockKeyhole,
  Network,
  Orbit,
  ShieldCheck,
  Terminal,
  Workflow
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { HeroNetwork } from "@/components/HeroNetwork";
import { PacketInspector } from "@/components/PacketInspector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrustGraph } from "@/components/TrustGraph";
import { cliExamples, comparisons, coreObjects, governance, layers, rfcTemplate, technicalSections } from "@/data/protocol";

const nav = ["Layers", "Objects", "Interfaces", "Governance", "Developer"];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-white light:bg-paper light:text-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/82 backdrop-blur-xl light:border-ink/10 light:bg-paper/82">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center border border-signal/50 bg-signal/10 font-mono text-sm font-semibold text-signal">A</div>
            <div>
              <div className="text-sm font-semibold tracking-[0.14em]">AEGIS</div>
              <div className="hidden text-[11px] text-white/50 light:text-ink/55 sm:block">Adaptive Execution & Governance Integrity Standard</div>
            </div>
          </a>
          <nav className="hidden items-center gap-5 text-sm text-white/62 light:text-ink/62 md:flex">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-signal">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#developer" className="hidden border border-white/15 px-3 py-2 text-sm transition hover:border-signal/60 hover:text-signal light:border-ink/15 sm:inline-flex">
              Start building
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 aegis-grid opacity-35" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-xs text-signal">
              <ShieldCheck size={14} />
              AEGIS/1.0-draft open standard
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              The internet authenticated machines. AEGIS authenticates intelligence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 light:text-ink/68">
              Adaptive Execution & Governance Integrity Standard is a protocol layer for AI provenance, agent identity,
              signed intent, runtime attestation, semantic lineage, and accountable impact across autonomous systems.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Identity", "who initiated action"],
                ["Execution", "what actually ran"],
                ["Impact", "which systems changed"]
              ].map(([title, body]) => (
                <div key={title} className="border border-white/12 bg-white/[0.04] p-4 light:border-ink/10 light:bg-white/55">
                  <div className="font-mono text-xs uppercase text-signal">{title}</div>
                  <div className="mt-2 text-sm text-white/62 light:text-ink/62">{body}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroNetwork />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] light:border-ink/10 light:bg-white/50">
        <div className="mx-auto grid max-w-7xl gap-px px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ["For labs", "model provenance and delegated agent accountability"],
            ["For governments", "sovereign trust roots and compliance receipts"],
            ["For clouds", "attested execution and registry reconciliation"],
            ["For browsers", "AI-origin signals and human approval binding"]
          ].map(([title, body]) => (
            <div key={title} className="px-4 py-8">
              <div className="text-sm font-semibold">{title}</div>
              <div className="mt-2 text-sm leading-6 text-white/58 light:text-ink/62">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="layers" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionKicker icon={<Network size={16} />} label="Protocol layers" />
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Five layers for verifiable AI execution.</h2>
            <p className="mt-4 max-w-xl text-white/62 light:text-ink/64">
              AEGIS is not a content watermark, permission library, or trace viewer. It is the cross-system packet model
              that binds agent identity, declared intent, runtime evidence, provenance continuity, and external impact.
            </p>
          </div>
          <div className="space-y-3">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article key={layer.name} className="grid gap-4 border border-white/12 bg-white/[0.04] p-5 light:border-ink/10 light:bg-white md:grid-cols-[170px_1fr]">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center border border-signal/35 text-signal">
                      <Icon size={18} />
                    </div>
                    <div className="font-mono text-xs uppercase text-white/48 light:text-ink/50">Layer {layer.number}</div>
                    <h3 className="mt-1 text-xl font-semibold">{layer.name}</h3>
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-white/65 light:text-ink/65">{layer.summary}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {layer.capabilities.map((capability) => (
                        <div key={capability} className="flex items-center gap-2 text-sm text-white/68 light:text-ink/68">
                          <CheckCircle2 size={14} className="text-signal" />
                          {capability}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {layer.artifacts.map((artifact) => (
                        <span key={artifact} className="border border-white/12 px-2 py-1 font-mono text-[11px] text-trust light:border-ink/10 light:text-ink">
                          {artifact}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-20 light:border-ink/10 light:bg-white/45">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker icon={<Workflow size={16} />} label="Interactive visualizations" />
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Observe trust like infrastructure.</h2>
              <p className="mt-4 text-white/62 light:text-ink/64">
                The graph models agents communicating, provenance graph generation, distributed inference handoffs,
                human approval injection, tamper detection, and rogue agent isolation as first-class protocol events.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["chain-of-custody", "distributed inference", "semantic lineage", "global registry sync", "orbital routing", "human sovereignty"].map((item) => (
                  <div key={item} className="border border-white/10 px-3 py-2 font-mono text-xs text-white/62 light:border-ink/10 light:text-ink/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <TrustGraph />
          </div>
        </div>
      </section>

      <section id="objects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionKicker icon={<FileCode2 size={16} />} label="Canonical objects" />
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Protocol objects with validation semantics.</h2>
            <p className="mt-4 max-w-2xl text-white/62 light:text-ink/64">
              Each object includes schema shape, lifecycle, validation logic, and cryptographic assumptions so independent
              implementations can converge on the same packet behavior.
            </p>
          </div>
          <a href="#developer" className="inline-flex w-fit items-center gap-2 border border-white/15 px-3 py-2 text-sm text-white/70 hover:border-signal hover:text-signal light:border-ink/15 light:text-ink">
            SDK mockups <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="mt-8 grid gap-5">
          {coreObjects.map((object) => (
            <article key={object.name} className="grid gap-5 border border-white/12 bg-white/[0.035] p-5 light:border-ink/10 light:bg-white lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h3 className="text-2xl font-semibold">{object.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62 light:text-ink/64">{object.purpose}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <MiniList title="Lifecycle" items={object.lifecycle} />
                  <MiniList title="Validation" items={object.validation} />
                  <MiniList title="Crypto" items={object.crypto} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CodeBlock title="schema" code={object.schema} />
                <CodeBlock title="example json" code={object.example} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="interfaces" className="border-y border-white/10 bg-white/[0.03] py-20 light:border-ink/10 light:bg-white/45">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker icon={<Cpu size={16} />} label="Technical components" />
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Wire protocols, registries, and trust exchange.</h2>
              <p className="mt-4 text-white/62 light:text-ink/64">
                AEGIS defines canonical packets and transport bindings. It can ride over modern web infrastructure,
                private control planes, robotics systems, CI/CD, air-gapped networks, and delay-tolerant orbital links.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {technicalSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article key={section.title} className="border border-white/12 bg-ink/72 p-4 light:border-ink/10 light:bg-white">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon size={17} className="text-signal" />
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <p className="mb-4 text-sm leading-6 text-white/60 light:text-ink/62">{section.copy}</p>
                    <CodeBlock code={section.code} />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionKicker icon={<LockKeyhole size={16} />} label="Playground" />
        <div className="mt-4 mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Packet inspection and tamper detection.</h2>
          <p className="mt-4 text-white/62 light:text-ink/64">
            A verifier does not need private reasoning text to detect a modified execution chain. It validates canonical
            digests, signatures, runtime claims, policy scope, registry status, and human approval context.
          </p>
        </div>
        <PacketInspector />
      </section>

      <section id="governance" className="border-y border-white/10 bg-white/[0.03] py-20 light:border-ink/10 light:bg-white/45">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker icon={<Landmark size={16} />} label="Open governance" />
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">An adoption path that institutions can trust.</h2>
              <p className="mt-4 text-white/62 light:text-ink/64">
                AEGIS follows the habits of durable infrastructure: public drafts, working groups, test vectors,
                conformance suites, independent implementations, security review, and transparent trust authority rules.
              </p>
              <div className="mt-6 border border-white/12 bg-ink/70 p-4 light:border-ink/10 light:bg-white">
                <div className="mb-2 flex items-center gap-2 font-semibold"><GitPullRequest size={16} className="text-signal" /> RFC template</div>
                <CodeBlock code={rfcTemplate} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {governance.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="border border-white/12 bg-white/[0.04] p-5 light:border-ink/10 light:bg-white">
                    <Icon className="text-signal" size={20} />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62 light:text-ink/64">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionKicker icon={<Boxes size={16} />} label="Comparisons" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">AEGIS composes with existing trust primitives.</h2>
        <div className="mt-8 overflow-hidden border border-white/12 light:border-ink/10">
          {comparisons.map(([standard, scope, aegis]) => (
            <div key={standard} className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 light:border-ink/10 md:grid-cols-[150px_240px_1fr]">
              <div className="font-mono text-sm text-signal">{standard}</div>
              <div className="text-sm text-white/70 light:text-ink/70">{scope}</div>
              <div className="text-sm leading-6 text-white/60 light:text-ink/62">{aegis}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="developer" className="border-t border-white/10 bg-[#050b0e] py-20 light:border-ink/10 light:bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker icon={<Terminal size={16} />} label="Developer ecosystem" />
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Docs, SDKs, CLI, validator, explorer, and test harnesses.</h2>
              <p className="mt-4 text-white/62 light:text-ink/64">
                The reference ecosystem is designed for labs, infrastructure teams, auditors, and agent developers:
                packet creation, manifest validation, provenance exploration, registry sync, and policy-bound execution.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["TypeScript SDK", "Python SDK", "Rust packets", "Kubernetes admission", "Browser verifier", "OpenTelemetry bridge"].map((item) => (
                  <div key={item} className="flex items-center justify-between border border-white/12 px-3 py-3 text-sm light:border-ink/10">
                    {item}
                    <ChevronRight size={15} className="text-signal" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <CodeBlock title="CLI" code={cliExamples.join("\n")} />
              <CodeBlock
                title="validator response"
                code={`{
  "valid": true,
  "subject": "did:aegis:agent:sre.remediator",
  "registry": "aegis.registry://cloud/root",
  "checks": {
    "identity": "resolved",
    "intent": "scope-bound",
    "runtime": "attested",
    "provenance": "continuous",
    "impact": "review-approved"
  }
}`}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-sm text-white/45 light:border-ink/10 light:text-ink/50 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>AEGIS is a draft open protocol for AI-native trust infrastructure.</div>
          <div className="font-mono">provenance as infrastructure · trust as a protocol layer</div>
        </div>
      </footer>
    </main>
  );
}

function SectionKicker({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-signal/25 bg-signal/10 px-3 py-1.5 font-mono text-xs uppercase text-signal">
      {icon}
      {label}
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-2 font-mono text-[11px] uppercase text-trust light:text-ink">{title}</div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-5 text-white/58 light:text-ink/62">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
