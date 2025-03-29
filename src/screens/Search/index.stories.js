import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Search from './';
import { Grid } from '@material-ui/core';
import { TOKEN_VALID_LENGTH } from './constants';

storiesOf('Screens/Search', module).add('Search with Knobs & Actions', () => {
    /// const hasSearchOccurred = boolean('Has Previous Search Occurred?', false);
    const wasTokenFound = boolean('Was Previous Search Valid?', true);
    const [previousSearchText, setPreviousSearchText] = useState();
    const [searchFieldErrorText, setSearchFieldErrorText] = useState();
    const [searchInProgress, setSearchInProgress] = useState(false);

    return (
        <Grid container justify="center" style={{ padding: '5%' }}>
            <Search
                previousSearchedToken={previousSearchText}
                previousSearchedTokenFound={
                    previousSearchText &&
                    previousSearchText.length === TOKEN_VALID_LENGTH &&
                    wasTokenFound
                }
                onSubmit={(newSearchText) => {
                    action('onSubmit')(newSearchText);
                    if (
                        !newSearchText ||
                        newSearchText.length < TOKEN_VALID_LENGTH
                    ) {
                        setPreviousSearchText(null); // Reset
                        setSearchFieldErrorText(
                            `Token length too short, must be ${TOKEN_VALID_LENGTH} characters.`,
                        );
                    } else {
                        setSearchFieldErrorText(null); // Reset
                        setSearchInProgress(true);
                        setTimeout(() => {
                            setSearchInProgress(false);
                            setPreviousSearchText(newSearchText);
                        }, 4000);
                    }
                }}
                searchFieldErrorText={searchFieldErrorText}
                searchInProgress={searchInProgress}
            />
        </Grid>
    );
});
