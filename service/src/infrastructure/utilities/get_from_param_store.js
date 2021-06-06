/**
 * Get Param(s) from aws SSM Param Store
 * Creates a function to get the params, supply the dependencies to
 * the factory function exported from this file to get an instance of
 * getSSMParams
 *
 */

function curry(f) { // curry(f) does the currying transform
  return (a) => (b) => f(a, b);
}

const ssmParamArrayToParamMap = ({ Parameters }) => {
  const paramMap = {};
  Parameters.forEach((param) => {
    paramMap[param.Name] = param.Value;
  });
  return paramMap;
};

const getSSMParams = async ({ logger, ssm }, { paramNames = [] }) => {
  const options = {
    Names: paramNames,
    WithDecryption: true,
  };

  const ssmParamsArray = await ssm.getParameters(options).promise();
  const ssmParamMap = ssmParamArrayToParamMap(ssmParamsArray);

  logger.debug('Acquired params from SSM Pram Store:');
  logger.debug(JSON.stringify(ssmParamMap));

  return ssmParamMap;
};

const getSSMParamsFactory = ({ logger, ssm }) => curry(getSSMParams)({ logger, ssm });

export default getSSMParamsFactory;
