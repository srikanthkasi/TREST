import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import UserDetails from './';
import { Grid } from '@material-ui/core';
import StoryRouter from 'storybook-react-router';

storiesOf('Screens/UserDetails', module)
    .addDecorator(StoryRouter())
    .add('UserDetails Form with Knobs & Actions', () => {
        return (
            <Grid container justify="center">
                <UserDetails
                    loading={boolean('Loading?', false)}
                    onSubmit={action('onSubmit')}
                    initFormState={{
                        name: 'User Name',
                        email: 'someone@somewhere.com',
                    }}
                />
            </Grid>
        );
    });
