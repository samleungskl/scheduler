import React from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Error from './Error';
import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // this function is to save appointments to database
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //transition into the saving screen while waiting api response
    transition(SAVING)

    //props.bookInterview is originated from Hooks/useApplicationData
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  // this function is to delete appointments from database
  function deleteAppoinment(id) {
    //transition into the deleting screen while waiting api response
    transition(DELETING, true)
    
    //props.cancelInterview is originated from Hooks/useApplicationData
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })

  }

  //trasition to a confirm screen when user is deleting an item
  function confirmDelete() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmDelete}onEdit={() => { transition(EDIT) }}/>)}
      {mode === CREATE && (<Form student="" interviewer="" interviewers={props.interviewers} onSave={save} onCancel={back}/>)}
      {mode === EDIT && (<Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back}/>)}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Delete this appoinement?" onCancel={back} appointmentID={props.id} onConfirm={deleteAppoinment} />}
      {mode === ERROR_DELETE && <Error message="ERROR WHEN DELETING" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="ERROR WHEN SAVING" onClose={back} />}
    </article>
  )
}