import React from 'react';
import { withStyles } from '@material-ui/styles';
import rawGlobalStyles from './global';
import rawResetStyles from './reset';

/**
 * A "ghost" component that injects global styles.
 *
 * @type {React.FunctionComponent<{ children?: React.ReactNode }>}
 */
const GlobalStyles = withStyles(
    (theme) => ({
        '@global': {
            ...(typeof rawResetStyles === 'function'
                ? rawResetStyles(theme)
                : rawResetStyles),
            ...(typeof rawGlobalStyles === 'function'
                ? rawGlobalStyles(theme)
                : rawGlobalStyles),
        },
    }),
    {
        name: 'GlobalStyles',
    },
)(function GlobalStyles({ children = null }) {
    return <>{children}</>;
});

export default GlobalStyles;
