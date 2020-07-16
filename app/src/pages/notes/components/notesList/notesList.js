import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getNotesFromServer} from './js/resources'
import {addAllNotes} from '../../../../store/actions'
import s from './css/notesList.scss'


function NotesList() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        getNotesFromServer()
            .then(notes => {
                dispatch(addAllNotes(notes))
            })
    }, [])
    
    const notesArr = useSelector(state => state.notes.notes)
    
    if(!notesArr.length) {
        return <p className={s.notification}>You don't have any notes. Write the first one!</p>
    }
    
    return notesArr.map((noteObj, i) => {
        return (
            <div className={s.noteWrapper} key={i}>
                <NoteText noteObj={noteObj} />
                <NoteButtons noteObj={noteObj} />
            </div>
        );
    })
}


function NoteText({noteObj}) {

    // Классы текста
    let textCls = s.text
    if(noteObj.important) textCls += ' ' + s.textImportant
    
    return <p className={textCls}>
        {noteObj.text}
    </p>
}


function NoteButtons({noteObj}) {
    
    // Классы выделяющей кнопки
    let importantBtnCls = s.button + ' '
    importantBtnCls += !noteObj.important
        ? s.importantBtn : s.importantBtnOn
    
    let importantBtn = <button className={importantBtnCls} />
    
    
    // Классы удаляющей кнопки
    let deleteBtnCls = s.button + ' ' + s.deleteBtn
    
    const deleteBtn = <button className={deleteBtnCls} />
    
    
    return (
        <div className={s.buttons}>
            {importantBtn}
            {deleteBtn}
        </div>
    )
}

export default NotesList