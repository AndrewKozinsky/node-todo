
export function setUser(name, email) {
    return {
        type: 'SET_USER',
        name,
        email
    }
}

export function setAuthTokenStatus(status) {
    return {
        type: 'SET_AUTH_TOKEN_STATUS',
        status
    }
}

export function addNote(text) {
    return {
        type: 'ADD_NOTE',
        text
    }
}