import React from 'react';
import {createForm} from "./js/resources";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {setSearchStr} from "../../../../store/actions";


function NotesSearch() {
    
    const dispatch = useDispatch()
    
    const getValues = (e) => {
        const inputValue = e.target.value
        
        dispatch(setSearchStr(inputValue))
    }
    
    return (
        <Formik
            initialValues={{search: ''}}
            onSubmit={() => {
            
            }}
        >
            { formik => createForm(formik, getValues) }
        </Formik>
    )
}

export default NotesSearch;





