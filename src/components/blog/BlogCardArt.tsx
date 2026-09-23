/** Flat illustration accents — cycle by index; colors tuned per card tone. */
type BlogCardArtProps = {
  variant: number;
  className?: string;
};

export default function BlogCardArt({ variant, className = "" }: BlogCardArtProps) {
  const v = variant % 6;

  return (
    <div
      className={`pointer-events-none flex h-[7.5rem] items-end justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {v === 0 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <rect x="24" y="28" width="100" height="72" rx="10" fill="white" opacity="0.9" />
          <rect x="36" y="40" width="76" height="10" rx="2" fill="#1A7A74" opacity="0.35" />
          <rect x="36" y="56" width="52" height="8" rx="2" fill="#4E3C51" opacity="0.2" />
          <rect x="36" y="70" width="64" height="8" rx="2" fill="#4E3C51" opacity="0.15" />
          <path
            d="M142 44h36v52c0 6-4 10-10 10h-16c-6 0-10-4-10-10V44z"
            fill="#1A7A74"
            opacity="0.45"
          />
          <path d="M148 38h24v12l-12 8-12-8V38z" fill="#E3C16F" />
          <circle cx="160" cy="78" r="6" fill="white" opacity="0.85" />
        </svg>
      )}
      {v === 1 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <rect x="32" y="36" width="96" height="64" rx="12" fill="white" opacity="0.95" />
          <rect x="44" y="48" width="72" height="40" rx="6" fill="#162B4D" opacity="0.06" />
          <path
            d="M52 60h16v16H52zM76 56h40v8H76zM76 70h28v6H76z"
            fill="#4E3C51"
            opacity="0.35"
          />
          <circle cx="148" cy="52" r="26" fill="#1A7A74" opacity="0.25" />
          <circle cx="148" cy="52" r="14" fill="none" stroke="#1A7A74" strokeWidth="4" opacity="0.7" />
        </svg>
      )}
      {v === 2 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <rect x="40" y="32" width="120" height="72" rx="14" fill="white" opacity="0.92" />
          <path
            d="M56 52h88v40H56z"
            fill="#162B4D"
            opacity="0.04"
          />
          <path
            fill="none"
            stroke="#1A7A74"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
            d="M70 58 L58 72 L70 86 M130 58 L142 72 L130 86"
          />
          <path
            fill="#1A7A74"
            opacity="0.4"
            d="M88 68h26v8H88z"
          />
          <rect x="52" y="44" width="28" height="8" rx="2" fill="#4E3C51" opacity="0.25" />
        </svg>
      )}
      {v === 3 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <path
            d="M48 78c12-24 36-36 52-36s40 12 52 36c-12 10-32 18-52 18S60 88 48 78z"
            fill="#1A7A74"
            opacity="0.2"
          />
          <path
            d="M76 44h48l8 22-32 18-32-18 8-22z"
            fill="white"
            stroke="#4E3C51"
            strokeWidth="2"
            strokeOpacity="0.2"
          />
          <circle cx="100" cy="52" r="10" fill="#4E3C51" opacity="0.35" />
        </svg>
      )}
      {v === 4 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <path
            d="M44 38 L100 30 L156 38 L150 88 L100 96 L50 88 Z"
            fill="white"
            stroke="#162B4D"
            strokeWidth="2"
            strokeOpacity="0.12"
          />
          <path
            d="M62 52 L92 48 L118 62 L100 78 L72 72 Z"
            fill="#E3C16F"
            opacity="0.5"
          />
          <circle cx="132" cy="56" r="6" fill="#1A7A74" opacity="0.45" />
          <circle cx="146" cy="68" r="5" fill="#4E3C51" opacity="0.35" />
        </svg>
      )}
      {v === 5 && (
        <svg viewBox="0 0 200 120" className="h-full w-full max-w-[11rem]">
          <rect x="50" y="40" width="100" height="56" rx="8" fill="white" opacity="0.9" />
          <path
            d="M62 54h76M62 66h52M62 78h64"
            stroke="#4E3C51"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.2"
          />
          <rect x="64" y="52" width="10" height="10" rx="2" fill="#1A7A74" opacity="0.4" />
          <rect x="64" y="64" width="10" height="10" rx="2" fill="#1A7A74" opacity="0.28" />
          <rect x="64" y="76" width="10" height="10" rx="2" fill="#1A7A74" opacity="0.35" />
        </svg>
      )}
    </div>
  );
}
