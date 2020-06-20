import React from 'react'
import './css/reset.css'
import './css/general.scss'
import s from './css/app.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import IndexPage from "../../pages/index"
import RegPage from "../../pages/reg"
import EnterPage from "../../pages/enter"
import PasswordResetPage from "../../pages/passwordReset"
import ChangePasswordPage from "../../pages/changePassword"
import NotesPage from "../../pages/notes"
import UserPage from "../../pages/user"



const App = () => {

    return (
        <Router>
            <div className={s.app}>
                <div className={s.wrapper_1}>
                    <Link to='/'>Main</Link>
                    <Link to='/reg'>Registration</Link>
                    <Link to='/enter'>Enter</Link>
                    <Link to='/password-reset'>Password reset</Link>
                    <Link to='/change-password'>Change password</Link>
                    <Link to='/notes'>Notes</Link>
                    <Link to='/user'>User</Link>
                    
                    <hr />
                    
                    <Switch>
                        <Route path='/' exact>
                            <IndexPage />
                        </Route>
                        <Route path='/reg'>
                            <RegPage />
                        </Route>
                        <Route path='/enter'>
                            <EnterPage />
                        </Route>
                        <Route path='/password-reset'>
                            <PasswordResetPage />
                        </Route>
                        <Route path='/change-password'>
                            <ChangePasswordPage />
                        </Route>
                        <Route path='/notes'>
                            <NotesPage />
                        </Route>
                        <Route path='/user'>
                            <UserPage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}


export default App