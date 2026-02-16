import { Link } from "react-router-dom";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        {/* Back nav */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <span>&larr;</span>
          Back to Home
        </Link>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight md:text-4xl">
          Image Credits &amp; Attributions
        </h1>

        <p className="mt-6 text-base leading-relaxed text-white/60">
          Some images used on this website are sourced from{" "}
          <a
            href="https://www.freepik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
          >
            Freepik
          </a>{" "}
          under their free license. Attribution is provided below as required by their terms of use.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Freepik Attribution
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Various images and illustrations used throughout this website were designed by{" "}
            <a
              href="https://www.freepik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
            >
              Freepik
            </a>
            . These include images in the following sections:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>How We Work &mdash; Technology platform images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>Domains We Work Across &mdash; Industry domain images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>Our Working Approach &mdash; Process step images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>Why Work With Us &mdash; Capability images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>Core Capabilities &mdash; Service area images</span>
            </li>
          </ul>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <p className="text-sm text-white/70">
              Images designed by{" "}
              <a
                href="https://www.freepik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
              >
                Freepik
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-white/40">
          All other logos, icons, and brand assets are proprietary to Gateway Analytics AI.
          If you have questions about image usage or attribution, please contact us.
        </p>
      </div>
    </div>
  );
}
