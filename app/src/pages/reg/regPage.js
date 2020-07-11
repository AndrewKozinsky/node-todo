import React from 'react'
import TopNavigation from "../../components/topNavEntrance";
import AuthSplitContainer from "../../components/containers/authSplitContainer";
import RegForm from "./components/regForm";



function RegPage() {
    return (
        <>
            <TopNavigation />
            <AuthSplitContainer>
                <RegForm />
            </AuthSplitContainer>
        </>
    )
}

export default RegPage