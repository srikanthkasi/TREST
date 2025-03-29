import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Grid } from '@material-ui/core';
import Button, {
    BUTTON_SIZE_LARGE,
    BUTTON_SIZE_MEDIUM,
    BUTTON_SIZE_SMALL,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    VARIANT_CONTAINED,
    VARIANT_OUTLINED,
    VARIANT_TEXT,
} from './';

storiesOf('Common/Button', module)
    .add('Button with Knobs & Actions', () => {
        return (
            <>
                <Button
                    variant={select(
                        'Variant',
                        [VARIANT_OUTLINED, VARIANT_CONTAINED, VARIANT_TEXT],
                        VARIANT_OUTLINED,
                    )}
                    onClick={action('Button Clicked')}
                    disabled={boolean('Disabled', false)}
                    fullWidth={boolean('Full Width', false)}
                    href={text('URL', null)}
                    color={select(
                        'Color',
                        [COLOR_PRIMARY, COLOR_SECONDARY],
                        COLOR_PRIMARY,
                    )}
                    size={select(
                        'Size',
                        [
                            BUTTON_SIZE_SMALL,
                            BUTTON_SIZE_MEDIUM,
                            BUTTON_SIZE_LARGE,
                        ],
                        BUTTON_SIZE_LARGE,
                    )}
                >
                    {text('Label', 'Button')}
                </Button>
            </>
        );
    })
    .add('Buttons', () => {
        return (
            <Grid container direction="column" spacing={4}>
                <Grid item>
                    <Button>Login</Button>
                </Grid>
                <Grid item>
                    <Button color={COLOR_SECONDARY}>Register</Button>
                </Grid>
                <Grid item style={{ backgroundColor: '#026DB5' }}>
                    <Button variant={VARIANT_OUTLINED} color={COLOR_SECONDARY}>
                        View TA Operating Rules
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant={VARIANT_TEXT}>Forgot Password</Button>
                </Grid>
                <Grid item>
                    <Button>Submit</Button>
                </Grid>
                <Grid item>
                    <Button variant={VARIANT_OUTLINED} fullWidth>
                        Upload CSV
                    </Button>
                </Grid>
                <Grid item>
                    <Button>Return to Home</Button>
                </Grid>
                <Grid item>
                    <Button>Save</Button>
                </Grid>
                <Grid item>
                    <Button>Logout</Button>
                </Grid>
            </Grid>
        );
    });
