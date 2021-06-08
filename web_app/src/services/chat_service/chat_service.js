const chatAPIRootURI = 'https://u6d5wq89th.execute-api.eu-west-1.amazonaws.com/v0';

const makeRequest = async (url = "", data = {}, method = 'POST') => {
    const body = method !== 'GET' ? JSON.stringify(data) : undefined
    const optionalBody = { body };

    const response = await fetch(url, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        ...optionalBody,
    });
    if (!response.ok) {
        console.log('Caught error response from service:');
        console.log(response.status);
        console.log(response.body);
    }
    return {  rawResponse: response.body, statusCode: response.status, isSuccessResponse: response.ok };
};

const sendTeamMembershipCreatedEvent = async () => {
    const teamMembershipCreatedEvent = {
        details: {
            type: 'teams.teamMembershipCreatedEvent',
            userId: 'user_1234',
            name: 'John Appleseed',
            createdAt: Date.now(),
        }

    }

    const {
        statusCode,
        isSuccessResponse,
        rawResponse,
        response,
    } = await makeRequest(`${chatAPIRootURI}/events`,{ event: teamMembershipCreatedEvent }, 'PUT');

    if (isSuccessResponse) {
        return response;
    }

    console.log('startDataRefresh HTTP request failed');
    const errorMsg = response ? JSON.stringify(response) : `${rawResponse} with response statusCode: ${statusCode}`;
    throw new Error(errorMsg);
}

const sendTeamMembershipDeletedEvent = async () => {
    const teamMembershipDeletedEvent = {
        details: {
            type: 'teams.teamMembershipDeletedEvent',
            userId: 'user_1234',
            name: 'John Appleseed',
            createdAt: Date.now(),
        }

    }

    const {
        statusCode,
        isSuccessResponse,
        rawResponse,
        response,
    } = await makeRequest(`${chatAPIRootURI}/events`,{ event: teamMembershipDeletedEvent }, 'PUT');

    if (isSuccessResponse) {
        return response;
    }

    console.log('startDataRefresh HTTP request failed');
    const errorMsg = response ? JSON.stringify(response) : `${rawResponse} with response statusCode: ${statusCode}`;
    throw new Error(errorMsg);
}

const sendUserCreatedEvent = async () => {
    const userCreatedEvent = {
        details: {
            type: 'users.userCreatedEvent',
            userId: 'user_54321',
            name: 'John 🍔🍔🍔🍔🍔',
            createdAt: Date.now(),
        }

    }

    const {
        statusCode,
        isSuccessResponse,
        rawResponse,
        response,
    } = await makeRequest(`${chatAPIRootURI}/events`,{ event: userCreatedEvent }, 'PUT');

    if (isSuccessResponse) {
        return response;
    }

    console.log('startDataRefresh HTTP request failed');
    const errorMsg = response ? JSON.stringify(response) : `${rawResponse} with response statusCode: ${statusCode}`;
    throw new Error(errorMsg);
}

const sendUserDeletedEvent = async () => {
    const userDeletedEvent = {
        details: {
            type: 'users.userDeletedEvent',
            userId: 'user_44556',
            name: 'John 🧁🧁🧁🧁🧁',
            createdAt: Date.now(),
        }

    }

    const {
        statusCode,
        isSuccessResponse,
        rawResponse,
        response,
    } = await makeRequest(`${chatAPIRootURI}/events`,{ event: userDeletedEvent }, 'PUT');

    if (isSuccessResponse) {
        return response;
    }

    console.log('startDataRefresh HTTP request failed');
    const errorMsg = response ? JSON.stringify(response) : `${rawResponse} with response statusCode: ${statusCode}`;
    throw new Error(errorMsg);
}



export {
    sendTeamMembershipCreatedEvent,
    sendTeamMembershipDeletedEvent,
    sendUserDeletedEvent,
    sendUserCreatedEvent,
}
