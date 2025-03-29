import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Grid } from '@material-ui/core';
import Select, {
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    VARIANT_FILLED,
    VARIANT_OUTLINED,
    VARIANT_STANDARD,
} from './';

storiesOf('Common/Select', module)
    .add('Select with Knobs & Actions', () => {
        const [value, setValue] = useState(null);
        return (
            <Select
                label={text('Label', 'label')}
                variant={select(
                    'Variant',
                    [VARIANT_OUTLINED, VARIANT_FILLED, VARIANT_STANDARD],
                    VARIANT_FILLED,
                )}
                onClick={action('Select Clicked')}
                disabled={boolean('Disabled', false)}
                filled={boolean('Filled', true)}
                autoWidth={boolean('Auto Width', true)}
                native={boolean('Native', true)}
                color={select(
                    'Color',
                    [COLOR_PRIMARY, COLOR_SECONDARY],
                    COLOR_PRIMARY,
                )}
                defaultValue={text('Default Value', 'default')}
                onChange={(event) => {
                    action('On Change')(event);
                    setValue(event.target.value);
                }}
                value={value}
            >
                <option value={text('Menu Item 1', 'Menu Item 1')}>
                    Menu Item 1
                </option>
                <option value={text('Menu Item 2', 'Menu Item 2')}>
                    Menu Item 2
                </option>
                <option value={text('Menu Item 3', 'Menu Item 3')}>
                    Menu Item 3
                </option>
                <option value={text('Menu Item 4', 'Menu Item 4')}>
                    Menu Item 4
                </option>
            </Select>
        );
    })
    .add('Selects', () => {
        const [filter, setFilter] = useState(null);
        return (
            <Grid container direction="column" spacing={4}>
                <Grid item>
                    <Select
                        filled
                        native
                        onChange={(event) => setFilter(event.target.value)}
                        value={filter}
                    >
                        <option value={null}>Filter by</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                </Grid>
            </Grid>
        );
    });
