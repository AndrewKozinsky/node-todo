
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

export function addAllNote(state, action) {
    const copyState = {...state}
    const copyNotes = {...copyState.notes}
    
    copyNotes.notes = action.notesArr
    
    copyState.notes = copyNotes
    return copyState
}

export function addNote(state, action) {
    const copyState = {...state}
    const copyNotes = {...copyState.notes}
    const copyNotesArr = [...copyNotes.notes]
    
    const newNote = {
        text: action.text,
        important: false
    }
    
    copyNotesArr.unshift(newNote)
    copyNotes.notes = copyNotesArr
    copyState.notes = copyNotes
    
    return copyState
}

export function changesNotesSaveStatus(state, action) {
    const copyState = {...state}
    const copyNotes = {...copyState.notes}
    
    copyNotes.areNotesSaved = action.areNotesSaved
    
    copyState.notes = copyNotes
    
    return copyState
}