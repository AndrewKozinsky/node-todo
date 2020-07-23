import React from 'react'
// import './css/reset.css'
// import './css/general.scss'
// import s from './css/app.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import MainPage from "../../pages/main"
import UserAreaPages from "../../pages/userArea";
import EntrancePages from "../../pages/entrance";
import PageNotFound from "../../pages/pageNotFound";
import ConfirmEmailPage from "../../pages/confirmEmail";


const App = () => {
    
    
    const s = new Proxy({}, {
        get(target, prop) {
            const num = Math.random()
            return 's' + num
        }
    })
    
    return (
        <Router>
            <div className={s.app}>
                <Switch>
                    <Route path='/' exact>
                        <MainPage />
                    </Route>
                    <Route path='/(reg|enter|forgot-password)'>
                        <EntrancePages />
                    </Route>
                    <Route path='/reset-password/:token'>
                        <EntrancePages />
                    </Route>
                    <Route path='/confirm-email/:confirmEmailToken'>
                        <ConfirmEmailPage />
                    </Route>
                    <Route path='/(notes|user)'>
                        <UserAreaPages />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


export default App
