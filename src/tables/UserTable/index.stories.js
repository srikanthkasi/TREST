import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UserTable from './';
import Button, {
    BUTTON_SIZE_SMALL,
    VARIANT_OUTLINED,
} from '../../common/Button';

export const DUMMY_USER = {
    updatedAt: '12.1.2020',
    firstName: 'Test',
    middleName: 'U',
    lastName: 'User',
    email: 'test@test.com',
    id: 12345,
    oktaId: '123-ABCD-1234-XYZABC',
    status: 'Authorized'
};

storiesOf('UserTables/UserTable', module).add(
    'Button with Knobs & Actions',
    () => {
        return (
            <UserTable
                TableOptions={{
                    data: new Array(20).fill(DUMMY_USER),
                    columns: [
                        { Header: 'Date Updated', accessor: 'updatedAt' },
                        { Header: 'First Name', accessor: 'firstName' },
                        { Header: 'Middle Name', accessor: 'middleName' },
                        { Header: 'Last Name', accessor: 'lastName' },
                        { Header: 'Email', accessor: 'email' },
                        {
                            Header: 'Okta ID',
                            accessor: 'oktaId',
                        },
                        { Header: 'Status', accessor: 'status' },
                    ],
                }}
                renderActionCell={(row) => {
                    return (
                        <Button
                            size={BUTTON_SIZE_SMALL}
                            variant={VARIANT_OUTLINED}
                            onClick={action(
                                `Action Button Clicked, row ${JSON.stringify(
                                    row,
                                )}`,
                            )}
                            style={{
                                fontSize: 12,
                                paddingLeft: 22,
                                paddingRight: 22,
                            }}
                        >
                            View/Edit
                        </Button>
                    );
                }}
            />
        );
    },
);
