import React from 'react';
import IdleBanner from '.';
import { action } from '@storybook/addon-actions';
import Countdown from 'react-countdown';
import { COUNTDOWN_TIME } from '../../layout/MainLayout/constants';

export default {
    title: 'Common/IdleBanner',
    component: IdleBanner,
    argTypes: {
        classes: { table: { disable: true } }, // We don't want to allow changing classes in the storybook.
        // Put any extra stuff to configure/control your args here
    },
};

const renderer = ({ minutes, seconds }) => {
    return (
        <span>
            {minutes}:{seconds}
        </span>
    );
};

export const WithControlsAndActions = (args) => (
    <IdleBanner
        onClick={action('onClick')}
        CloseButtonProps={{
            onClick: () => action('onClick - Close Icon Button')(),
        }}
        PositiveButtonProps={{
            onClick: () => action('onClick - Positive Button')(),
        }}
        NegativeButtonProps={{
            onClick: () => action('onClick - Negative Button')(),
        }}
        Countdown={() => (
            <Countdown
                date={Date.now() + COUNTDOWN_TIME}
                renderer={renderer.zeroPadTime}
            />
        )}
        {...args}
    />
);
