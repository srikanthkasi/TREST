import React from 'react';
import * as Yup from 'yup';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Grid } from '@material-ui/core';

import Form from './';
import TextInput from '../../common/TextInput';

const initialValues = {
    testingAuthorityName: '',
    testingAuthorityId: '',
    testingAuthorityEmailAddress: '',
};

const EXAMPLE_FIELDS = [
    {
        name: 'testingAuthorityName',
        label: 'Test Administrator Name',
        render: (fieldProps) => (
            <TextInput
                required
                fieldLabel="Test Administrator Name"
                {...fieldProps}
            />
        ),
        validation: Yup.string().required(),
    },
    {
        name: 'testingAuthorityId',
        label: 'Test Administrator Identifier',
        render: (fieldProps) => (
            <TextInput
                required
                fieldLabel="Test Administrator Identifier"
                {...fieldProps}
            />
        ),
        validation: Yup.string().required(),
    },
    {
        name: 'testingAuthorityEmailAddress',
        label: 'Email Address',
        render: (fieldProps) => (
            <TextInput required fieldLabel="Email Address" {...fieldProps} />
        ),
        validation: Yup.string().email().required(),
    },
];

storiesOf('Common/Forms', module).add('Form with Knobs & Actions', () => {
    return (
        <Grid container justify="center" style={{ padding: '5%' }}>
            <Form
                initFormState={initialValues}
                loading={boolean('Loading?', false)}
                fields={EXAMPLE_FIELDS}
                showSubmitButton={boolean('Show Submit Button?', true)}
                submitButtonText={text('Submit Button Text', 'Create')}
                title={text('Form Title', 'Form Title')}
                onSubmit={action('onSubmit')}
                showResetButton={boolean('Show Reset Button?', false)}
                onReset={action('onReset')}
            />
        </Grid>
    );
});
