import React from 'react';
import { storiesOf } from '@storybook/react';
import StyledUserAdministration from './';
import { DUMMY_USER } from '../../tables/UserTable/index.stories';
import { noop } from '../../common/utils';

storiesOf('Screens/User Administration', module).add(
    'User Administration',
    () => {
        return (
            <StyledUserAdministration
                data={new Array(20).fill(DUMMY_USER)}
                itemsPerPage={0}
                onLoad={noop}
                onLoadSearchOrFilterRequested={noop}
                pageCount={2}
                pageIndex={0}
                setUserSearch={noop}
                setStatusFilter={noop}
            />
        );
    },
);
