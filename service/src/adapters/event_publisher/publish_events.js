import {
  logger, eventBridge, environment, errors,
} from '../../infrastructure/configuration';

const { CHAT_EVENT_BUS_NAME } = environment;
const { ExecutionFailedError } = errors;
const defaultEventSource = 'chatService';
// Actual limit is 10
const eventPageLimit = 8;

const publishPageOfEvents = async ({
  events, eventBusName = CHAT_EVENT_BUS_NAME, eventSource = defaultEventSource, _eventBridge, _date,
}) => {
  logger.info(`Attempting to publish page of events to ${eventBusName} for ${eventSource}`);
  logger.info(`Received ${events.length} events`);
  logger.debug('Events for publish:');
  logger.debug(JSON.stringify(events));

  if (events.length <= 0) {
    logger.info('No events passed to event page publisher for publish');
    logger.info('Finished publishing 0 events');
    return;
  }

  const eventsFormattedIntoEventEnvelope = events.map((event) => ({
    Detail: JSON.stringify(event),
    DetailType: event.type,
    EventBusName: eventBusName,
    Source: eventSource,
    Time: new _date(),
  }));

  const params = {
    Entries: eventsFormattedIntoEventEnvelope,
  };

  await _eventBridge.putEvents(params).promise();
  logger.info(`Published page of events to ${eventBusName} successfully`);
};

const publishEvents = async ({
  events, eventBusName = CHAT_EVENT_BUS_NAME, eventSource = defaultEventSource, _eventBridge = eventBridge, _date = Date,
}) => {
  try {
    logger.info(`Attempting to publish events to ${eventBusName} for ${eventSource}`);
    logger.info(`Received ${events.length} events`);
    logger.debug('Events for publish:');
    logger.debug(JSON.stringify(events));

    if (events.length <= 0) {
      logger.info('No events passed to event publisher for publish');
      logger.info('Finished publishing 0 events');
      return;
    }

    const eventPages = events.reduce((accumulator, event) => {
      const currentPageIndex = accumulator.length === 0 ? 0 : accumulator.length - 1;
      const currentPageSize = accumulator[currentPageIndex].length;

      if (currentPageSize >= eventPageLimit) {
        accumulator.push([event]);
      } else {
        accumulator[currentPageIndex].push(event);
      }
      return accumulator;
    }, [[]]);

    logger.info(`Attempting to publish ${eventPages.length} eventPages `);

    const eventPublishPromises = eventPages.map(async (eventPage) => {
      await publishPageOfEvents({
        events: eventPage, eventBusName, eventSource, _eventBridge, _date,
      });
    });

    await Promise.all(eventPublishPromises);

    logger.info(`Published all Events to ${eventBusName} successfully`);
  } catch (error) {
    logger.error('Failed to publish events!');
    logger.error(error.message);
    logger.error(error.stack);
    throw new ExecutionFailedError('Failed to publish events');
  }
};

export default publishEvents;
