import xss from 'xss';
import errors from './errors';

const { ValidationConstraintError } = errors;

/**
 * Attempts to parse JSON, but if it explodes it catches the exception
 * and re-throws it as a ValidationConstraintError.
 */
const sanitiseAndParseJSON = ({ payload = {} }) => {
  try {
    const parsedPayload = JSON.parse(xss(payload));
    return { parsedPayload };
  } catch (error) {
    // logger.error('Error caught when attempting to parse JSON payload');
    throw new ValidationConstraintError(`Invalid JSON Provided: ${error.message}`);
  }
};

export default sanitiseAndParseJSON;
