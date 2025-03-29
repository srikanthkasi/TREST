import { pick } from 'ramda';
import {
    NAME_FOR_USER_EMAIL_FIELD,
    NAME_FOR_USER_ID_FIELD,
    NAME_FOR_USER_FIRST_NAME_FIELD,
    NAME_FOR_USER_LAST_NAME_FIELD,
    NAME_FOR_USER_STATUS_FIELD,
} from '../../userConstants';

export const transformUserDetails = (user = null) => {
    return user
        ? pick(
              [
                  NAME_FOR_USER_FIRST_NAME_FIELD,
                  NAME_FOR_USER_LAST_NAME_FIELD,
                  NAME_FOR_USER_ID_FIELD,
                  NAME_FOR_USER_EMAIL_FIELD,
                  NAME_FOR_USER_STATUS_FIELD
              ],
              user,
          )
        : {};
};
