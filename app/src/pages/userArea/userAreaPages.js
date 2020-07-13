import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Switch, Route, Redirect} from 'react-router-dom'
import NotesPage from "../../pages/notes"
import UserPage from "../../pages/user"
import {checkToken} from "../entrance/js/checkToken";
import {setAuthTokenStatus} from "../../store/actions";
import {setUserDataToStore} from "./js/resources";
import Spinner from "../../components/various/spinner";
import TopNav from "./components/topNav";

function UserAreaPages() {
    const dispatch = useDispatch()
    
    // Получу имя пользователя и статус токена авторизации
    const {name, authTokenStatus} = useSelector(state => state.user)
    
    // Если authTokenStatus равен нулю, то не понятно есть ли в браузере токен и верен ли он. Поэтому проверю.
    if(authTokenStatus === 0) {
        checkToken().then((tokenStatus) => {
            dispatch( setAuthTokenStatus(tokenStatus) )
        })
    }
    
    if(authTokenStatus === 1) return <Redirect to='/enter'/>
    
    // Если нет имени, то нарисовать загрузчик
    if(!name) {
        setUserDataToStore(dispatch)
        
        return <Spinner text='Downloading notes' />
    }
    
    return (
        <>
            <TopNav />
            
            <Switch>
                <Route path='/notes'>
                    <NotesPage />
                </Route>
                <Route path='/user'>
                    <UserPage />
                </Route>
            </Switch>
        </>
    )
}

export default UserAreaPages