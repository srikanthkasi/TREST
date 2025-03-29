import React from 'react';
import Pagination from './';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Tables/Pagination',
    component: Pagination,
    argTypes: {
        classes: { table: { disable: true } }, // We don't want to allow changing classes in the storybook.
    },
};

export const WithControlsAndActions = (args) => (
    <Pagination
        onChange={(event, page) => action('onChange')(page)}
        {...args}
    />
);

WithControlsAndActions.args = {
    count: 10,
};
