import { uniq } from 'ramda';

/**
 * Ensure any given value is either `null` or a non empty array of errors.
 *
 * @param {{string|Error|null|object|(string|Error|null|object)[]} errorOrErrors
 * @returns {null|*[]}
 */
export function coerceIntoErrors(errorOrErrors) {
    if (
        !errorOrErrors ||
        (Array.isArray(errorOrErrors) && errorOrErrors.length === 0)
    ) {
        return null;
    }

    if (Array.isArray(errorOrErrors)) {
        return errorOrErrors;
    }

    return [errorOrErrors];
}

/**
 * Given an error or errors, coerce them into a unique array of human readable error messages.
 *
 * @param {string|Error|null|object|(string|Error|null|object)[]} errors
 * @param {string=} fallback
 * @param {boolean=} obscureJSErrors
 * @returns {string[]|null}
 */
export function coerceErrorsIntoErrorMessages(
    errors,
    fallback = 'An unknown error occurred.',
    obscureJSErrors = process.env.NODE_ENV !== 'development',
) {
    // Ensure we actually have a non empty array of errors.
    const parsedErrors = coerceIntoErrors(errors);
    if (!parsedErrors) {
        return [];
    }

    // Parse the errors, coercing Error object into strings if we're allowed to
    const finalErrors = parsedErrors.reduce((errors, error) => {
        if (error) {
            if (
                typeof error === 'object' &&
                error.message &&
                !obscureJSErrors
            ) {
                errors.push(
                    error.name
                        ? `${error.name}: ${error.message}`
                        : error.message,
                );
            } else if (typeof error === 'string') {
                errors.push(error);
            }
        }
        return errors;
    }, []);

    // If we have any errors to show, return them; otherwise, return the fallback error.
    return finalErrors.length === 0 ? [fallback] : uniq(finalErrors);
}
