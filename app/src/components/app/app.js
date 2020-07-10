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

import MainPage from "../../pages/main/mainPage"
import RegPage from "../../pages/reg/regPage"
import EnterPage from "../../pages/enter/enterPage"
import PasswordResetPage from "../../pages/passwordReset/passwordResetPage"
import ChangePasswordPage from "../../pages/changePassword/changePasswordPage"
import NotesPage from "../../pages/notes/notesPage"
import UserPage from "../../pages/user/userPage"



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
        </Router>
    )
}


export default App