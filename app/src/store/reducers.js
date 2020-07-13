
export function setUser(state, action) {
    const copyState = {...state}
    const copyUser = {...copyState.user}
    
    if(action.name) copyUser.name = action.name
    if(action.email) copyUser.email = action.email
    
    copyState.user = copyUser
    
    return copyState
}

export function setAuthTokenStatus(state, action) {
    const copyState = {...state}
    const copyUser = {...copyState.user}
    
    copyUser.authTokenStatus = action.status
    
    copyState.user = copyUser
    
    return copyState
}

export function addNote(state, action) {
    const copyState = {...state}
    const copyNotes = [...copyState.notes]
    
    const newNote = {
        text: action.text,
        important: false
    }
    
    copyNotes.unshift(newNote)
    
    copyState.notes = copyNotes
    
    return copyState
}