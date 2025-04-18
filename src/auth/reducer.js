import {
    AUTH_STATUS_REQUESTED,
    AUTH_STATUS_SUCCEEDED,
    AUTH_STATUS_FAILED
} from './constants';
import { 
    AUTHENTICATION_SUCCEEDED, 
    AUTHENTICATION_FAILED 
} from './actions';

export const initAuthState = {
    status: AUTH_STATUS_REQUESTED,
    errors: null,
};

export default function(state = initAuthState, action) {
    const { type } = action;

    if (type === AUTHENTICATION_SUCCEEDED) {
        return {
            ...state,
            status: AUTH_STATUS_SUCCEEDED,
            token: action.payload.token,
            profile: action.payload.profile,
        };
    } else if (type === AUTHENTICATION_FAILED) {
        return {
            ...state,
            status: AUTH_STATUS_FAILED,
            errors: action.payload.errors,
        };
    }

    return state;
}
