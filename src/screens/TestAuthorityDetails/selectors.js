import { createSelector } from 'reselect';
import { transformTestAuthorityDetails } from './transforms';
import { transformCreateTestAuthorityErrors } from '../CreateTestAuthority/transforms';

export const getTestAuthorityDetailsState = (state = {}) =>
    state.testAuthorityDetails;

export const areTestAuthorityDetailsLoading = createSelector(
    getTestAuthorityDetailsState,
    (testAuthorityDetails = {}) => testAuthorityDetails.loading,
);

export const isTestAuthorityDetailsUpdateInProgress = createSelector(
    getTestAuthorityDetailsState,
    (testAuthorityDetails = {}) => testAuthorityDetails.updateInProgress,
);

export const getTestAuthorityDetailsErrors = createSelector(
    getTestAuthorityDetailsState,
    (testAuthorityDetails = {}) =>
        transformCreateTestAuthorityErrors(
            (testAuthorityDetails.errors &&
                testAuthorityDetails.errors.errors) ||
                [],
        ),
);

export const getTestAuthorityDetails = createSelector(
    getTestAuthorityDetailsState,
    (testAuthorityDetailsState = {}) =>
        transformTestAuthorityDetails(testAuthorityDetailsState.testAuthority),
);

export const getTestAuthorityId = createSelector(
    getTestAuthorityDetailsState,
    (testAuthorityDetailsState = {}) =>
        testAuthorityDetailsState && testAuthorityDetailsState.testAuthority
            ? testAuthorityDetailsState.testAuthority.taId
            : '',
);
