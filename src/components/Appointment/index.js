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
  //console.log('appointment props->', props)
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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(()=>{
        transition(ERROR_SAVE, true)
      })
  }
  //console.log('apt id to be deleted', props.id)
  function deleteAppoinment(id) {
    transition(DELETING, true)
    props.cancelInterview(id)
      .then(() => {
        //console.log(`Interview ${id} deleted`)
        transition(EMPTY)
      })
      .catch(()=>{
        transition(ERROR_DELETE, true)
      })

  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  //console.log('props from index.js', props)
  console.log('current id', props.id, '-mode',mode)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={() => { transition(EDIT) }}
        />
      )}
      {mode === CREATE && (
        <Form student="" interviewer="" interviewers={props.interviewers} onSave={save} onCancel={() => back(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => back(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Delete this appoinement?" onCancel={() => back(SHOW)} appointmentID={props.id} onConfirm={deleteAppoinment} />}
      {mode === ERROR_DELETE && <Error message="ERROR WHEN DELETING" onClose={() => back()}/>}
      {mode === ERROR_SAVE && <Error message="ERROR WHEN SAVING" onClose={() => back()}/>}
    </article>
  )
}