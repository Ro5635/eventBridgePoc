// aws-sdk is packaged in the lambda runtime, we don't need to take it with us.
// eslint-disable-next-line import/no-extraneous-dependencies
import awsSdk from 'aws-sdk';
import { newLogger } from '@travel-cloud/simple-lambda-logger';
import xray from 'aws-xray-sdk';
import errors from './utilities/errors';
import validate from './utilities/joi_validation_with_throws';
// import authorizationClaimsExtractorFactory from './utilities/authorization_claims_extractor';
import removeUndefinedKeys from './utilities/remove_undefined_keys';
import getSSMParamsFactory from './utilities/get_from_param_store';
import sanitiseAndParseJSON from './utilities/sanitise_and_parse_json';
import restErrorHandlerFactory from './utilities/rest_error_handler';

const aws = xray.captureAWS(awsSdk);

const {
  ENVIRONMENT_NAME,
  CHAT_EVENT_BUS_NAME,
} = process.env;

const REGION = 'eu-west-1';
const logLevel = 'DEBUG';
const isRunningLocally = process.env.AWS_SAM_LOCAL === 'true';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'content-type, Authorization',
};

const environment = {
  REGION,
  ENVIRONMENT_NAME,
  CHAT_EVENT_BUS_NAME,
};

const logger = newLogger(logLevel);

if (isRunningLocally) {
  aws.config.update({
    region: 'local',
    endpoint: 'http://dynamodb:8000/',
  });
  // Provide Local versions when running locally
  // environment.TABLE_NAME = 'TableName';
} else {
  aws.config.update({
    region: REGION,
  });
}

const mockEventBridge = {
  putEvents: () => ({
    promise: () => {
      logger.info('MOCKED EVENTBRIDGE');
    },
  }),
};

const docClient = new aws.DynamoDB.DocumentClient();
const eventBridge = isRunningLocally ? mockEventBridge : new aws.EventBridge({ apiVersion: '2015-10-07' });
const emailService = new aws.SES({ apiVersion: '2010-12-01' });
const sqs = new aws.SQS({ apiVersion: '2012-11-05' });
const s3 = new aws.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' });
const ssm = new aws.SSM({ apiVersion: '2014-11-06' });
const apiGatewayManagementApi = new aws.ApiGatewayManagementApi({ apiVersion: '2018-11-29', endpoint: 'WEBSOCKET_API_ENDPOINT' });

const getSSMParams = getSSMParamsFactory({ logger, ssm });
// const authorizationClaimsExtractor = authorizationClaimsExtractorFactory({ logger });
const restErrorHandler = restErrorHandlerFactory({ logger, corsHeaders, errors });

const utilities = {
  validate,
  removeUndefinedKeys,
  getSSMParams,
  restErrorHandler,
  sanitiseAndParseJSON,
};

export {
  aws,
  docClient,
  eventBridge,
  emailService,
  sqs,
  s3,
  ssm,
  apiGatewayManagementApi,
  corsHeaders,
  logger,
  environment,
  errors,
  utilities,
};
