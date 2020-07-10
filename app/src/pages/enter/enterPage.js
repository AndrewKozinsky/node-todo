import React from 'react'
import TopNavigation from "../../components/topNavEntrance";
import AuthSplitContainer from "../../components/containers/authSplitContainer";
import EnterForm from "./components/enterForm";


function EnterPage() {
    return (
        <>
            <TopNavigation />
            <AuthSplitContainer>
                <EnterForm />
            </AuthSplitContainer>
        </>
    )
}

export default EnterPage