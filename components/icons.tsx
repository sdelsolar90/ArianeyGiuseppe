import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 22, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    ...rest,
  };
}

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MailIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="2" {...STROKE} />
      <path d="M3.5 6.5l8.5 7 8.5-7" {...STROKE} />
    </svg>
  );
}

export function PinIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" {...STROKE} />
      <circle cx="12" cy="9" r="2.5" {...STROKE} />
    </svg>
  );
}

export function CalendarIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" {...STROKE} />
      <path d="M3.5 10h17M8 3v4M16 3v4" {...STROKE} />
    </svg>
  );
}

export function BusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path
        d="M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M4 16h16M4 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m10 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M5 9h14M8 13h.01M16 13h.01"
        {...STROKE}
      />
    </svg>
  );
}

export function CarIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path
        d="M5 17V11l2-5h10l2 5v6M5 17h14M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M4 11h16"
        {...STROKE}
      />
      <circle cx="8" cy="14" r="1" {...STROKE} />
      <circle cx="16" cy="14" r="1" {...STROKE} />
    </svg>
  );
}

export function TaxiIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path
        d="M5 17V11l2-5h10l2 5v6M5 17h14M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M4 11h16M10 5V3h4v2"
        {...STROKE}
      />
      <circle cx="8" cy="14" r="1" {...STROKE} />
      <circle cx="16" cy="14" r="1" {...STROKE} />
    </svg>
  );
}

export function MetroIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="3" width="14" height="14" rx="3" {...STROKE} />
      <path d="M5 13h14M9 21l1.5-3M15 21l-1.5-3M9 21h6" {...STROKE} />
      <circle cx="9" cy="9" r="0.8" {...STROKE} />
      <circle cx="15" cy="9" r="0.8" {...STROKE} />
    </svg>
  );
}

export function RingIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="15" r="6" {...STROKE} />
      <path d="M9 7l3-4 3 4M9 7h6M9 7l3 2 3-2" {...STROKE} />
    </svg>
  );
}

export function MicIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="9" y="2" width="6" height="11" rx="3" {...STROKE} />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"
        {...STROKE}
      />
    </svg>
  );
}

export function GlassIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 3h10l-1 8a4 4 0 1 1-8 0L7 3zM12 15v6M9 21h6" {...STROKE} />
    </svg>
  );
}

export function DiscIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" {...STROKE} />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="12" cy="12" r="3" {...STROKE} />
      <circle cx="12" cy="12" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function MusicNoteIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9 17V4l11-2v13" {...STROKE} />
      <circle cx="6" cy="17" r="3" {...STROKE} />
      <circle cx="17" cy="15" r="3" {...STROKE} />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6L6 18" {...STROKE} />
    </svg>
  );
}

export function GiftIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 8h18v4H3z" {...STROKE} />
      <path d="M5 12v9h14v-9" {...STROKE} />
      <path d="M12 8v13" {...STROKE} />
      <path
        d="M12 8c-1.5 0-3.5-0.5-3.5-2.5S10 3 12 6c2-3 3.5-1.5 3.5 0S13.5 8 12 8z"
        {...STROKE}
      />
    </svg>
  );
}

export function PhoneIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path
        d="M5 4a2 2 0 0 1 2-2h2l2 5-2.5 1.5a11 11 0 0 0 5 5L15 11l5 2v2a2 2 0 0 1-2 2A17 17 0 0 1 5 4z"
        {...STROKE}
      />
    </svg>
  );
}

export function CopyIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="9" y="9" width="11" height="11" rx="2" {...STROKE} />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" {...STROKE} />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M5 12l5 5L20 7" {...STROKE} />
    </svg>
  );
}

export function AppleIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      {...rest}
    >
      <path
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35-5.88-5.03-5.16-12.69.38-12.97 1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GooglePlayIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      {...rest}
    >
      <path
        d="M3.5 2.5l11.6 9.5L3.5 21.5c-.3-.2-.5-.5-.5-.9V3.4c0-.4.2-.7.5-.9z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M15.1 12L18.7 8.4l2.2 1.4c.5.3.5 1 0 1.3l-2.2 1.4L15.1 12z" fill="currentColor" />
      <path d="M3.5 2.5l11.6 9.5L18.7 8.4 4.4 2.1c-.3-.1-.6-.1-.9.4z" fill="currentColor" opacity="0.7" />
      <path d="M3.5 21.5l11.6-9.5 3.6 3.6-14.3 6.3c-.3.1-.6.1-.9-.4z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function StarIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l2.4 5.4 5.6.6-4.2 4 1.2 5.8L12 16l-5 2.8L8.2 13 4 9l5.6-.6L12 3z" {...STROKE} />
    </svg>
  );
}
