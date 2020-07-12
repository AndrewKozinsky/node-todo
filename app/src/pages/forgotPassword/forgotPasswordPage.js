import React from 'react'
import TopNavigation from "../../components/topNavEntrance";
import AuthSplitContainer from "../../components/containers/authSplitContainer";
import ForgotPasswordForm from "./components/forgotPasswordForm";

function ForgotPasswordPage() {
    return (
        <>
            <TopNavigation />
            <AuthSplitContainer>
                <ForgotPasswordForm />
            </AuthSplitContainer>
        </>
    )
}

export default ForgotPasswordPage