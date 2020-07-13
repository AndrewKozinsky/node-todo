import browserConfig from "../../../../../browserConfig";
import axios from "axios";
import Error from "../../../../../components/formElements/error";
import React from "react";
import {setAuthTokenStatus} from "../../../../../store/actions";
import Notification from "../../../../../components/various/notification";


export async function deleteAccount(setServerErr, setNotification, dispatch) {
    // Спросить пользователя действительно ли он хочет удалить свою учётну запись
    const confirmAnswer = confirm('Do you really want to delete your account?')
    if(!confirmAnswer) return
    
    // По какому адресу буду делать запрос на вход пользователя
    const {serverOrigin, isDevelopment} = browserConfig
    const apiUrl = serverOrigin + '/api/v1/users/me'
    
    // Возьму токен из LocalStorage
    const locStrToken = localStorage.getItem('authToken')
    let headers
    if(locStrToken && isDevelopment) {
        headers = { 'Authorization': 'Bearer ' + locStrToken }
    }
    
    let serverRes = await axios({
        method: 'delete',
        headers,
        url: apiUrl
    })
    serverRes = serverRes.data
    
    /* Если придёт ошибочный ответ, то показать ошибку.
    {
        "status": "fail",
        "error": {
        "statusCode": 401,
            "isOperational": true,
            "message": "User recently changed password! Please log in again."
        }
    }*/
    if(serverRes.status === 'fail' && serverRes.error.statusCode === 401) {
        setServerErr(
            <Error text={serverRes.error.message} indent='3' />
        )
        
    }
    
    /* В случае удачного удаления должен прийти такой объект
    {
        status: 'success',
        data: null
    }
    Но по факту приходит null. Не знаю почему.
    */
    if(serverRes.status === 'success' || !serverRes) {
        setNotification(
            <Notification topIndent='1'>Your account has been deleted.</Notification>
        )
    
        window.addEventListener('unload', () => kickUser(dispatch))
        
        setTimeout(() => {
            kickUser(dispatch)
        }, 5000)
    }
}

function kickUser(dispatch) {
    // Если нахожусь в режиме разработки, то убрать токен авторизации из LocalStorage
    // По какому адресу буду делать запрос на вход пользователя
    if(browserConfig.isDevelopment) {
        localStorage.removeItem('authToken')
    }
    
    // Поставить статус токена авторизации в 1 чтобы выкинуть пользователя.
    dispatch(setAuthTokenStatus(1))
}