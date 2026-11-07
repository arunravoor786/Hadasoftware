import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { site } from '../../content/site';
import { mailto } from '../../lib/mailto';
import { useToneColors } from '../../theme/tone';
import { CheckIcon, CopyIcon } from './icons';

interface EmailBlockProps {
  email?: string;
  subject?: string;
  body?: string;
  size?: 'lg' | 'md';
}

/** The site's only call to action: an email address you can click or copy. */
export function EmailBlock({ email = site.email, subject, body, size = 'lg' }: EmailBlockProps) {
  const c = useToneColors();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (http, iframe, permissions); the mailto link still works.
    }
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 3 } }}>
      <Box
        component="a"
        href={mailto({ to: email, subject, body })}
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          fontSize: size === 'lg' ? 'clamp(1.55rem, 0.9rem + 3vw, 3.3rem)' : 'clamp(1.25rem, 1rem + 0.9vw, 1.6rem)',
          fontWeight: 520,
          fontStretch: '108%',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          overflowWrap: 'anywhere',
          backgroundImage: `linear-gradient(${c.fg}, ${c.fg})`,
          backgroundSize: '0% 2px',
          backgroundPosition: '0 100%',
          backgroundRepeat: 'no-repeat',
          pb: '6px',
          transition: 'background-size .45s cubic-bezier(.22,1,.36,1)',
          '&:hover, &:focus-visible': { backgroundSize: '100% 2px' },
        }}
      >
        {email}
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={copy}
        startIcon={copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        aria-live="polite"
        sx={{ flexShrink: 0, color: c.fg2 }}
      >
        {copied ? 'Copied' : 'Copy address'}
      </Button>
    </Stack>
  );
}
