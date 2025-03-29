import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import CreateTestAuthority from './';
import { Grid } from '@material-ui/core';

storiesOf('Screens/CreateTestAuthority', module).add(
    'CreateTestAuthority Form with Knobs & Actions',
    () => {
        return (
            <Grid container justify="center" style={{ padding: '5%' }}>
                <CreateTestAuthority
                    loading={boolean('Loading?', false)}
                    onSubmit={action('onSubmit')}
                />
            </Grid>
        );
    },
);
