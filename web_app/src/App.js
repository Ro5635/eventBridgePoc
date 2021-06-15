import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {
    sendTeamMembershipCreatedEvent,
    sendTeamMembershipDeletedEvent,
    sendUserCreatedEvent,
    sendUserDeletedEvent,
} from './services/chat_service/chat_service';
import eventBridgeEventFlowImage from '../src/images/eventBridgeEventFlow.png';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


function App() {
    const classes = useStyles();
    const [openToast, setToastOpen] = React.useState(false);
    const wrapCallWithToast = async (call) => {
        // This is not how things should be done in React
        await call();
        setToastOpen(true);
    }
    const closeSubmittedEventToast = () => {
        setToastOpen(false);
    }

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
                <img style={imageDiagramStyle} src={eventBridgeEventFlowImage} alt={"basic service architecture diagram"}/>
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
                    <Button onClick={() => {wrapCallWithToast(sendTeamMembershipCreatedEvent)}} variant="contained">teams.teamMembershipCreatedEvent</Button>
                    <Button onClick={() => {wrapCallWithToast(sendTeamMembershipDeletedEvent)}} variant="contained">teams.teamMembershipDeletedEvent</Button>
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
                    <Button onClick={() => {wrapCallWithToast(sendUserCreatedEvent)}} variant="contained">users.userCreatedEvent</Button>
                    <Button onClick={() => {wrapCallWithToast(sendUserDeletedEvent)}} variant="contained">users.userDeletedEvent</Button>
                </div>
            </article>

        </section>

        {/* Imagine this being in a component*/}
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={openToast}
            autoHideDuration={2000}
            onClose={closeSubmittedEventToast}
            message="Event Sent To chat-events SQS Queue 🥳"
        />
    </div>
  );
};

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
