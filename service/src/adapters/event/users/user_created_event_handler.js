import { logger, errors } from '../../../infrastructure/configuration';

const { ValidationConstraintError } = errors;

const userCreatedEventName = 'users.userCreatedEvent';

// Handles the users.userCreatedEvent
export const handler = async (event) => {
  logger.info('handleUserCreatedEvent adapter invoked');
  logger.info('with event:');
  logger.info({
    structuredLogKeyName: 'handleUserCreatedEventInput',
    event,
  });

  const { detail, 'detail-type': detailType } = event;

  logger.info(`invoked with event type:${detailType}`);
  if (detailType !== userCreatedEventName) {
    throw new ValidationConstraintError('Invoked with an invalid event type');
  }

  logger.info('handleUserCreatedEvent completed successfully');
  return {};
};

export default handler;
