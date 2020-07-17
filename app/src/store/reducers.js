
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
        important: false,
        timeStamp: Date.now() // Время создания заметки
    }
    
    copyNotesArr.unshift(newNote)
    copyNotes.notes = copyNotesArr
    copyState.notes = copyNotes
    
    return copyState
}

export function changeNoteImportantStatus(state, action) {
    const copyState = {...state}
    const copyNotes = {...copyState.notes}
    const copyNotesArr = [...copyNotes.notes]
    
    const noteIdx =  copyNotesArr.findIndex(note => note.timeStamp === action.timeStamp)
    copyNotesArr[noteIdx].important = !copyNotesArr[noteIdx].important
    
    copyNotes.notes = copyNotesArr
    copyState.notes = copyNotes
    
    return copyState
}

export function deleteNote(state, action) {
    const copyState = {...state}
    const copyNotes = {...copyState.notes}
    
    // Создам новый массив через фильтрацию существующего массива заметок
    copyNotes.notes = copyNotes.notes
        .filter(note => note.timeStamp !== action.timeStamp)
    
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