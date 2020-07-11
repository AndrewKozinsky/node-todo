import React from "react";
import s from './css/notification.scss'


function Notification({children}) {
    return <p className={s.wrapper}>
        {children}
    </p>
}

export default Notification