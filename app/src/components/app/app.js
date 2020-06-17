import React from 'react';
import logoImg from './img/logo.png'


const App = () => {
    
    return(
        <>
            <h1>{logoImg}</h1>
            <img src={logoImg} alt='logo' />
        </>
    )
}


export default App