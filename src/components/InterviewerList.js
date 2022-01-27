import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers } = props;
  const results = interviewers.map((person) =>
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === props.value}
      setInterviewer={()=>props.onChange(person.id)}
    />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {results}
      </ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};