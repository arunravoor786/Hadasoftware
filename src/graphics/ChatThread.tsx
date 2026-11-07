import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useToneColors } from '../theme/tone';
import { color, ease, font } from '../theme/tokens';

type MsgKind = 'out' | 'in' | 'event';

interface Msg {
  kind: MsgKind;
  text: string;
}

interface Thread {
  code: string;
  native: string;
  sector: string;
  city: string;
  who: string;
  msgs: [Msg, Msg, Msg];
}

/* Illustrative conversations, one per supported language. No real customers. */
const THREADS: Thread[] = [
  {
    code: 'MR',
    native: 'मराठी',
    sector: 'Salon',
    city: 'Pune',
    who: 'Priya',
    msgs: [
      { kind: 'out', text: 'नमस्कार प्रिया! तुमच्या पुढच्या भेटीची वेळ झाली आहे. शनिवारी सकाळी ११ वाजता चालेल का?' },
      { kind: 'in', text: 'हो, चालेल. धन्यवाद!' },
      { kind: 'event', text: 'Booked · Sat 11:00 · reminder scheduled' },
    ],
  },
  {
    code: 'HI',
    native: 'हिन्दी',
    sector: 'Gym',
    city: 'Nagpur',
    who: 'Rahul',
    msgs: [
      { kind: 'out', text: 'नमस्ते राहुल जी! आपकी मेंबरशिप अगले हफ़्ते ख़त्म हो रही है। क्या हम इसे तीन महीने के लिए रिन्यू कर दें?' },
      { kind: 'in', text: 'हाँ, कर दीजिए।' },
      { kind: 'event', text: 'Renewal link sent · payment via Razorpay' },
    ],
  },
  {
    code: 'TA',
    native: 'தமிழ்',
    sector: 'Clinic',
    city: 'Chennai',
    who: 'Meena',
    msgs: [
      { kind: 'out', text: 'வணக்கம் மீனா! உங்கள் அடுத்த பரிசோதனை வெள்ளிக்கிழமை. நேரத்தை உறுதி செய்யலாமா?' },
      { kind: 'in', text: 'சரி, உறுதி செய்யுங்கள்.' },
      { kind: 'event', text: 'Appointment confirmed · Fri 17:30' },
    ],
  },
  {
    code: 'TE',
    native: 'తెలుగు',
    sector: 'Coaching',
    city: 'Hyderabad',
    who: 'Kiran',
    msgs: [
      { kind: 'out', text: 'నమస్కారం కిరణ్! కొత్త బ్యాచ్ సోమవారం ప్రారంభమవుతుంది. మీ సీటు రిజర్వ్ చేయమంటారా?' },
      { kind: 'in', text: 'అవును, చేయండి.' },
      { kind: 'event', text: 'Seat reserved · trial week started' },
    ],
  },
  {
    code: 'EN',
    native: 'English',
    sector: 'Boutique',
    city: 'Jaipur',
    who: 'Ananya',
    msgs: [
      { kind: 'out', text: 'Hi Ananya! The festive collection you asked about is in. Shall we hold your size until Sunday?' },
      { kind: 'in', text: 'Yes please, size M.' },
      { kind: 'event', text: 'Hold placed · follow-up Sun 10:00' },
    ],
  },
];

const LANG_ATTR: Record<string, string> = { MR: 'mr', HI: 'hi', TA: 'ta', TE: 'te', EN: 'en' };

function TypingDots({ tint }: { tint: string }) {
  return (
    <Box sx={{ display: 'inline-flex', gap: '4px', px: 1.5, py: 1.25 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: tint, display: 'block' }}
        />
      ))}
    </Box>
  );
}

/** BizWhats hero: a retention conversation that cycles through all five languages. */
export function ChatThread() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const c = useToneColors();
  const [ti, setTi] = useState(0);
  const [shown, setShown] = useState(3);
  const [typing, setTyping] = useState<MsgKind | null>(null);
  const thread = THREADS[ti];

  useEffect(() => {
    if (!inView || reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    at(0, () => {
      setShown(0);
      setTyping('out');
    });
    at(1000, () => {
      setTyping(null);
      setShown(1);
    });
    at(2200, () => setTyping('in'));
    at(3100, () => {
      setTyping(null);
      setShown(2);
    });
    at(3900, () => setShown(3));
    at(7600, () => {
      setShown(0);
      setTi((i) => (i + 1) % THREADS.length);
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [ti, inView, reduce]);

  return (
    <Box
      ref={ref}
      role="img"
      aria-label="Example BizWhats conversations: a business reminds a customer about their next visit in Marathi, Hindi, Tamil, Telugu and English, and the booking is confirmed automatically."
      sx={{
        border: `1px solid ${c.lineStrong}`,
        bgcolor: color.card,
        color: color.ink,
        boxShadow: '0 40px 80px -48px rgba(17,20,24,0.45)',
        maxWidth: 520,
        mx: { xs: 0, lg: 'auto' },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.75, borderBottom: `1px solid ${color.line}` }}>
        <Box
          aria-hidden="true"
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: color.ink,
            color: color.paper,
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          {thread.sector[0]}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.2 }}>
            {thread.sector} · {thread.city}
          </Box>
          <Box sx={{ fontFamily: font.mono, fontSize: '0.68rem', color: color.ink3, mt: 0.25 }}>
            Sent by BizWhats · to {thread.who}
          </Box>
        </Box>
        <Box
          sx={{
            fontFamily: font.mono,
            fontSize: '0.68rem',
            letterSpacing: '0.06em',
            border: `1px solid ${color.lineStrong}`,
            borderRadius: '999px',
            px: 1.25,
            py: 0.4,
            whiteSpace: 'nowrap',
          }}
        >
          {thread.code} · {thread.native}
        </Box>
      </Box>

      {/* Messages */}
      <Box
        lang={LANG_ATTR[thread.code]}
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2.5,
          minHeight: { xs: 300, sm: 290 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
          backgroundImage: `radial-gradient(${color.line} 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {thread.msgs.slice(0, shown).map((m, i) => (
            <motion.div
              key={`${ti}-${i}`}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              style={{
                alignSelf: m.kind === 'out' ? 'flex-end' : m.kind === 'in' ? 'flex-start' : 'center',
                maxWidth: m.kind === 'event' ? '100%' : '86%',
              }}
            >
              {m.kind === 'event' ? (
                <Box
                  lang="en"
                  sx={{
                    fontFamily: font.mono,
                    fontSize: '0.7rem',
                    letterSpacing: '0.03em',
                    color: color.teal,
                    border: `1px dashed ${color.teal}`,
                    bgcolor: color.card,
                    px: 1.5,
                    py: 0.75,
                  }}
                >
                  ✓ {m.text}
                </Box>
              ) : (
                <Box
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    fontSize: '0.98rem',
                    lineHeight: 1.55,
                    bgcolor: m.kind === 'out' ? 'rgba(31,184,159,0.16)' : color.card,
                    border: `1px solid ${m.kind === 'out' ? 'rgba(11,122,108,0.28)' : color.line}`,
                    borderRadius: m.kind === 'out' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                  }}
                >
                  {m.text}
                </Box>
              )}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key={`typing-${ti}-${typing}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ alignSelf: typing === 'out' ? 'flex-end' : 'flex-start' }}
            >
              <Box
                sx={{
                  bgcolor: typing === 'out' ? 'rgba(31,184,159,0.16)' : color.card,
                  border: `1px solid ${color.line}`,
                  borderRadius: '14px',
                }}
              >
                <TypingDots tint={typing === 'out' ? color.teal : color.ink3} />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Thread pager */}
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2.5,
          py: 1.5,
          borderTop: `1px solid ${color.line}`,
          fontFamily: font.mono,
          fontSize: '0.66rem',
          letterSpacing: '0.06em',
          color: color.ink3,
        }}
      >
        <span>ILLUSTRATIVE THREAD</span>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {THREADS.map((t, i) => (
            <Box
              key={t.code}
              sx={{
                width: i === ti ? 18 : 6,
                height: 6,
                borderRadius: 3,
                bgcolor: i === ti ? c.teal : color.lineStrong,
                transition: 'width .4s cubic-bezier(.22,1,.36,1), background-color .4s',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
