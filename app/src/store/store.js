import {createStore} from "redux";
import {
    setUser,
    setAuthTokenStatus,
    addAllNote,
    addNote,
    changesNotesSaveStatus
} from './reducers'


const inicialState = {
    user: {
        name: null,
        email: null,
        // Есть ли в браузере токен. Если 1, то не известно.
        // Если 2, то нет или он неверный. Если 3, то правильный.
        authTokenStatus: 0
    },
    notes: {
        areNotesSaved: true,
        notes: [
            /*{
                id: 1,
                text: 'Сделай программу на Реакте и Ноде где задачи были бы написаны огромным шрифтом. Думаю это будет выглядеть интересно.',
                important: false
            },
            {
                id: 2,
                text: 'Может вместо видео делать текстовые статьи?',
                important: true
            }*/
        ]
    },
}


function reducer(state = inicialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return setUser(state, action)
        case 'SET_AUTH_TOKEN_STATUS':
            return setAuthTokenStatus(state, action)
        case 'ADD_ALL_NOTES':
            return addAllNote(state, action)
        case 'ADD_NOTE':
            return addNote(state, action)
        case 'CHANGE_NOTES_SAVE_STATUS':
            return changesNotesSaveStatus(state, action)
        default:
            return state
    }
}

export default createStore(reducer)