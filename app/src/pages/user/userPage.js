import React from 'react'
import Header from "../../components/header";
import s from './css/userPage.scss'
import DataForm from "./components/dataForm";
import EmailForm from "./components/emailForm";
import PasswordChangingForm from "./components/passwordChangingForm";
import AccountRemovingForm from "./components/accountRemovingForm";

function UserPage() {
    
    return <>
        <Header text='Your account' />
        
        <div className={s.grid}>
            <div>
                <section className={s.formSection}>
                    <Header text="User's data" tag='h3' type='h3' />
                    <DataForm />
                </section>
                <section className={s.formSection}>
                    <Header text="Email" tag='h3' type='h3' />
                    <EmailForm />
                </section>
            </div>
            <div>
                <section className={s.formSection}>
                    <Header text="Password changing" tag='h3' type='h3' />
                    <PasswordChangingForm />
                </section>
            </div>
            <div>
                <section className={s.formSection}>
                    <Header text="Account removing" tag='h3' type='h3' />
                    <AccountRemovingForm />
                </section>
            </div>
        </div>
    </>
}

export default UserPage