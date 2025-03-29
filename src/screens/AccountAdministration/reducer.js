import {
    FETCH_TEST_AUTHORITIES_FAILED,
    FETCH_TEST_AUTHORITIES_REQUESTED,
    FETCH_TEST_AUTHORITIES_SUCCEEDED,
    SET_PAGE_INDEX,
    SET_PREVIOUS_SEARCH,
    SET_SEARCH,
    SET_STATUS_FILTER,
} from './actions';
import { ITEMS_PER_PAGE } from './constants';

export const initialState = {
    loading: false,
    testAuthorities: [],
    errors: null,
    pageIndex: 0,
    totalItems: 0,
    itemsPerPage: ITEMS_PER_PAGE,
    sortBy: null,
    statusFilter: null,
    search: null,
    prevSearch: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    switch (type) {
        case FETCH_TEST_AUTHORITIES_REQUESTED: {
            const {
                itemsPerPage,
                pageIndex,
                sortBy,
                statusFilter,
                search,
            } = action;
            return {
                ...state,
                loading: true,
                itemsPerPage,
                pageIndex,
                sortBy,
                statusFilter,
                search,
            };
        }
        case FETCH_TEST_AUTHORITIES_FAILED: {
            const { errors } = action;
            return {
                ...state,
                loading: false,
                errors,
            };
        }
        case FETCH_TEST_AUTHORITIES_SUCCEEDED: {
            const { testAuthorities, totalItems } = action;
            return {
                ...state,
                testAuthorities,
                errors: [],
                loading: false,
                totalItems,
            };
        }
        case SET_STATUS_FILTER: {
            const { statusFilter } = action;
            return {
                ...state,
                statusFilter,
                pageIndex: 0, // Reset page index to 0 when you switch the filters.
            };
        }
        case SET_SEARCH: {
            const { search } = action;
            return {
                ...state,
                search,
            };
        }
        case SET_PREVIOUS_SEARCH: {
            const { previousSearch } = action;
            return {
                ...state,
                previousSearch,
            };
        }
        case SET_PAGE_INDEX: {
            const { pageIndex } = action;
            return {
                ...state,
                pageIndex,
            };
        }
        default:
            return state;
    }
};
