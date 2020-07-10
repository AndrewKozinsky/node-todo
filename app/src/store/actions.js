
export function setUser(name, email) {
    return {
        type: 'SET_USER',
        name,
        email
    }
}

export function addNote(text) {
    return {
        type: 'ADD_NOTE',
        text
    }
}