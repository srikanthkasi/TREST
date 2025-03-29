import {
    FETCH_USER_FAILED,
    FETCH_USER_REQUESTED,
    FETCH_USER_SUCCEEDED,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUESTED,
    UPDATE_USER_SUCCEEDED,
} from './actions';

export const initialState = {
    loading: false,
    user: {},
    errors: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    switch (type) {
        case FETCH_USER_REQUESTED: {
            return {
                ...state,
                loading: true,
                errors: null,
            };
        }
        case FETCH_USER_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                errors: null,
                user: action.user,
            };
        }
        case FETCH_USER_FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        }
        case UPDATE_USER_REQUESTED: {
            return {
                ...state,
                updateInProgress: true,
                errors: null,
            };
        }
        case UPDATE_USER_SUCCEEDED: {
            return {
                ...state,
                updateInProgress: false,
                errors: null,
                user: action.user,
            };
        }
        case UPDATE_USER_FAILED: {
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
