import { logger, errors } from '../../../infrastructure/configuration';

const { ValidationConstraintError } = errors;

// Handles the teams.teamMembershipDeletedEvent
const teamMembershipDeletedEventName = 'teams.teamMembershipDeletedEvent';

export const handler = async (event) => {
  logger.info('handleTeamMembershipDeletedEvent adapter invoked');
  logger.info('with event:');
  logger.info({
    structuredLogKeyName: 'handleTeamMembershipDeletedEventInput',
    event,
  });

  const { detail, 'detail-type': detailType } = event;

  logger.info(`invoked with event type:${detailType}`);
  if (detailType !== teamMembershipDeletedEventName) {
    throw new ValidationConstraintError('Invoked with an invalid event type');
  }

  logger.info('handleTeamMembershipDeletedEvent completed successfully');
  return {};
};

export default handler;
