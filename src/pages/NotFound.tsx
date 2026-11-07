import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { ArrowLink } from '../components/ui/ArrowLink';
import { ArrowRight } from '../components/ui/icons';
import { Section } from '../components/ui/Section';
import { color, font } from '../theme/tokens';

export default function NotFound() {
  return (
    <Section pad="none" sx={{ py: { xs: '72px', md: '120px' } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 6fr) minmax(0, 6fr)' }, gap: { xs: 6, md: 8 }, alignItems: 'center' }}>
        <Box>
          <Typography variant="mono" component="p" sx={{ color: color.ink3 }}>
            Error 404 · grid reference not found
          </Typography>
          <Typography variant="h1" sx={{ mt: 2.5 }}>
            Off the survey.
          </Typography>
          <Typography variant="lead" sx={{ mt: 3, color: color.ink2, maxWidth: '44ch' }}>
            This page doesn't appear on any current plan of hadasoft.in. It may have moved when we rebuilt the site.
          </Typography>
          <Box sx={{ mt: 4.5, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
            <Button component={RouterLink} to="/" variant="contained" size="large" endIcon={<ArrowRight size={18} />}>
              Back to the homepage
            </Button>
            <ArrowLink to="/contact/">Tell us what you were looking for</ArrowLink>
          </Box>
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: 'relative',
            aspectRatio: '4 / 3',
            border: `1px solid ${color.lineStrong}`,
            backgroundImage: `linear-gradient(${color.line} 1px, transparent 1px), linear-gradient(90deg, ${color.line} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box sx={{ fontSize: 'clamp(5rem, 3rem + 8vw, 10rem)', fontWeight: 560, fontStretch: '115%', letterSpacing: '-0.05em', lineHeight: 1 }}>
            4<Box component="span" sx={{ color: color.signal }}>0</Box>4
          </Box>
          <Box sx={{ position: 'absolute', left: 12, bottom: 10, fontFamily: font.mono, fontSize: '0.7rem', color: color.ink3 }}>
            NO RECORD AT THIS REFERENCE
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
