
export function setUser(state, action) {
    const copyState = {...state}
    const copyUser = {...copyState.user}
    
    copyUser.name = action.name
    copyUser.email = action.email
    
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