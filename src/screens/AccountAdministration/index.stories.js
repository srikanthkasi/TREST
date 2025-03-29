import React from 'react';
import { storiesOf } from '@storybook/react';
import StyledAccountAdministration from './';
import { DUMMY_TA } from '../../tables/Table/index.stories';
import { noop } from '../../common/utils';

storiesOf('Screens/Account Administration', module).add(
    'Account Administration',
    () => {
        return (
            <StyledAccountAdministration
                data={new Array(20).fill(DUMMY_TA)}
                itemsPerPage={0}
                onLoad={noop}
                onLoadSearchOrFilterRequested={noop}
                pageCount={2}
                pageIndex={0}
                setSearch={noop}
                setStatusFilter={noop}
            />
        );
    },
);
