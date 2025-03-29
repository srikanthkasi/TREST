import {
    FETCH_TEST_AUTHORITY_FAILED,
    FETCH_TEST_AUTHORITY_REQUESTED,
    FETCH_TEST_AUTHORITY_SUCCEEDED,
    UPDATE_TEST_AUTHORITY_FAILED,
    UPDATE_TEST_AUTHORITY_REQUESTED,
    UPDATE_TEST_AUTHORITY_SUCCEEDED,
} from './actions';

export const initialState = {
    loading: false,
    testAuthority: {},
    errors: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    switch (type) {
        case FETCH_TEST_AUTHORITY_REQUESTED: {
            return {
                ...state,
                loading: true,
                errors: null,
            };
        }
        case FETCH_TEST_AUTHORITY_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                errors: null,
                testAuthority: action.testAuthority,
            };
        }
        case FETCH_TEST_AUTHORITY_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        }
        case UPDATE_TEST_AUTHORITY_REQUESTED: {
            return {
                ...state,
                updateInProgress: true,
                errors: null,
            };
        }
        case UPDATE_TEST_AUTHORITY_SUCCEEDED: {
            return {
                ...state,
                updateInProgress: false,
                errors: null,
                testAuthority: action.testAuthority,
            };
        }
        case UPDATE_TEST_AUTHORITY_FAILED: {
            return {
                ...state,
                updateInProgress: false,
                errors: action.errors,
            };
        }
        default: {
            return state;
        }
    }
};
