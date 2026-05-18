type CodeBlockProps = {
  code: string;
  title?: string;
};

export function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <div className="overflow-hidden border border-white/12 bg-ink/80 shadow-panel light:border-ink/10 light:bg-white">
      {title ? (
        <div className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal light:border-ink/10 light:text-ink">
          {title}
        </div>
      ) : null}
      <pre className="code-scroll overflow-x-auto p-4 text-[12px] leading-6 text-white/78 light:text-ink/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}
