import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Grid, TextField } from '@material-ui/core';
import Autocomplete from './';

const VARIANT_FILLED = 'filled';
const VARIANT_OUTLINED = 'outlined';
const VARIANT_STANDARD = 'standard';

const DUMMY_DATA = [
    { key: 1, value: 1, label: 'One' },
    { key: 2, value: 2, label: 'Two' },
    { key: 3, value: 3, label: 'Three' },
    { key: 4, value: 4, label: 'Four' },
    { key: 5, value: 5, label: 'Five' },
];

storiesOf('Common/Autocomplete', module)
    .add('Autocomplete with Knobs & Actions', () => {
        const [value, setValue] = useState(null);
        return (
            <Autocomplete
                onClick={action('Autocomplete Clicked')}
                disabled={boolean('Disabled', false)}
                options={DUMMY_DATA}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option, item) =>
                    option.value === item.value
                }
                onChange={(event, item) => {
                    action('On Change')(event);
                    setValue(item ? item.value : null);
                }}
                renderInput={(params) => (
                    <TextField
                        label={text('Label', 'label')}
                        variant={select(
                            'Variant',
                            [
                                VARIANT_OUTLINED,
                                VARIANT_FILLED,
                                VARIANT_STANDARD,
                            ],
                            VARIANT_FILLED,
                        )}
                        defaultValue={text('Default Value', 'default')}
                        value={value}
                        {...params}
                    />
                )}
            />
        );
    })
    .add('Autocomplete', () => {
        return (
            <Grid container direction="column" spacing={4}>
                <Grid item>
                    <Autocomplete
                        options={DUMMY_DATA}
                        getOptionLabel={(option) => option.label}
                        getOptionSelected={(option, item) =>
                            option.value === item.value
                        }
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Autocomplete" />
                        )}
                    />
                </Grid>
            </Grid>
        );
    });
