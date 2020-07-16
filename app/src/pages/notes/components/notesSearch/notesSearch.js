import React from 'react';
import {createForm, onSubmitHandler} from "./js/resources";
import {Formik} from "formik";

function NotesSearch() {
    
    const getValues = () => {}
    
    return (
        <Formik
            initialValues={{search: ''}}
            /*validationSchema={validationSchema}*/
            onSubmit={(values) => onSubmitHandler(values, setServerErr, setNotification, dispatch)}
        >
            { formik => createForm(formik, getValues) }
        </Formik>
    )
}

export default NotesSearch;





