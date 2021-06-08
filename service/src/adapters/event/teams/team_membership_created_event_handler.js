import { logger, errors } from '../../../infrastructure/configuration';

const { ValidationConstraintError } = errors;

// Handles the teams.teamMembershipCreatedEvent
const teamMembershipCreatedEventName = 'teams.teamMembershipCreatedEvent';

export const handler = async (event) => {
  logger.info('handleTeamMembershipCreatedEvent adapter invoked');
  logger.info('with event:');
  logger.info({
    structuredLogKeyName: 'handleTeamMembershipCreatedEventInput',
    event,
  });

  const { detail, 'detail-type': detailType } = event;

  logger.info(`invoked with event type:${detailType}`);
  if (detailType !== teamMembershipCreatedEventName) {
    throw new ValidationConstraintError('Invoked with an invalid event type');
  }

  logger.info('handleTeamMembershipCreatedEvent completed successfully');
  return {};
};

export default handler;
