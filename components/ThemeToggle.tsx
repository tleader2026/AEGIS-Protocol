"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
  }, [light]);

  return (
    <button
      aria-label="Toggle color mode"
      onClick={() => setLight((value) => !value)}
      className="inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/8 text-white transition hover:border-signal/50 hover:text-signal light:border-ink/15 light:bg-ink/5 light:text-ink"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
