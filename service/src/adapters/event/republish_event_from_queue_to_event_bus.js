import { logger } from '../../infrastructure/configuration';
import publishEvents from '../event_publisher/publish_events';

//
// Found this script in an old hackathon project
// Strongly Suspect there would be a much more elegant way to write this
// I'm just going to copy it blindly though 🙈🙈🙈🙈🙈🙈
//

const serviceSourceName = 'ChatService';

const extractEventParamsFromRecord = ({ record }) => {
  logger.debug(`Extracting parameters from record:${JSON.stringify(record)}`);
  const { body: bodyString, receiptHandle, messageId } = record;
  logger.info('Attempting to parse event body');
  const body = JSON.parse(bodyString);
  logger.info('Successfully parsed body string');
  const {
    detail,
    'detail-type': detailType,
  } = body;
  logger.debug(`Extracted messageId:${messageId}, receiptHandle:${receiptHandle}`);
  logger.debug(`Extracted detailType:${detailType}`);
  return {
    messageId,
    receiptHandle,
    detail,
    detailType,
  };
};

export const handler = async ({ Records = [] }) => {
  try {
    logger.info('RePublish Event to chatEventBus Function Invoked');
    logger.info(`Function Invoked with ${Records.length} records`);

    logger.debug('Dispatch Queue RecordsPayload:');
    logger.debug(JSON.stringify(Records));

    const eventDispatchPromises = Records.map(async (record) => {
      logger.info('Handling a record');
      const {
        messageId,
        receiptHandle,
        detailType,
        detail,
      } = extractEventParamsFromRecord({ record });

      logger.info(`detail:${JSON.stringify(detail)}`);
      logger.info(`messageId:${messageId}, receiptHandle:${receiptHandle}`);

      const event = { type: detailType, ...detail };
      const events = [event];
      logger.info('Attempting to publish events');
      await publishEvents({ events, eventSource: serviceSourceName });
      logger.info('Successfully published events');
    });

    // It is necessary to add a catch to each promise as the Promise.all is fail fast
    const safeEventDispatchPromises = eventDispatchPromises.map((promise) => promise.catch(((error) => {
      logger.error('Caught failure from an event re-publish');
      return error;
    })));

    const republishEventResults = await Promise.all(safeEventDispatchPromises);

    // We need to step through all of the results and check to see if there was a caught error
    republishEventResults.forEach((dispatchResult) => {
      if (dispatchResult instanceof Error) {
        throw dispatchResult;
      }
    });

    logger.info('All Records Resolved');
    await logger.close();
    return { dispatched: Records };
  } catch (error) {
    logger.error('Failed to handle 1 or more records in RePublishChatEvent Event handler');
    logger.error(error.message);
    logger.error(error.stack);
    await logger.close();

    // Need to throw the error to ensure that the message is not removed from the queue
    // automagicaly by lambda/aws/magic
    return Promise.reject(error);
  }
};

export default handler;
