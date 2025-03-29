import { createSelector } from 'reselect';
import { transformUserDetails } from './transforms';
export const getUserDetailsState = (state = {}) =>
    state.userDetails;

export const areUserDetailsLoading = createSelector(
    getUserDetailsState,
    (userDetails = {}) => userDetails.loading,
);

export const isUserDetailsUpdateInProgress = createSelector(
    getUserDetailsState,
    (userDetails = {}) => userDetails.updateInProgress,
);

export const getUserDetailsErrors = createSelector(
    getUserDetailsState,
    (userDetails = {}) =>
        (userDetails.errors && userDetails.errors.errors) || [],
);

export const getUserDetails = createSelector(
    getUserDetailsState,
    (userDetailsState = {}) =>
        transformUserDetails(userDetailsState.user),
);

export const getUserId = createSelector(
    getUserDetailsState,
    (userDetailsState = {}) =>
        userDetailsState && userDetailsState.user
            ? userDetailsState.user.userId
            : '',
);
