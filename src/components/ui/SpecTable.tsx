import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { useToneColors } from '../../theme/tone';
import { font } from '../../theme/tokens';

export interface SpecRow {
  label: string;
  cells: ReactNode[];
}

interface SpecTableProps {
  rows: SpecRow[];
  /** Column headings for the value cells (the label column needs none). */
  head?: string[];
  caption: string;
}

/**
 * A spec sheet, not a spreadsheet: thin rules, mono labels, no zebra stripes.
 * Hovering a row tints it so the eye can track across columns.
 * Below 600px each row stacks, and cells carry their column name.
 */
export function SpecTable({ rows, head, caption }: SpecTableProps) {
  const c = useToneColors();
  const labelStyle = {
    fontFamily: font.mono,
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.07em',
    textTransform: 'uppercase' as const,
    color: c.fg3,
  };
  return (
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        borderTop: `1px solid ${c.lineStrong}`,
        '& th, & td': { textAlign: 'left', verticalAlign: 'top', py: '18px', pr: 3, borderBottom: `1px solid ${c.line}` },
        '& thead th': { ...labelStyle, color: c.fg, py: '14px' },
        '& tbody tr': { transition: 'background-color .2s ease' },
        '& tbody tr:hover': { bgcolor: c.night ? 'rgba(255,255,255,0.035)' : 'rgba(17,20,24,0.035)' },
        '& tbody th': { ...labelStyle, width: { sm: '24%' }, pt: '21px', pl: { sm: 0.5 } },
        '& td': { fontSize: '1rem', lineHeight: 1.55 },
        '@media (max-width: 599.95px)': {
          '& thead': { display: 'none' },
          '& tr, & tbody th, & td': { display: 'block' },
          '& tbody th': { borderBottom: 0, pb: 0.5 },
          '& td': { pt: 0.75, pb: 1.25, borderBottom: 0 },
          '& tbody tr': { borderBottom: `1px solid ${c.line}`, py: 1 },
          '& td[data-label]::before': { content: 'attr(data-label)', display: 'block', ...labelStyle, fontSize: '0.66rem', mb: 0.5 },
        },
      }}
    >
      <caption className="sr-only">{caption}</caption>
      {head && (
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Attribute</span>
            </th>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            {row.cells.map((cell, i) => (
              <td key={i} data-label={head?.[i]}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  );
}
