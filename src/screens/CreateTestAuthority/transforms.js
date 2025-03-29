import { snakeToCamel } from '../../utils/strings';
import { TEST_AUTHORITY_API_FIELD_LABELS_MAP } from '../../testAuthorityConstants';

export const transformCreateTestAuthorityErrors = (errors = []) => {
    return errors.reduce((accumulatedErrors, error) => {
        const { path, message } = error;
        const camelPath = snakeToCamel(path);
        accumulatedErrors[camelPath] = message.replace(
            path,
            TEST_AUTHORITY_API_FIELD_LABELS_MAP[camelPath],
        );
        return accumulatedErrors;
    }, {});
};

export const transformTestAuthorityForCreate = (testAuthority = {}) => {
    const { taId = '', email = '', ...rest } = testAuthority;
    return {
        taId: taId.toUpperCase(),
        email: email.toLowerCase(),
        ...rest,
    };
};
