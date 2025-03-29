import {
    CREATE_TEST_AUTHORITY_FAILED,
    CREATE_TEST_AUTHORITY_REQUESTED,
    CREATE_TEST_AUTHORITY_SUCCEEDED,
} from './actions';

export const initialState = {
    loading: false,
    testAuthority: {},
    errors: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    switch (type) {
        case CREATE_TEST_AUTHORITY_REQUESTED: {
            return {
                ...state,
                loading: true,
                errors: null,
            };
        }
        case CREATE_TEST_AUTHORITY_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                errors: null,
            };
        }
        case CREATE_TEST_AUTHORITY_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        }
        default: {
            return state;
        }
    }
};
