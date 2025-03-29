import { createSelector } from 'reselect';
import { transformCreateTestAuthorityErrors } from './transforms';

export const getCreateTestAuthorityState = (state = {}) =>
    state.createTestAuthority;

export const isCreateTestAuthorityLoading = createSelector(
    getCreateTestAuthorityState,
    (createTestAuthority = {}) => createTestAuthority.loading,
);

export const getCreateTestAuthorityErrors = createSelector(
    getCreateTestAuthorityState,
    (createTestAuthority = {}) =>
        transformCreateTestAuthorityErrors(
            (createTestAuthority.errors && createTestAuthority.errors.errors) ||
                [],
        ),
);
