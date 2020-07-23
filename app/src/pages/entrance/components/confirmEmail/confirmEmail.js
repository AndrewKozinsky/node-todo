import React, {useEffect, useState} from 'react'
import {Redirect, useParams} from "react-router-dom"
import {confirmEmail} from "./js/resources"


function ConfirmEmail() {
    
    let { confirmEmailToken } = useParams();
    
    const [needToGoToEnterPage, setNeedToGoToEnterPage] = useState(false)

    useEffect(() => {
        confirmEmail(confirmEmailToken)
            .then(requestStatus => {
                // alert(55)
                
                setTimeout(() => {
                    if(requestStatus) setNeedToGoToEnterPage(true)
                }, 20000)
            })
    }, [])
    
    // if(needToGoToEnterPage) return <Redirect to='/notes' />
    
        
    return <p>Your email or wasn't registered or is registered. Please try again or use another email.</p>
}

export default ConfirmEmail;