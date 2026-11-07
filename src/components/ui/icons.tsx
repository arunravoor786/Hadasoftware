import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  };
}

export const ArrowRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);

export const ArrowUpRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const ArrowUp = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 19.5V5M6.5 10.5 12 5l5.5 5.5" />
  </svg>
);

export const CopyIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="1.5" />
    <path d="M15.5 8.5V5.5A1.5 1.5 0 0 0 14 4H5.5A1.5 1.5 0 0 0 4 5.5V14a1.5 1.5 0 0 0 1.5 1.5h3" />
  </svg>
);

export const CheckIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const MailIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.8 6.5 8.2 6.3 8.2-6.3" />
  </svg>
);

export const MenuIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 8.5h17M3.5 15.5h17" />
  </svg>
);

export const CloseIcon = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const AlertIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5 2.8 19.5h18.4L12 3.5Z" />
    <path d="M12 10v4.2M12 16.9v.2" />
  </svg>
);

export const ReplayIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5V9H9" />
  </svg>
);
