import React from 'react';
import { storiesOf } from '@storybook/react';
import StyledTokenReport from './';
import { noop } from '../../common/utils';

export const DUMMY_TA = {
    enteredAt: '12.1.2020',
    name: 'Test Administrator Name',
    taId: 'TAID',
    email: 'johnsmith@email.gov',
    tokensSubmitted: 12345,
};

storiesOf('Screens/Token Report', module).add('Token Report', () => {
    return (
        <StyledTokenReport
            data={new Array(20).fill(DUMMY_TA)}
            itemsPerPage={0}
            onLoad={noop}
            onLoadSearchOrFilterRequested={noop}
            pageCount={2}
            pageIndex={0}
            setSearch={noop}
        />
    );
});
