import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { products, site, type Product } from '../content/site';
import { ArrowLink } from '../components/ui/ArrowLink';
import { GlowCard } from '../components/ui/GlowCard';
import { StatusPill } from '../components/ui/StatusPill';
import { ToneContext } from '../theme/tone';
import { color, font } from '../theme/tokens';
import { LanguageCycler } from './LanguageCycler';
import { SiteVision } from './SiteVision';

interface ProductPlateProps {
  productKey: Product['key'];
  detailed?: boolean;
}

/** A product as a glowing glass card: aqua for BizWhats, coral for ACIP. */
export function ProductPlate({ productKey, detailed = false }: ProductPlateProps) {
  const p = products[productKey];
  const isAcip = productKey === 'acip';
  const accent = isAcip ? color.orange : color.teal;
  const features = detailed ? p.features : p.features.slice(0, 4);

  return (
    <ToneContext value={isAcip ? 'night' : 'paper'}>
      <GlowCard accent={isAcip ? 'coral' : 'aqua'} bg={isAcip ? color.night2 : color.card} radius={24} component="article" labelledBy={`plate-${p.key}`}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: { xs: 3, md: 4 }, pb: { xs: 1, md: 1 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
            <Box>
              <Typography variant="mono" component="p" sx={{ color: accent }}>
                {p.category}
              </Typography>
              <Typography id={`plate-${p.key}`} variant="h3" component="h3" sx={{ mt: 1, fontSize: 'clamp(2rem, 1.4rem + 1.6vw, 2.8rem)', letterSpacing: '-0.035em' }}>
                {p.name}
              </Typography>
            </Box>
            <StatusPill status={p.status} />
          </Box>

          <Box sx={{ px: { xs: 3, md: 4 }, py: 2, minHeight: 230, display: 'flex', alignItems: 'center' }}>
            {isAcip ? (
              <Box sx={{ width: '100%' }}>
                <SiteVision />
              </Box>
            ) : (
              <Box sx={{ width: '100%' }}>
                <LanguageCycler size="sm" />
              </Box>
            )}
          </Box>

          <Box sx={{ px: { xs: 3, md: 4 }, pb: 3, flex: 1 }}>
            <Typography sx={{ color: color.ink, fontSize: '1.1rem', fontWeight: 500 }}>{p.summary}</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2.5, display: 'grid', gap: 1.25 }}>
              {features.map((f) => (
                <Box component="li" key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: color.ink2, fontSize: '0.98rem' }}>
                  <Box component="span" aria-hidden="true" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent, boxShadow: `0 0 10px ${accent}`, flexShrink: 0 }} />
                  {f}
                </Box>
              ))}
            </Box>
            {detailed && (
              <Box sx={{ mt: 3, fontFamily: font.mono, fontSize: '0.72rem', lineHeight: 1.7, color: color.ink3 }}>{p.stack.join(' · ')}</Box>
            )}
          </Box>

          <Box sx={{ px: { xs: 3, md: 4 }, pb: { xs: 3, md: 4 }, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <ArrowLink to={p.to}>{isAcip ? 'Explore ACIP' : 'Explore BizWhats'}</ArrowLink>
            {!isAcip && (
              <ArrowLink href={site.bizwhatsUrl} external>
                {site.bizwhatsLabel}
              </ArrowLink>
            )}
          </Box>
        </Box>
      </GlowCard>
    </ToneContext>
  );
}
