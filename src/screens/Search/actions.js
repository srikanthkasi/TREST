export const PREFIX = 'Search/';

export const SEARCH_TOKENS_REQUESTED = `${PREFIX}SEARCH_TOKENS_REQUESTED`;
export const SEARCH_TOKENS_SUCCEEDED = `${PREFIX}SEARCH_TOKENS_SUCCEEDED`;
export const SEARCH_TOKENS_FAILED = `${PREFIX}SEARCH_TOKENS_FAILED`;

export const searchTokensRequested = (tokenId) => ({
    type: SEARCH_TOKENS_REQUESTED,
    tokenId,
});

export const searchTokensSucceeded = (token) => ({
    type: SEARCH_TOKENS_SUCCEEDED,
    token,
});

export const searchTokensFailed = (error) => ({
    type: SEARCH_TOKENS_FAILED,
    error,
});
