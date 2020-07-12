import React from 'react'
import TopNavigation from "../../components/topNavEntrance";
import AuthSplitContainer from "../../components/containers/authSplitContainer";
import ResetPasswordForm from "./components/resetPasswordForm";
import {useDispatch, useSelector} from "react-redux";
import {checkToken} from "../main/js/checkToken";
import {setAuthTokenStatus} from "../../store/actions";
import {Redirect} from "react-router-dom";


function ResetPasswordPage() {
    const dispatch = useDispatch()
    
    // Получу статус токена авторизации
    const {authTokenStatus} = useSelector(state => state.user)
    
    // Если authTokenStatus равен нулю, то не понятно есть ли в браузере токен и верен ли он. Поэтому проверю.
    if(authTokenStatus === 0) {
        checkToken().then((status) => {
            dispatch( setAuthTokenStatus(status) )
        })
    }
    
    // Если токен действителен или в Хранилище есть имя пользователя, то сделать переадресацию на страницу заметок.
    if(authTokenStatus === 2) return <Redirect to='/notes'/>
    
    return (
        <>
            <TopNavigation />
            <AuthSplitContainer>
                <ResetPasswordForm />
            </AuthSplitContainer>
        </>
    )
}

export default ResetPasswordPage