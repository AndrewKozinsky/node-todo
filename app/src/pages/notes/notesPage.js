import React from 'react'
import {useSelector} from "react-redux";


function NotesPage() {
    
    const user = useSelector(store => store.user)
    // console.log(user);
    
    return user.name
}

export default NotesPage