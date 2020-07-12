import React from 'react'
import './css/reset.css'
import './css/general.scss'
import s from './css/app.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import MainPage from "../../pages/main"
import RegPage from "../../pages/reg"
import EnterPage from "../../pages/enter"
import ForgotPasswordPage from "../../pages/forgotPassword"
import ResetPasswordPage from "../../pages/resetPassword"
import UserAreaPages from "../../pages/userArea";


const App = () => {
    
    return (
        <Router>
            <div className={s.app}>
                <Switch>
                    <Route path='/' exact>
                        <MainPage />
                    </Route>
                    <Route path='/reg'>
                        <RegPage />
                    </Route>
                    <Route path='/enter'>
                        <EnterPage />
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgotPasswordPage />
                    </Route>
                    <Route path='/reset-password/:token'>
                        <ResetPasswordPage />
                    </Route>
                    <Route path='/(notes|user)'>
                        <UserAreaPages />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


export default App