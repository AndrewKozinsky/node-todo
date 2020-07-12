import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Redirect, useRouteMatch} from "react-router-dom"
import Button from "../../../../components/formElements/button";
import s from './css/topNavigation.scss'
import browserConfig from "../../../../browserConfig";
import {setAuthTokenStatus} from "../../../../store/actions";


function TopNav() {
    const dispatch = useDispatch()
    
    const {user} = useSelector(state => state)
    
    function logOutHandler() {
        logOut(dispatch)
    }
    
    return (
        <nav className={s.wrapper}>
            <TopNavLink tag='a' to='/notes' label='Notes' sign='notes' i='1' />
            <TopNavLink tag='a' to='/user' label={user.name} sign='person' i='2' />
            <TopNavLink to='/enter' label='Log out' sign='exit' onClick={logOutHandler} i='3' />
        </nav>
    )
}


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


async function logOut(dispatch) {
    if(browserConfig.isDevelopment) {
        localStorage.removeItem('authToken')
    
        dispatch(setAuthTokenStatus(1))
        
        return
    }
    
    // По какому адресу буду делать запрос на получение данных пользователя
    const {serverOrigin, isDevelopment} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/users/logout'
    
    // Параметры запроса
    const options = { method: 'GET' }
    
    // Сделаю запрос на сервер и полученные данные помещу в serverRes
    const serverRes = await fetch(apiUrl, options)
        .catch(err => console.log(err))
    
    dispatch(setAuthTokenStatus(1))
}

export default TopNav