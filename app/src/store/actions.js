
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

export function addAllNotes(notesArr) {
    return {
        type: 'ADD_ALL_NOTES',
        notesArr
    }
}

export function addDisplayedNotes(notesArr) {
    return {
        type: 'ADD_DISPLAYED_NOTES',
        notesArr
    }
}

export function addNote(text) {
    return {
        type: 'ADD_NOTE',
        text
    }
}

export function changeNoteImportantStatus(timeStamp) {
    return {
        type: 'CHANGE_NOTE_IMPORTANT_STATUS',
        timeStamp,
    }
}

export function deleteNote(timeStamp) {
    return {
        type: 'DELETE_NOTE',
        timeStamp
    }
}

export function setNotesCurrentPage(pageNum) {
    return {
        type: 'SET_NOTES_CURRENT_PAGE',
        pageNum
    }
}

export function changesNotesSaveStatus(areNotesSaved) {
    return {
        type: 'CHANGE_NOTES_SAVE_STATUS',
        areNotesSaved
    }
}