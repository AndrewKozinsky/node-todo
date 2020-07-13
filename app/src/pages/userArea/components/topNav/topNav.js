import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useRouteMatch} from "react-router-dom"
import Button from "../../../../components/formElements/button";
import s from './css/topNavigation.scss'
import browserConfig from "../../../../browserConfig";
import {setAuthTokenStatus} from "../../../../store/actions";

// Компонент верхней навигации
function TopNav() {
    const dispatch = useDispatch()
    
    // Получу имя пользователя
    const {name} = useSelector(state => state.user)

    return (
        <nav className={s.wrapper}>
            <SavedStatus />
            <TopNavLink tag='a' to='/notes' label='Notes' sign='notes' i='1' />
            <TopNavLink tag='a' to='/user' label={name} sign='person' i='2' />
            <TopNavLink to='/enter' label='Log out' sign='exit' onClick={() => logOut(dispatch)} i='3' />
        </nav>
    )
}

// Компонент подписи про статус сохранения
function SavedStatus() {
    
    // Статус сохранены ли заметки или еще нет
    const {areNotesSaved} = useSelector(state => state.notes)
    
    // Если я нахожусь не на странице /notes, то компонент ничего не возвращает
    let match = useRouteMatch('/notes');
    if(!match) return null
    
    // В зависимости от статуса сделаю различные классы
    let cls = s.saveStatus + ' '
    cls += areNotesSaved ? s.notesSaved : s.notesAreSaving
    
    // В зависимости от статуса будет разный текст
    const text = areNotesSaved ? 'All changes were saved' : 'Notes are saving now'
    
    return <p className={cls}>{text}</p>
}

// Кнопка навигации
function TopNavLink({ tag, to, label, sign, onClick, i }) {
    let match = useRouteMatch(to);
    
    const attrs = {
        tag,
        href: to,
        text: label,
        sign,
        onClick,
        i
    }
    
    if(!match) attrs.mode1 = true
    
    return <Button {...attrs} />
}

// Обработчик щелчка по кнопке выхода пользователя из учётной записи
function logOut(dispatch) {
    // Если нахожусь в режиме разработки, то...
    if(browserConfig.isDevelopment) {
        // Убрать из localStorage токен авторизации
        localStorage.removeItem('authToken')
    
        // Поставить статус токена в 1 чтобы показать, что токен отсутствует
        // и программа автоматически переадресует приложение на страницу ввода почты и пароля.
        dispatch(setAuthTokenStatus(1))
        
        return
    }
    
    // Нахожусь в режиме публикации. Поэтому нужно удалить куку с токеном авторизации.
    // Для этого сделаю запрос на API...
    
    // По какому адресу буду делать запрос на получение данных пользователя
    const apiUrl = browserConfig.serverOrigin + '/api/v1/users/logout'
    
    // Сделаю запрос на сервер и полученные данные помещу в serverRes
    const serverRes = fetch(apiUrl, { method: 'GET' })
        .catch(err => console.log(err))
    
    dispatch(setAuthTokenStatus(1))
}


export default TopNav