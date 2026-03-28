import React, { useState } from "react";
import { motion } from "framer-motion";
import { CopyIcon, CheckIcon, PlusIcon } from "./icons";
import { useCopy } from "../lib/useCopy";

interface HeroProps {
  name: string;
  description: string;
  listingUrl: string;
  author: { name: string; url: string };
  socials: { label: string; href: string }[];
  bannerUrl?: string;
}

export default function Hero({
  name,
  description,
  listingUrl,
  author,
  socials,
  bannerUrl,
}: HeroProps) {
  const { status, copy } = useCopy(listingUrl);
  const [showSteps, setShowSteps] = useState(false);

  const addUrl = `vcc://vpm/addRepo?url=${encodeURIComponent(listingUrl)}`;

  const firstName = name.split(" ")[0];
  const restName = name.split(" ").slice(1).join(" ");

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pt-20 pb-16 px-4">
      {/* --- Zone panel --- */}
      <div className="absolute inset-0 bg-[var(--color-surface)] tight-shadow rounded-[9px] overflow-hidden -z-10">
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt=""
            className="w-full h-full object-cover scale-110 blur-[6px] brightness-[0.55]"
            loading="eager"
            decoding="async"
          />
        )}
      </div>

      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8"
      >
        <img
          src={`${import.meta.env.BASE_URL}LPD Shield.png`}
          alt="LPD Shield - Local Police Department logo"
          className="mx-auto w-20 h-20 mb-4 object-contain"
          loading="eager"
          decoding="async"
        />

        <h1 className="font-display text-6xl md:text-7xl font-bold uppercase tracking-wide text-white mb-3 leading-[1.05] pb-1">
          {firstName}{" "}
          <span className="font-bold text-[var(--color-electric)]">
            {restName}
          </span>
        </h1>

        <p className="text-base text-white/85 font-normal">{description}</p>

        {/* --- Socials --- */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {socials.map((social, index) => (
            <React.Fragment key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener"
                className="text-base font-bold text-[var(--color-glow)] underline underline-offset-2 hover:text-[var(--color-orchid)] transition-colors"
              >
                {social.label}
              </a>
              {index < socials.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)] hidden sm:inline-block" />
              )}
            </React.Fragment>
          ))}
          {socials.length > 0 && (
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)] hidden sm:inline-block" />
          )}
          <span className="text-base font-bold text-[var(--color-muted)]">
            Published by{" "}
            <a
              href={author.url}
              target="_blank"
              rel="noopener"
              className="text-[var(--color-glow)] underline underline-offset-2 hover:text-[var(--color-orchid)]"
            >
              {author.name}
            </a>
          </span>
        </div>
      </motion.div>

      {/* --- Dock --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-stretch gap-2 sm:h-12"
      >
        <button
          onClick={copy}
          aria-label="Copy listing URL"
          className="flex-1 flex items-center justify-between w-full sm:w-auto px-4 h-12 sm:h-full rounded-[9px] bg-black/40 hover:bg-black/60 border-0 transition-colors cursor-pointer group"
        >
          <code className="text-xs font-mono text-white/90 group-hover:text-white truncate transition-colors text-left">
            {listingUrl}
          </code>
          <span
            className="shrink-0 ml-3 text-white/70 group-hover:text-white transition-colors"
            aria-live="polite"
          >
            {status === "copied" ? (
              <CheckIcon />
            ) : status === "failed" ? (
              <span className="font-sans text-sm">Failed</span>
            ) : (
              <CopyIcon />
            )}
          </span>
        </button>

        <div className="w-full sm:w-auto shrink-0 flex h-12 sm:h-full rounded-[9px] overflow-hidden bg-[var(--color-electric)]">
          <a
            href={addUrl}
            className="flex-1 flex items-center justify-center gap-2 pl-6 pr-4 hover:bg-[var(--color-hot-hover)] text-[var(--color-void)] font-bold text-base transition-colors no-underline"
          >
            <PlusIcon /> Add Repo to VCC
          </a>
          <button
            type="button"
            onClick={() => setShowSteps((open) => !open)}
            aria-expanded={showSteps}
            aria-controls="vcc-manual-steps"
            aria-label="Button not working? Show manual steps"
            title="Button not working? Add it manually"
            className="shrink-0 w-12 border-0 bg-black/10 hover:bg-[var(--color-hot-hover)] text-[var(--color-void)] font-bold text-base transition-colors cursor-pointer"
          >
            ?
          </button>
        </div>
      </motion.div>

      {/* --- Manual steps, for visitors without the vcc:// handler --- */}
      {showSteps && (
        <div id="vcc-manual-steps" className="mt-6 w-full max-w-2xl text-base text-white/80">
          <ol className="mt-0 mb-0 pl-5 space-y-2 list-decimal">
            <li>Open <strong className="text-white">VCC</strong> and go to <strong className="text-white">Settings</strong>.</li>
            <li>Click the <strong className="text-white">Packages</strong> tab, then <strong className="text-white">Add Repository</strong>.</li>
            <li>Paste the listing URL above and click <strong className="text-white">Add</strong>.</li>
            <li>Check the info and click <strong className="text-white">I Understand</strong>.</li>
            <li>Open any project to see the packages.</li>
          </ol>
          <p className="font-sans text-sm text-white/60 mt-3 mb-0">
            More info at{" "}
            <a
              href="https://vcc.docs.vrchat.com"
              target="_blank"
              rel="noopener"
              className="text-[var(--color-glow)] hover:underline"
            >
              vcc.docs.vrchat.com
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
