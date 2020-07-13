import React, {useState} from 'react';
import Button from "../../../../components/formElements/button";
import {deleteAccount} from './js/resources'
import {useDispatch} from "react-redux";


const AccountRemoving = () => {
    const dispatch = useDispatch()
    
    // Сообщение об ошибке с сервера
    let [serverErr, setServerErr] = useState(null)
    
    // Уведомление
    const [notification, setNotification] = useState(null)
    
    return <>
        <Button text='Delete account' onClick={() => deleteAccount(setServerErr, setNotification, dispatch)} />
        {serverErr}
    </>
}

export default AccountRemoving;