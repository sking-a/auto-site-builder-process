type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      role="img"
      aria-label="Football Live Guide logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-field" x1="7" y1="5" x2="35" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3D0" />
          <stop offset="0.48" stopColor="#34D399" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#10B981" floodOpacity="0.22" />
        </filter>
      </defs>
      <circle cx="21" cy="21" r="19" fill="#06140F" stroke="#A7F3D0" strokeOpacity="0.45" strokeWidth="1.5" />
      <path
        d="M21 6.5C28.9 6.5 35.5 12.8 35.5 20.9C35.5 29.1 28.9 35.5 21 35.5C13.1 35.5 6.5 29.1 6.5 20.9C6.5 12.8 13.1 6.5 21 6.5Z"
        fill="url(#logo-field)"
        opacity="0.16"
      />
      <path
        d="M10.7 26.9C14.3 24.5 18.2 23.3 22.3 23.3C25.8 23.3 28.8 24.1 31.5 25.8"
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M12.3 14.1C15.2 16.1 18.2 17.1 21.1 17.1C24.2 17.1 27.1 16.1 30 14.1"
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.58"
      />
      <path
        d="M20.9 10.4V31.6"
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M16.2 16.3L21 13.4L25.8 16.3V21.8L21 24.8L16.2 21.8V16.3Z"
        fill="#07140F"
        stroke="#F8FAFC"
        strokeWidth="1.5"
        filter="url(#logo-glow)"
      />
      <path d="M20 17.1L24.2 19.6L20 22.1V17.1Z" fill="#A7F3D0" />
      <path
        d="M13.4 29.4L16.2 26.7M28.6 29.4L25.8 26.7M13.1 12.6L16.2 16.3M28.9 12.6L25.8 16.3"
        stroke="#F8FAFC"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.68"
      />
    </svg>
  );
}
