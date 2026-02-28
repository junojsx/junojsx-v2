import { useState } from "react";
import { Pause, Play } from "lucide-react";

export default function Home() {
  // Respect prefers-reduced-motion — start paused if the user prefers it
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <section
      id="home"
      aria-labelledby="about-heading"
      className="min-h-screen flex items-center bg-[#E2DAF0]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        {/* Text content */}
        <div>
          {/* Decorative greeting badge — hidden from AT since heading already greets */}
          <div
            className="inline-flex items-center gap-2 border border-dark-gray/25 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-dark-gray mb-8 bg-white/40"
            aria-hidden="true"
          >
            <span className="w-2 h-2 rounded-full bg-soft-teal" />
            Hello!
          </div>

          <h1
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-gray leading-tight mb-2"
          >
            I'm <span className="text-deep-purple">Juno,</span>
            <br />
            a software
            <br />
            <span className="relative inline-block">
              accessibility engineer.
              {/* Decorative underline — purely visual */}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-3/4 rounded-full bg-warm-gold"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="text-dark-gray/80 text-base leading-relaxed mt-8 mb-8 max-w-sm">
            I build inclusive digital experiences that work for everyone. I'm
            passionate about bridging great design and equitable access.
          </p>

          <a
            href="#projects"
            className="inline-block border-2 border-dark-gray text-dark-gray px-6 py-3
                       rounded-lg font-medium hover:bg-dark-gray hover:text-white transition-colors"
          >
            See My Work
          </a>
          <p className="sr-only">Available for freelance work</p>
        </div>

        {/* Photo + decorations — hidden below sm to prevent reflow issues */}
        <div className="hidden sm:flex relative justify-center items-end h-80 sm:h-[30rem]" aria-hidden="true">
          {/* Arch-shaped photo frame — larger than before */}
          <div
            className="relative w-56 h-72 sm:w-100 sm:h-120 bg-deep-purple overflow-hidden"
            style={{ borderRadius: "9999px 9999px 0 0" }}
            aria-hidden="true"
          >
            <img
              src="justin.png"
              alt=""
              className="w-full h-full object-cover object-top"
              width={288}
              height={384}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background =
                    "linear-gradient(to bottom, #4E3C51 0%, #B6A5D0 100%)";
                }
              }}
            />
          </div>

          {/* Availability badge — spinning ring with pause/play control */}
          <div className="absolute top-0 right-2 sm:right-4">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <svg
                viewBox="0 0 110 110"
                className="w-full h-full animate-spin"
                style={{
                  animationDuration: "12s",
                  animationPlayState: paused ? "paused" : "running",
                }}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <path
                    id="badge-circle"
                    d="M55,55 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                  />
                </defs>
                <circle
                  cx="55"
                  cy="55"
                  r="54"
                  fill="white"
                  stroke="#4E3C51"
                  strokeWidth="1.5"
                />
                <text
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#4E3C51"
                  letterSpacing="2.2"
                >
                  <textPath href="#badge-circle">
                    I'M AVAILABLE • FOR FREELANCE WORK •
                  </textPath>
                </text>
              </svg>
              {/* Arrow in center */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="#4E3C51"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            {/* Pause / Play button — below the badge */}
            <div className="flex justify-center mt-1.5">
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-label={
                  paused
                    ? "Play spinning badge animation"
                    : "Pause spinning badge animation"
                }
                className="w-7 h-7 rounded-full bg-white border border-deep-purple/40
                           flex items-center justify-center shadow-sm
                           hover:bg-deep-purple hover:text-white hover:border-deep-purple
                           transition-colors"
              >
                {paused ? (
                  <Play
                    className="w-3 h-3 text-deep-purple group-hover:text-white"
                    aria-hidden="true"
                  />
                ) : (
                  <Pause
                    className="w-3 h-3 text-deep-purple group-hover:text-white"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Decorative sparkles */}
          <span
            className="absolute top-6 right-2 text-xl text-deep-purple/40 select-none leading-none"
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="absolute top-12 right-0 text-sm text-deep-purple/25 select-none leading-none"
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="absolute top-2 left-4 text-sm text-deep-purple/25 select-none leading-none"
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="absolute bottom-10 right-0 text-2xl text-deep-purple/30 select-none leading-none"
            aria-hidden="true"
          >
            ≋
          </span>
        </div>
      </div>
    </section>
  );
}
