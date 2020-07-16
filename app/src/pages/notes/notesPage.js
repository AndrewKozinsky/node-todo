import React from 'react'
import s from './css/notesPage.scss'
import NotesSwitcher from "./components/notesSwitcher/notesSwitcher";
import NotesSearch from "./components/notesSearch";
import NewTaskForm from "./components/newTaskForm";
import NotesList from "./components/notesList";


function NotesPage() {
    return <div className={s.pageWrapper}>
        <div className={s.topPanel}>
            <div className={s.topPanel__left}>
                <NotesSwitcher />
            </div>
            <div className={s.topPanel__right}>
                <NotesSearch />
            </div>
        </div>
        <div className={s.newTaskWrapper}>
            <NewTaskForm />
        </div>
        <div className={s.notesListWrapper}>
            <NotesList />
        </div>
    </div>
}

export default NotesPage