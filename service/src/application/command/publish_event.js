import publishEvents from '../../adapters/event_publisher/publish_events';
import { logger, errors } from '../../infrastructure/configuration';

const { ExecutionFailedError } = errors;

const publishEventCommandService = async ({ event }) => {
  try {
    logger.info('publishEventCommandService called to publish events');
    logger.info({
      structuredLogName: 'publishEventCommandServiceInput',
      event,
    });

    const events = [event];

    logger.info('Attempting to publish events');
    await publishEvents({
      events,
    });
    logger.info('Successfully published event');
    logger.info('publishEventCommandService completed successfully');
  } catch (error) {
    logger.error('Caught exception in publishEventCommandService');
    logger.error(error.stack);

    throw new ExecutionFailedError('Failed to publish supplied event');
  }
};

export default publishEventCommandService;
