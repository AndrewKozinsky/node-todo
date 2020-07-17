import {addNote, changesNotesSaveStatus} from "../../../../../store/actions";
import browserConfig from "../../../../../browserConfig";
import axios from "axios";


export function formSubmit(e, inputRef, dispatch) {
    // Отменить переход на другую страницу
    e.preventDefault()
    
    // Поле добавления новой заметки и её значение
    const inputEl = inputRef.current
    const inputVal = inputEl.value
    
    // Если ничего не ввели, то завершить функцию
    if(inputVal === '') return
    
    // Добавить новую заметку в Хранилище
    dispatch(addNote(inputVal))
    
    // Очистить поле добавления заметки
    inputEl.value = ''
    
    // Добавить сообщение о процессе сохранения данных
    dispatch(changesNotesSaveStatus(false))
    
    // TODO предусмотри случай когда отключен интернет
    // Проверяется так: navigator.onLine
    // Может в этом случае заметку сохранять в LocalStorage?
    
    // Добавить новую заметку на сервере
    addNewNoteAtServer(inputVal).then(() => {
        // Добавить сообщение о процессе сохранения данных
        dispatch(changesNotesSaveStatus(true))
    })
}


async function addNewNoteAtServer(noteText) {
    // По какому адресу буду делать запрос на вход пользователя
    const {serverOrigin, isDevelopment} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/myNotes'
    
    // Возьму токен из LocalStorage
    const locStrToken = localStorage.getItem('authToken')
    let headers
    if(locStrToken && isDevelopment) {
        headers = {
            'Authorization': 'Bearer ' + locStrToken,
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    
    await axios({
        method: 'post',
        headers,
        url: apiUrl,
        data: {
            text: noteText,
            timeStamp: Date.now()
        }
    })
}