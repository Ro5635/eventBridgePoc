import './App.css';
import Button from '@material-ui/core/Button';
import {
    sendTeamMembershipCreatedEvent,
    sendTeamMembershipDeletedEvent,
    sendUserCreatedEvent,
    sendUserDeletedEvent,
} from './services/chat_service/chat_service';
import eventBridgeEventFlowImage from '../src/images/eventBridgeEventFlow.png';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h2>🥸 Fake Event Dashboard 🥸</h2>
      </header>
        <section>
            <article style={instructionsContainer}>
                <p>
                    This dashboard allows you to fake publish events directly to the chatService incoming events SQS Queue. The idea is that in the real world these would be subscriptions to SNS topics from other domains/services.

                </p>
                <em>
                    Note, this is all within the context of this POC, no real services/accounts/stacks are implicated in any actions here 😉
                </em>
            </article>
            <article>
                <img style={imageDiagramStyle} src={eventBridgeEventFlowImage}/>
            </article>
        </section>
        <section style={servicesContainer}>
            <article style={serviceContainer}>
                <div>
                    <h3>Teams Service</h3>
                    <p>
                        Fake publishing events from the teams service, publishes directly to chat-events SQS Queue.
                    </p>
                </div>
                <div style={serviceContainer_btnGroup}>
                    <Button onClick={sendTeamMembershipCreatedEvent} variant="contained">teams.teamMembershipCreatedEvent</Button>
                    <Button onClick={sendTeamMembershipDeletedEvent} variant="contained">teams.teamMembershipDeletedEvent</Button>
                </div>
            </article>
            <article style={serviceContainer}>
                <div>
                    <h3>Users Service</h3>
                    <p>
                        Fake publishing events from the teams service, publishes directly to chat-events SQS Queue.
                    </p>
                </div>
                <div style={serviceContainer_btnGroup}>
                    <Button onClick={sendUserCreatedEvent} variant="contained">users.userCreatedEvent</Button>
                    <Button onClick={sendUserDeletedEvent} variant="contained">users.userDeletedEvent</Button>
                </div>
            </article>

        </section>
    </div>
  );
}

// These styles fall apart on mobile 😅 Don't use mobile pls.

const servicesContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '25px',
    minHeight: '300px',
    maxWidth: '80vw',
    margin: 'auto',
}

const serviceContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '25px',
}

const serviceContainer_btnGroup = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '50%',
}

const instructionsContainer = {
    padding: '25px',
    maxWidth: '1000px',
    margin: 'auto',
}

const imageDiagramStyle = {
    maxWidth: '60%',
}

export default App;
