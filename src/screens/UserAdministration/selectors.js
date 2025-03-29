import { createSelector } from 'reselect';
import { transformUsers } from './transforms';

export const getUserAdministrationState = (state = {}) =>
    state.userAdministration;

export const isUserAdministrationLoading = createSelector(
    getUserAdministrationState,
    (userState = {}) => userState.loading,
);

export const getPageIndex = createSelector(
    getUserAdministrationState,
    (userState = {}) => userState.pageIndex,
);

export const getItemsPerPage = createSelector(
    getUserAdministrationState,
    (userState = {}) =>
        userState.itemsPerPage,
);

export const getPageCount = createSelector(
    getUserAdministrationState,
    (userState = {}) => {
        const pageCount = Math.ceil(
            userState.totalItems /
                userState.itemsPerPage,
        );
        return pageCount;
    },
);

export const getTableData = createSelector(
    getUserAdministrationState,
    (userState = {}) =>
        transformUsers(userState.users),
);

export const getStatusFilter = createSelector(
    getUserAdministrationState,
    (userState = {}) =>
        userState.statusFilter,
);

export const getSearch = createSelector(
    getUserAdministrationState,
    (userState = {}) => {
        const { search } = userState;
        return search && search.length >= 3 ? search : null;
    },
);

export const getPreviousSearch = createSelector(
    getUserAdministrationState,
    (userState = {}) =>
        userState.previousSearch,
);
