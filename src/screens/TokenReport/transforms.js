import { pick } from 'ramda';
import {
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
} from '../../testAuthorityConstants';
import { capitalize } from '@material-ui/core';
import {
    NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD,
    NAME_FOR_TOKEN_REPORT_COUNT_FIELD,
} from './constants';

const transformToken = (token = {}) => {
    const fieldsToReturn =
        token && token.testAuthority
            ? pick(
                  [
                      NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
                      NAME_FOR_TEST_AUTHORITY_ID_FIELD,
                      NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
                      NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
                      NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD,
                      NAME_FOR_TOKEN_REPORT_COUNT_FIELD,
                  ],
                  {
                      ...token,
                      ...token.testAuthority,
                  },
              )
            : {};

    if (fieldsToReturn[NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD]) {
        fieldsToReturn[NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD] = capitalize(
            fieldsToReturn[NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD],
        );
    }

    return fieldsToReturn;
};

export const transformTokens = (tokens = []) => {
    return tokens.map((token) => transformToken(token));
};
