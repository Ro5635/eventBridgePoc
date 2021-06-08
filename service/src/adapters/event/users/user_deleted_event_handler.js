import { logger, errors } from '../../../infrastructure/configuration';

const { ValidationConstraintError } = errors;

const userDeletedEventName = 'users.userDeletedEvent';

// Handles the users.userDeletedEvent
export const handler = async (event) => {
  logger.info('handleUserDeletedEvent adapter invoked');
  logger.info('with event:');
  logger.info({
    structuredLogKeyName: 'handleUserDeletedEventInput',
    event,
  });

  const { detail, 'detail-type': detailType } = event;

  logger.info(`invoked with event type:${detailType}`);
  if (detailType !== userDeletedEventName) {
    throw new ValidationConstraintError('Invoked with an invalid event type');
  }

  logger.info('handleUserDeletedEvent completed successfully');
  return {};
};

export default handler;
