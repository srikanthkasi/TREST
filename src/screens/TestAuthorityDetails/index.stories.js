import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import TestAuthorityDetails from './';
import { Grid } from '@material-ui/core';
import StoryRouter from 'storybook-react-router';

storiesOf('Screens/TestAuthorityDetails', module)
    .addDecorator(StoryRouter())
    .add('TestAuthorityDetails Form with Knobs & Actions', () => {
        return (
            <Grid container justify="center">
                <TestAuthorityDetails
                    loading={boolean('Loading?', false)}
                    onSubmit={action('onSubmit')}
                    initFormState={{
                        registrationCode: '123-ABCD-1234-XYZABC',
                        name: 'Test Administrator Name',
                        taId: 'TAID',
                        email: 'someone@somewhere.com',
                    }}
                />
            </Grid>
        );
    });
