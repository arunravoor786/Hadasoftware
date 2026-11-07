import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { WorkItem } from '../content/work';
import { color, font } from '../theme/tokens';
import { ArrowLink } from './ui/ArrowLink';
import { GlowCard } from './ui/GlowCard';

/** A delivered client project, framed like a browser window inside a glowing card. */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <GlowCard accent="violet" bg={color.card} radius={24} component="article" labelledBy={`work-${index}`}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' }, alignItems: 'center' }}>
        <Box
          component="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          sx={{ display: 'block', p: { xs: 2, md: 3.5 }, '&:hover .shot': { transform: 'translateY(-4px) scale(1.01)' } }}
        >
          <Box
            className="shot"
            sx={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: `1px solid ${color.lineStrong}`,
              bgcolor: color.night,
              boxShadow: '0 40px 80px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03)',
              transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 1, borderBottom: `1px solid ${color.line}` }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((dot) => (
                <Box key={dot} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: dot, opacity: 0.85 }} />
              ))}
              <Box sx={{ ml: 1, flex: 1, fontFamily: font.mono, fontSize: '0.68rem', color: color.ink3, bgcolor: color.paperAlt, borderRadius: '6px', px: 1, py: 0.35 }}>
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
              <Box sx={{ aspectRatio: '16 / 10', display: 'grid', placeItems: 'center', p: 3, textAlign: 'center' }}>
                <Box sx={{ fontSize: 'clamp(1.7rem, 1rem + 2.2vw, 2.8rem)', fontWeight: 600, fontStretch: '110%', letterSpacing: '-0.03em' }}>{item.client}</Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 }, pt: { xs: 1, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="mono" component="p" sx={{ color: color.violet }}>
            {item.kind}
          </Typography>
          <Typography id={`work-${index}`} variant="h3" component="h3">
            {item.client}
          </Typography>
          <Typography sx={{ color: color.ink2 }}>{item.summary}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {item.scope.map((s) => (
              <Box
                key={s}
                component="span"
                sx={{ fontFamily: font.mono, fontSize: '0.68rem', letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '999px', border: `1px solid ${color.lineStrong}`, px: 1.25, py: 0.5, color: color.ink2 }}
              >
                {s}
              </Box>
            ))}
          </Box>
          <Box sx={{ pt: 1 }}>
            <ArrowLink href={item.url} external>
              Visit {item.domain}
            </ArrowLink>
          </Box>
        </Box>
      </Box>
    </GlowCard>
  );
}
