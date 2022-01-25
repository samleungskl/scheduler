import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  //console.log('setInterviewer->->', setInterviewer)
  //console.log('valueeee->>>>>',value)
  const results = interviewers.map((person) =>
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === value}
      setInterviewer={()=>onChange(person.id)}
    />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {results}
      </ul>
    </section>
  )
}