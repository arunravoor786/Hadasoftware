import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '../content/site';
import { mailto } from '../lib/mailto';
import { useToneColors } from '../theme/tone';
import { ease, font } from '../theme/tokens';
import { CheckIcon, CopyIcon, MailIcon } from './ui/icons';

interface Topic {
  key: string;
  label: string;
  to: string;
  subject: string;
  body: string;
}

const TOPICS: Topic[] = [
  {
    key: 'project',
    label: 'A new project',
    to: site.email,
    subject: 'New project enquiry',
    body: 'Hi Hadasoft team,\n\nWhat we are trying to solve:\n\nWho handles it today, and how:\n\nTimeline:\n\nCompany and website:\n',
  },
  {
    key: 'bizwhats-demo',
    label: 'BizWhats demo',
    to: site.supportEmail,
    subject: 'BizWhats demo request',
    body: 'Hi BizWhats team,\n\nI would like a demo.\n\nBusiness type:\nCity:\nPreferred language:\n',
  },
  {
    key: 'bizwhats-support',
    label: 'BizWhats support',
    to: site.supportEmail,
    subject: 'BizWhats support',
    body: 'Hi BizWhats team,\n\nBusiness name:\nWhat happened:\n',
  },
  {
    key: 'acip',
    label: 'ACIP briefing',
    to: site.email,
    subject: 'ACIP briefing request',
    body: 'Hi Hadasoft team,\n\nI would like a briefing on ACIP.\n\nCompany:\nRole:\nProject types:\n',
  },
  {
    key: 'partner',
    label: 'Partnership',
    to: site.email,
    subject: 'Partnership enquiry',
    body: 'Hi Hadasoft team,\n\nThe opportunity (distribution, integration or joint product):\n',
  },
  {
    key: 'join',
    label: 'Joining the team',
    to: site.email,
    subject: 'Joining Hadasoft',
    body: 'Hi Hadasoft team,\n\nThe role I am interested in:\nA link to my work:\n',
  },
];

/** Email-only contact, made easy: pick a topic and the right address, subject and outline are filled in. */
export function EmailComposer() {
  const c = useToneColors();
  const [key, setKey] = useState(TOPICS[0].key);
  const [copied, setCopied] = useState(false);
  const topic = TOPICS.find((t) => t.key === key) ?? TOPICS[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(topic.to);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable; the mail link still works.
    }
  };

  return (
    <Box>
      <Typography variant="mono" component="p" sx={{ color: c.fg3 }}>
        1 — What is it about?
      </Typography>
      <Box role="group" aria-label="Topic" sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {TOPICS.map((t) => {
          const on = t.key === key;
          return (
            <Box
              key={t.key}
              component="button"
              type="button"
              aria-pressed={on}
              onClick={() => setKey(t.key)}
              sx={{
                all: 'unset',
                cursor: 'pointer',
                px: 1.75,
                py: 1,
                fontSize: '0.95rem',
                fontWeight: 520,
                border: `1px solid ${on ? c.fg : c.lineStrong}`,
                bgcolor: on ? c.fg : 'transparent',
                color: on ? c.bg : c.fg,
                borderRadius: '999px',
                transition: 'background-color .2s, color .2s, border-color .2s',
                '&:hover': { borderColor: c.fg },
                '&:focus-visible': { outline: `2px solid ${c.teal}`, outlineOffset: '2px' },
              }}
            >
              {t.label}
            </Box>
          );
        })}
      </Box>

      <Typography variant="mono" component="p" sx={{ color: c.fg3, mt: 5 }}>
        2 — Your email, ready to send
      </Typography>
      <Box sx={{ mt: 2, border: `1px solid ${c.lineStrong}`, bgcolor: c.surface }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={topic.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }}>
            {[
              ['To', topic.to],
              ['Subject', topic.subject],
            ].map(([k, v]) => (
              <Box
                key={k}
                sx={{ display: 'grid', gridTemplateColumns: '8ch minmax(0, 1fr)', gap: 2, px: 2.5, py: 1.5, borderBottom: `1px solid ${c.line}` }}
              >
                <Box sx={{ fontFamily: font.mono, fontSize: '0.75rem', color: c.fg3, pt: '2px' }}>{k}</Box>
                <Box sx={{ fontWeight: k === 'To' ? 600 : 400, overflowWrap: 'anywhere' }}>{v}</Box>
              </Box>
            ))}
            <Box sx={{ px: 2.5, py: 2, fontFamily: font.mono, fontSize: '0.8rem', lineHeight: 1.75, whiteSpace: 'pre-wrap', color: c.fg2 }}>
              {topic.body}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          href={mailto({ to: topic.to, subject: topic.subject, body: topic.body })}
          startIcon={<MailIcon size={18} />}
        >
          Open in your mail app
        </Button>
        <Button variant="outlined" size="large" onClick={copy} startIcon={copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />} aria-live="polite">
          {copied ? 'Address copied' : `Copy ${topic.to}`}
        </Button>
      </Box>
    </Box>
  );
}
