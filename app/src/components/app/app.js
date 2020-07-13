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
import UserAreaPages from "../../pages/userArea";
import EntrancePages from "../../pages/entrance";


const App = () => {
    
    return (
        <Router>
            <div className={s.app}>
                <Switch>
                    <Route path='/' exact>
                        <MainPage />
                    </Route>
                    <Route path='/(reg|enter|forgot-password|reset-password/:token)'>
                        <EntrancePages />
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