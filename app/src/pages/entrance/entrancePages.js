import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom'
import TopNavigation from "./components/topNavEntrance";
import AuthSplitContainer from "./components/authSplitContainer";
import {checkToken} from "./js/checkToken";
import {setAuthTokenStatus} from "../../store/actions";
import RegForm from "./components/regForm";
import EnterForm from "./components/enterForm";
import ForgotPasswordForm from "./components/forgotPasswordForm";
import ResetPasswordForm from "./components/resetPasswordForm";


const EntrancePages = () => {
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
                <Switch>
                    <Route path='/reg'>
                        <RegForm />
                    </Route>
                    <Route path='/enter'>
                        <EnterForm />
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgotPasswordForm />
                    </Route>
                    <Route path='/reset-password/:token'>
                        <ResetPasswordForm />
                    </Route>
                </Switch>
            </AuthSplitContainer>
        
        </>
    );
};

export default EntrancePages;