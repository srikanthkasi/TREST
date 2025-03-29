import { createSelector } from 'reselect';
import { coerceIntoErrors } from '../common/errors';

export const getInitState = (state) => state.init;

export const getInitializationStatus = createSelector(
    getInitState,
    (init) => init.status,
);

export const getInitializationErrors = createSelector(getInitState, (init) =>
    coerceIntoErrors(init.errors),
);
