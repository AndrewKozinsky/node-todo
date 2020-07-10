import {createStore} from "redux";
import {
    setUser,
    addNote
} from './reducers'


const inicialState = {
    user: {
        name: null,
        email: null,
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
        case 'ADD_NOTE':
            return addNote(state, action)
        default:
            return state
    }
}

export default createStore(reducer)