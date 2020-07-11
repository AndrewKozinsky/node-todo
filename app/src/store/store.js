import {createStore} from "redux";
import {
    setUser,
    setAuthTokenStatus,
    addNote
} from './reducers'


const inicialState = {
    user: {
        name: null,
        email: null,
        // Есть ли в браузере токен. Если 1, то не известно.
        // Если 2, то нет или он неверный. Если 3, то правильный.
        authTokenStatus: 0
    },
    notes: [
        /*{
            text: '',
            important: false
        }*/
    ]
}


function reducer(state = inicialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return setUser(state, action)
        case 'SET_AUTH_TOKEN_STATUS':
            return setAuthTokenStatus(state, action)
        case 'ADD_NOTE':
            return addNote(state, action)
        default:
            return state
    }
}

export default createStore(reducer)