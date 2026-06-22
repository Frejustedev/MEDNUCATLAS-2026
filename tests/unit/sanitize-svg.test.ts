import { describe, it, expect } from 'vitest';
import { sanitizeSvg } from '../../lib/sanitize-svg';

describe('sanitizeSvg', () => {
  it('retire les balises <script>', () => {
    const out = sanitizeSvg('<svg><script>alert(1)</script><circle/></svg>');
    expect(out).not.toContain('<script');
    expect(out).toContain('<circle');
  });

  it('retire les <foreignObject>', () => {
    const out = sanitizeSvg('<svg><foreignObject><iframe/></foreignObject></svg>');
    expect(out.toLowerCase()).not.toContain('foreignobject');
    expect(out.toLowerCase()).not.toContain('iframe');
  });

  it('retire les gestionnaires inline on*', () => {
    const out = sanitizeSvg('<svg onload="x()"><rect onclick="y()"/></svg>');
    expect(out).not.toMatch(/onload/i);
    expect(out).not.toMatch(/onclick/i);
  });

  it('neutralise les href javascript:', () => {
    const out = sanitizeSvg('<svg><a href="javascript:alert(1)">x</a></svg>');
    expect(out).not.toMatch(/javascript:/i);
  });

  it('préserve un SVG légitime', () => {
    const svg = '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="currentColor"/></svg>';
    expect(sanitizeSvg(svg)).toContain('circle');
  });
});
