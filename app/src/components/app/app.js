import React, {useEffect} from 'react'
import './css/reset.css'
import './css/general.scss'
import s from './css/app.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import MainPage from "../../pages/main"
import RegPage from "../../pages/reg"
import EnterPage from "../../pages/enter"
import ForgotPasswordPage from "../../pages/forgotPassword"
import ResetPasswordPage from "../../pages/resetPassword"
import NotesPage from "../../pages/notes"
import UserPage from "../../pages/user"



const App = () => {
    
    

    return (
        <Router>
            <div className={s.app}>
                {/*<Link to='/'>Main</Link>
                <Link to='/reg'>Registration</Link>
                <Link to='/enter'>Enter</Link>
                <Link to='/password-reset'>Password reset</Link>
                <Link to='/change-password'>Change password</Link>
                <Link to='/notes'>Notes</Link>
                <Link to='/user'>User</Link>*/}
                
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
                    <Route path='/notes'>
                        <NotesPage />
                    </Route>
                    <Route path='/user'>
                        <UserPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


export default App