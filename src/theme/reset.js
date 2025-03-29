/**
 * Some sane cross-browser resets that take into account our theme, borrowed from `@material-ui/core` and merged
 * with some modern reset CSS from the below article.
 *
 * @see https://github.com/mui-org/material-ui/blob/v4.9.0/packages/material-ui/src/CssBaseline/CssBaseline.js
 * @see https://dev.to/hankchizljaw/a-modern-css-reset-6p3
 *
 * @param {object} theme
 * @returns {object}
 */
export default (theme) => ({
    'html, body': {
        height: '100%',
    },
    html: {
        // Anti-aliasing.
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        // Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
        boxSizing: 'border-box',
    },
    '*, *::before, *::after': {
        boxSizing: 'inherit',
    },
    'strong, b': {
        fontWeight: 'bolder',
    },
    body: {
        // Remove the margin in all browsers.
        margin: 0,
        color: theme.palette.foreground,
        ...theme.typography.normal,
        backgroundColor: theme.palette.background,
        scrollBehavior: 'smooth',
        textRendering: 'optimizeSpeed',
        '@media print': {
            // Save printer ink.
            backgroundColor: '#ffffff',
        },
        /*
         * Add support for document.body.requestFullScreen(). Other elements, if background transparent, are not
         * supported.
         */
        '&::backdrop': {
            backgroundColor: theme.palette.background,
        },
    },
    'ul[class], ol[class]': {
        padding: 0,
        listStyle: 'none',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ul[class], ol[class], li, figure, figcaption, blockquote, dl, dd': {
        margin: 0,
    },
    'h1, h2, h3, h4, h5, h6': {
        marginTop: '0.5em',
        marginBottom: '0.3em',
    },
    p: {
        marginBottom: '0.5em',
    },
    code: {
        whiteSpace: 'pre',
    },
    'a:not([class])': {
        textDecorationSkipInk: 'auto',
    },
    img: {
        maxWidth: '100%',
        display: 'block',
    },
    'article > * + *': {
        marginTop: '1em',
    },
    'input, button, textarea, select': {
        font: 'inherit',
    },
    '@media (prefers-reduced-motion: reduce)': {
        '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
        },
    },
});
