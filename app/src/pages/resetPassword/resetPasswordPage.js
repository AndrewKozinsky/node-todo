import React from 'react'
import TopNavigation from "../../components/topNavEntrance";
import AuthSplitContainer from "../../components/containers/authSplitContainer";
import ResetPasswordForm from "./components/resetPasswordForm";


function ResetPasswordPage() {
    return (
        <>
            <TopNavigation />
            <AuthSplitContainer>
                <ResetPasswordForm />
            </AuthSplitContainer>
        </>
    )
}

export default ResetPasswordPage