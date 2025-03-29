import { pick } from 'ramda';
import {
    NAME_FOR_USER_ID_FIELD,
    NAME_FOR_USER_FIRST_NAME_FIELD,
    NAME_FOR_USER_LAST_NAME_FIELD,
    NAME_FOR_USER_EMAIL_FIELD,
    NAME_FOR_USER_STATUS_FIELD,
    NAME_FOR_USER_UPDATED_FIELD,
} from '../../userConstants';
import { capitalize } from '@material-ui/core';
import { DateTime } from 'luxon';
import { DISPLAY_FORMAT_FOR_UPDATED_DATE } from './constants';

const transformUser = (user = {}) => {
    const fieldsToReturn = user
        ? pick(
              [
                  NAME_FOR_USER_FIRST_NAME_FIELD,
                  NAME_FOR_USER_LAST_NAME_FIELD,
                  NAME_FOR_USER_ID_FIELD,
                  NAME_FOR_USER_EMAIL_FIELD,
                  NAME_FOR_USER_STATUS_FIELD,
                  NAME_FOR_USER_UPDATED_FIELD,
              ],
              user,
          )
        : {};

    if (fieldsToReturn[NAME_FOR_USER_STATUS_FIELD]) {
        fieldsToReturn[NAME_FOR_USER_STATUS_FIELD] = capitalize(
            fieldsToReturn[NAME_FOR_USER_STATUS_FIELD],
        );
    }

    if (fieldsToReturn[NAME_FOR_USER_UPDATED_FIELD]) {
        const date = DateTime.fromISO(
            fieldsToReturn[NAME_FOR_USER_UPDATED_FIELD],
        );
        fieldsToReturn[NAME_FOR_USER_UPDATED_FIELD] = date.toFormat(
            DISPLAY_FORMAT_FOR_UPDATED_DATE,
        );
    }

    return fieldsToReturn;
};

export const transformUsers = (users = []) => {
    return users.map((user) =>
        transformUser(user),
    );
};
