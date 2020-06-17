import React from 'react'
import './css/reset.css';
import './css/app.scss';

import Button from "../formElements/button";


const App = () => {
    
    return(
        <div className='app'>
            <Button text='Войти' />
            <Button text='Войти' disabled={true} />
        </div>
    )
}


export default App