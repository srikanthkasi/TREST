import { pick } from 'ramda';
import {
    NAME_FOR_TEST_AUTHORITY_REGISTRATION_CODE_FIELD,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
} from '../../testAuthorityConstants';
import { NAME_FOR_TEST_AUTHORITY_PENDING_FIELD } from './constants';

export const transformTestAuthorityDetails = (testAuthority = null) => {
    return testAuthority
        ? pick(
              [
                  NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
                  NAME_FOR_TEST_AUTHORITY_ID_FIELD,
                  NAME_FOR_TEST_AUTHORITY_REGISTRATION_CODE_FIELD,
                  NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
                  NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
                  NAME_FOR_TEST_AUTHORITY_PENDING_FIELD,
              ],
              testAuthority,
          )
        : {};
};
