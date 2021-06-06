const curry = (f) => (a) => (b) => f(a, b);

const restErrorHandler = ({ logger, corsHeaders, errors }, { error, restAdapterName = '' }) => {
  const {
    SecurityConstraintError,
    ExecutionFailedError,
    ValidationConstraintError,
    InvalidAuthenticationCredentialsError,
  } = errors;

  if (error instanceof ValidationConstraintError) {
    logger.error(`Caught ValidationConstraintError In ${restAdapterName} Rest Adapter`);
    logger.error(error.stack);
    const errorMessage = {
      error: error.message,
    };
    logger.error(`Returning 400 error to caller with error message:${JSON.stringify(errorMessage)}`);
    return {
      body: JSON.stringify(errorMessage),
      statusCode: 400,
      headers: corsHeaders,
    };
  }
  if (error instanceof SecurityConstraintError) {
    logger.error(`Caught SecurityConstraintError in ${restAdapterName} Rest Adapter`);
    logger.error(error.stack);
    logger.error('Returning 401 HTTP response to user.');
    const errorMessage = {
      error: error.message,
    };
    return {
      body: JSON.stringify(errorMessage),
      statusCode: 401,
      headers: corsHeaders,
    };
  } if (error instanceof ExecutionFailedError) {
    logger.error(`Caught ExecutionFailedError in ${restAdapterName} rest adapter`);
    logger.error(error.stack);
    logger.error('Returning 500 HTTP response to user');
    return {
      statusCode: 500,
      headers: corsHeaders,
    };
  } if (error instanceof InvalidAuthenticationCredentialsError) {
    logger.error(`Caught InvalidAuthenticationCredentialsError in ${restAdapterName} rest adapter`);
    logger.error(error.stack);
    logger.error('Returning 403 HTTP response to user');
    return {
      statusCode: 403,
      headers: corsHeaders,
    };
  }
  logger.error(`Caught unexpected error in ${restAdapterName} rest adapter`);
  logger.error(error.stack);
  return {
    statusCode: 500,
    headers: corsHeaders,
  };
};

const restErrorHandlerFactory = ({ logger, corsHeaders, errors }) => curry(restErrorHandler)({ logger, corsHeaders, errors });

export default restErrorHandlerFactory;
