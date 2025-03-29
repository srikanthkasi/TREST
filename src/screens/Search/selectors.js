import { createSelector } from 'reselect';

export const getSearchState = (state) => state.search || {};

export const isSearchInProgress = createSelector(
    getSearchState,
    (searchState = {}) => searchState.searchInProgress,
);

export const getSearchedTokenId = createSelector(
    getSearchState,
    (searchState = {}) => searchState.tokenId,
);

export const getFoundTokenId = createSelector(
    getSearchState,
    (searchState = {}) =>
        searchState.token && searchState.token.tokenId
            ? searchState.token.tokenId
            : null,
);

export const getPreviousSearchedToken = createSelector(
    getSearchedTokenId,
    getFoundTokenId,
    (searched, found) => found || searched,
);

export const wasPreviousSearchedTokenFound = createSelector(
    getFoundTokenId,
    (foundTokenId = null) => !!foundTokenId,
);
