"use client";

import { useState } from "react";
import { useLang } from "@/i18n";

export default function Showcase() {
  const { t } = useLang();
  const s = t.showcase;
  const [copied, setCopied] = useState<number | null>(null);

  async function copy(text: string, i: number) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(i);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function shareUrl(network: "x" | "linkedin", text: string) {
    const url = typeof window === "undefined" ? "" : window.location.href;
    if (network === "x") {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  }

  return (
    <section id="showcase" className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{s.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{s.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-ink/70">{s.body}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {s.cards.map((c, i) => (
            <article key={i} className="flex flex-col rounded-[32px] border border-line bg-paper-warm p-8">
              <h3 className="display text-[24px] leading-snug">{c.q}</h3>
              <p className="mt-4 flex-1 text-[16px] leading-relaxed text-ink/75">{c.a}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                <button
                  onClick={() => copy(c.cite, i)}
                  className="rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white hover:bg-canada"
                >
                  {copied === i ? s.copied : s.cite}
                </button>
                <a
                  href={shareUrl("x", c.share)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] font-semibold hover:border-ink"
                >
                  {s.shareX}
                </a>
                <a
                  href={shareUrl("linkedin", c.share)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-[13px] font-semibold hover:border-ink"
                >
                  {s.shareLinkedIn}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
