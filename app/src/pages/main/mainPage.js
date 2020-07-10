import React from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";


function MainPage() {
    
    // Получу имя пользователя
    const {name} = useSelector(store => store.user)
    
    // Если имени нет, то пользователь еще не вошёл, перенаправить на страницу входа
    if(!name) {
        return <Redirect to='/enter' />
        
    }
    
    // Если имя есть, значит пользователь вошёл. Перенаправить на страницу заметок
    return <Redirect to='/notes' />
    // return 'IndexPage'
}

export default MainPage