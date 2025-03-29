import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TrustTable from './';
import Button, {
    BUTTON_SIZE_SMALL,
    VARIANT_OUTLINED,
} from '../../common/Button';

export const DUMMY_TA = {
    updatedAt: '12.1.2020',
    name: 'Test Administrator Name',
    taId: 'TAID',
    registrationCode: '123-ABCD-1234-XYZABC',
    status: 'Active',
};

storiesOf('TrustTables/TrustTable', module).add(
    'Button with Knobs & Actions',
    () => {
        return (
            <TrustTable
                TableOptions={{
                    data: new Array(20).fill(DUMMY_TA),
                    columns: [
                        { Header: 'Date Updated', accessor: 'updatedAt' },
                        { Header: 'TA Name', accessor: 'name' },
                        { Header: 'TA Identifier', accessor: 'taId' },
                        {
                            Header: 'Registration Code',
                            accessor: 'registrationCode',
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
