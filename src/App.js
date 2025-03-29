import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createStore from './store';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';
import Router from './Router';
import { ConnectedAppGate } from './init/AppGate';
import Screen from './common/Screen';
import ErrorBoundary from './common/errors/ErrorBoundary';

const { store, history } = createStore();

function App() {
    return (
        <StoreProvider store={store}>
            <ThemeProvider theme={createMuiTheme(theme)}>
                <GlobalStyles />
                <ErrorBoundary component={Screen}>
                    <ConnectedAppGate>
                        {() => <Router history={history} />}
                    </ConnectedAppGate>
                </ErrorBoundary>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default App;
