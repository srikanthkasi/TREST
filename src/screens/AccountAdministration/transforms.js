import { pick } from 'ramda';
import {
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
    NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD,
} from '../../testAuthorityConstants';
import { capitalize } from '@material-ui/core';
import { DateTime } from 'luxon';
import { DISPLAY_FORMAT_FOR_UPDATED_DATE } from './constants';

const transformTestAuthority = (testAuthority = {}) => {
    const fieldsToReturn = testAuthority
        ? pick(
              [
                  NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
                  NAME_FOR_TEST_AUTHORITY_ID_FIELD,
                  NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
                  NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
                  NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD,
              ],
              testAuthority,
          )
        : {};

    if (fieldsToReturn[NAME_FOR_TEST_AUTHORITY_STATUS_FIELD]) {
        fieldsToReturn[NAME_FOR_TEST_AUTHORITY_STATUS_FIELD] = capitalize(
            fieldsToReturn[NAME_FOR_TEST_AUTHORITY_STATUS_FIELD],
        );
    }

    if (fieldsToReturn[NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD]) {
        const date = DateTime.fromISO(
            fieldsToReturn[NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD],
        );
        fieldsToReturn[NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD] = date.toFormat(
            DISPLAY_FORMAT_FOR_UPDATED_DATE,
        );
    }

    return fieldsToReturn;
};

export const transformTestAuthorities = (testAuthorities = []) => {
    return testAuthorities.map((testAuthority) =>
        transformTestAuthority(testAuthority),
    );
};
