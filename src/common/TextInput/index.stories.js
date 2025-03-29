import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import TextInput, { VARIANT_FILLED, VARIANT_OUTLINED } from './';
import { toAlphaNumericUppercase } from '../../utils/strings';

storiesOf('Common/TextInput', module)
    .add('TextInput with Knobs & Actions', () => {
        return (
            <TextInput
                onChange={action('Text Changed')}
                disabled={boolean('Disabled', false)}
                fieldLabel={text('Field Label', 'Field Label')}
                variant={select(
                    'Variant',
                    [VARIANT_FILLED, VARIANT_OUTLINED],
                    VARIANT_FILLED,
                )}
            />
        );
    })
    .add('Search', () => {
        const [searchText, setSearchText] = useState(null);
        return (
            <TextInput
                onChange={(event) => {
                    action('Search Text Changed')(event);
                    setSearchText(event.target.value);
                }}
                label="Search"
                value={searchText}
            />
        );
    })
    .add('Auto Capitalize, Only Keep Alphanumeric', () => {
        const [searchText, setSearchText] = useState(null);
        return (
            <TextInput
                onChange={(event) => {
                    action('Search Text Changed')(event);
                    const search = event.target.value
                        ? toAlphaNumericUppercase(event.target.value)
                        : '';
                    setSearchText(search);
                }}
                label="Auto Capitalized - Alphanumeric"
                value={searchText}
            />
        );
    });
