import theme from './';

test('breakpoints helpers generate valid media queries', () => {
    // up shouldn't throw and should expect both breakpoint keys and numbers.
    expect(() => theme.breakpoints.up(1)).not.toThrow();
    expect(() => theme.breakpoints.up(10000)).not.toThrow();
    expect(() => theme.breakpoints.up('xs')).not.toThrow();
    expect(() => theme.breakpoints.up('sm')).not.toThrow();
    expect(() => theme.breakpoints.up('md')).not.toThrow();
    expect(() => theme.breakpoints.up('lg')).not.toThrow();
    expect(() => theme.breakpoints.up('xl')).not.toThrow();

    // down shouldn't throw and should expect both breakpoint keys and numbers.
    expect(() => theme.breakpoints.down(1)).not.toThrow();
    expect(() => theme.breakpoints.down(10000)).not.toThrow();
    expect(() => theme.breakpoints.down('xs')).not.toThrow();
    expect(() => theme.breakpoints.down('sm')).not.toThrow();
    expect(() => theme.breakpoints.down('md')).not.toThrow();
    expect(() => theme.breakpoints.down('lg')).not.toThrow();
    expect(() => theme.breakpoints.down('xl')).not.toThrow();

    // up and down should generate valid media queries
    const xsUp = `${theme.breakpoints.up('xs')}`.trim();
    const smDown = `${theme.breakpoints.down('sm')}`.trim();
    expect(xsUp).toMatch(/^@media.*min-width:\s*\d+(\.\d+)?/i);
    expect(smDown).toMatch(/^@media.*max-width:\s*\d+(\.\d+)?/i);
});
