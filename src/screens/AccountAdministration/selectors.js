import { createSelector } from 'reselect';
import { transformTestAuthorities } from './transforms';

export const getAccountAdministrationState = (state = {}) =>
    state.accountAdministration;

export const isAccountAdministrationLoading = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) => accountAdministrationState.loading,
);

export const getPageIndex = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) => accountAdministrationState.pageIndex,
);

export const getItemsPerPage = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) =>
        accountAdministrationState.itemsPerPage,
);

export const getPageCount = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) => {
        const pageCount = Math.ceil(
            accountAdministrationState.totalItems /
                accountAdministrationState.itemsPerPage,
        );
        return pageCount;
    },
);

export const getTableData = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) =>
        transformTestAuthorities(accountAdministrationState.testAuthorities),
);

export const getStatusFilter = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) =>
        accountAdministrationState.statusFilter,
);

export const getSearch = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) => {
        const { search } = accountAdministrationState;
        return search && search.length >= 3 ? search : null;
    },
);

export const getPreviousSearch = createSelector(
    getAccountAdministrationState,
    (accountAdministrationState = {}) =>
        accountAdministrationState.previousSearch,
);
