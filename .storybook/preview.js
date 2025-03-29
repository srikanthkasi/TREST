import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
// Import any global CSS we rely on (i.e. any css imported in `src/index.js`)
import '../src/index.css';

const withThemeProvider = (Story, context) => {
    return (
        <ThemeProvider theme={createMuiTheme(theme)}>
            <Story {...context} />
        </ThemeProvider>
    );
};
export const decorators = [withThemeProvider];
