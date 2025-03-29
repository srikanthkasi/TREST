import {
    SEARCH_TOKENS_FAILED,
    SEARCH_TOKENS_REQUESTED,
    SEARCH_TOKENS_SUCCEEDED,
} from './actions';

export const initialState = {
    searchInProgress: false,
    tokenId: null,
    token: null,
    error: null,
};

export default (state = initialState, action = {}) => {
    const { type } = action;
    switch (type) {
        case SEARCH_TOKENS_REQUESTED: {
            const { tokenId } = action;
            return {
                ...state,
                searchInProgress: true,
                tokenId,
            };
        }
        case SEARCH_TOKENS_SUCCEEDED: {
            const { token } = action;
            return {
                ...state,
                searchInProgress: false,
                token,
            };
        }
        case SEARCH_TOKENS_FAILED: {
            const { error } = action;
            return {
                ...state,
                searchInProgress: false,
                error,
            };
        }
        default: {
            return state;
        }
    }
};
