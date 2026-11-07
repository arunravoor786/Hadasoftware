import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { ArrowRight, ArrowUpRight } from './icons';

interface ArrowLinkProps {
  children: ReactNode;
  /** Internal route. */
  to?: string;
  /** External or mailto link. */
  href?: string;
  external?: boolean;
  sx?: SxProps<Theme>;
}

const style = (external: boolean) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 580,
  textDecoration: 'none',
  color: 'inherit',
  pb: '4px',
  backgroundImage: 'linear-gradient(currentColor, currentColor)',
  backgroundSize: '100% 1px',
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat',
  '& svg': { transition: 'transform .3s cubic-bezier(.22,1,.36,1)' },
  '&:hover svg': { transform: external ? 'translate(2px,-2px)' : 'translateX(4px)' },
});

/** Text link with an arrow that leans in the direction of travel on hover. */
export function ArrowLink({ children, to, href, external = false, sx }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const sxList = [style(external), ...(Array.isArray(sx) ? sx : [sx])];
  if (to) {
    return (
      <Box component={RouterLink} to={to} sx={sxList}>
        {children}
        <Icon size={16} />
      </Box>
    );
  }
  return (
    <Box
      component="a"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      sx={sxList}
    >
      {children}
      <Icon size={16} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Box>
  );
}
