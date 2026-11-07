import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { products, site, type Product } from '../content/site';
import { ArrowLink } from '../components/ui/ArrowLink';
import { StatusPill } from '../components/ui/StatusPill';
import { ToneContext, toneColors, type Tone } from '../theme/tone';
import { font } from '../theme/tokens';
import { LanguageCycler } from './LanguageCycler';
import { SiteVision } from './SiteVision';

interface ProductPlateProps {
  productKey: Product['key'];
  detailed?: boolean;
}

/** A product as a plate: BizWhats on warm paper, ACIP on night. */
export function ProductPlate({ productKey, detailed = false }: ProductPlateProps) {
  const p = products[productKey];
  const tone: Tone = productKey === 'acip' ? 'night' : 'paper';
  const c = toneColors(tone);
  const plateBg = productKey === 'acip' ? c.bg : c.surface;
  const features = detailed ? p.features : p.features.slice(0, 4);

  return (
    <ToneContext value={tone}>
      <Box
        component="article"
        aria-labelledby={`plate-${p.key}`}
        sx={{ bgcolor: plateBg, color: c.fg, border: `1px solid ${c.lineStrong}`, display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box>
            <Typography variant="mono" component="p" sx={{ color: c.fg3 }}>
              {p.category}
            </Typography>
            <Typography
              id={`plate-${p.key}`}
              variant="h3"
              component="h3"
              sx={{ mt: 1, fontSize: 'clamp(2rem, 1.4rem + 1.6vw, 2.7rem)', letterSpacing: '-0.03em' }}
            >
              {p.name}
            </Typography>
          </Box>
          <StatusPill status={p.status} />
        </Box>

        <Box sx={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, px: { xs: 3, md: 4 }, py: 3, minHeight: 230, display: 'flex', alignItems: 'center' }}>
          {productKey === 'acip' ? (
            <Box sx={{ width: '100%' }}>
              <SiteVision />
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Typography variant="mono" component="p" sx={{ color: c.fg3, mb: 1 }}>
                Reach · in the customer's own language
              </Typography>
              <LanguageCycler size="sm" />
            </Box>
          )}
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
          <Typography sx={{ color: c.fg2 }}>{p.summary}</Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3 }}>
            {features.map((f, i) => (
              <Box
                component="li"
                key={f}
                sx={{ display: 'grid', gridTemplateColumns: '3ch minmax(0, 1fr)', gap: 1.5, py: 1.25, borderTop: `1px solid ${c.line}`, fontSize: '0.95rem' }}
              >
                <Box component="span" sx={{ fontFamily: font.mono, fontSize: '0.7rem', color: c.fg3, pt: '3px' }}>
                  {String(i + 1).padStart(2, '0')}
                </Box>
                {f}
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 3, fontFamily: font.mono, fontSize: '0.72rem', lineHeight: 1.7, color: c.fg3 }}>
            STACK — {p.stack.join(' / ')}
          </Box>
        </Box>

        <Box sx={{ px: { xs: 3, md: 4 }, pb: { xs: 3, md: 4 }, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <ArrowLink to={p.to}>{productKey === 'acip' ? 'Explore ACIP' : 'Explore BizWhats'}</ArrowLink>
          {productKey === 'bizwhats' && (
            <ArrowLink href={site.bizwhatsUrl} external>
              bizwhats.in
            </ArrowLink>
          )}
        </Box>
      </Box>
    </ToneContext>
  );
}
