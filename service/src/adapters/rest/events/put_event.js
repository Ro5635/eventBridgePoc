import {
  utilities, logger, corsHeaders,
} from '../../../infrastructure/configuration';
import publishEventCommandService from '../../../application/command/publish_event';

const {
  restErrorHandler,
  sanitiseAndParseJSON,
} = utilities;

export const handler = async ({
  body = {},
}) => {
  try {
    logger.info('sendEvent rest handler invoked');
    logger.info('PUT: /events');

    const { parsedPayload } = sanitiseAndParseJSON({ payload: body });
    const { event } = parsedPayload;

    logger.info('Calling publishEventCommandService');
    await publishEventCommandService({
      event,
    });
    logger.info('sendMessageCommandService returned successfully with messages:');

    logger.info('Returning Success to caller');
    logger.info('Send message handler completed successfully');
    return {
      statusCode: 201,
      headers: corsHeaders,
    };
  } catch (error) {
    return restErrorHandler({
      error,
      restAdapterName: 'getChat',
    });
  }
};

export default handler;
