import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { WorkItem } from '../content/work';
import { useToneColors } from '../theme/tone';
import { font } from '../theme/tokens';
import { ArrowLink } from './ui/ArrowLink';

/** A delivered client project, shown in a browser frame. */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const c = useToneColors();
  return (
    <Box
      component="article"
      aria-labelledby={`work-${index}`}
      sx={{
        border: `1px solid ${c.line}`,
        bgcolor: c.surface,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
      }}
    >
      <Box
        component="a"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        sx={{
          display: 'block',
          p: { xs: 2, md: 3 },
          borderRight: { md: `1px solid ${c.line}` },
          borderBottom: { xs: `1px solid ${c.line}`, md: 0 },
          '&:hover .shot': { transform: 'translateY(-4px)' },
        }}
      >
        <Box
          className="shot"
          sx={{
            border: `1px solid ${c.lineStrong}`,
            bgcolor: c.bg,
            boxShadow: '0 30px 60px -42px rgba(17,20,24,0.55)',
            transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 1, borderBottom: `1px solid ${c.line}` }}>
            {[0, 1, 2].map((i) => (
              <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c.lineStrong }} />
            ))}
            <Box
              sx={{
                ml: 1,
                flex: 1,
                fontFamily: font.mono,
                fontSize: '0.68rem',
                color: c.fg3,
                bgcolor: c.surface,
                border: `1px solid ${c.line}`,
                px: 1,
                py: 0.25,
              }}
            >
              {item.domain}
            </Box>
          </Box>
          {item.image ? (
            <Box
              component="img"
              src={item.image}
              alt=""
              loading="lazy"
              sx={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: '16 / 10',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                p: 3,
                backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            >
              <Box>
                <Typography variant="mono" component="p" sx={{ color: c.fg3 }}>
                  {item.kind}
                </Typography>
                <Box sx={{ mt: 1, fontSize: 'clamp(1.7rem, 1rem + 2.2vw, 2.8rem)', fontWeight: 560, fontStretch: '110%', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                  {item.client}
                </Box>
                <Typography variant="mono" component="p" sx={{ mt: 1.5, color: c.fg3 }}>
                  {item.sector}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="mono" component="p" sx={{ color: c.teal }}>
          Case {String(index + 1).padStart(2, '0')} · {item.kind}
        </Typography>
        <Typography id={`work-${index}`} variant="h3" component="h3">
          {item.client}
        </Typography>
        <Typography variant="mono" component="p" sx={{ color: c.fg3, mt: -0.5 }}>
          {item.sector}
        </Typography>
        <Typography sx={{ color: c.fg2 }}>{item.summary}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {item.scope.map((s) => (
            <Box
              key={s}
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: `1px solid ${c.line}`,
                px: 1,
                py: 0.4,
                color: c.fg2,
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 'auto', pt: 1 }}>
          <ArrowLink href={item.url} external>
            Visit {item.domain}
          </ArrowLink>
        </Box>
      </Box>
    </Box>
  );
}
