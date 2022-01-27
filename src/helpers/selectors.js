export function getAppointmentsForDay(state, day) {
  // a day object accordring to day in param
  const filteredDay = state.days.filter(aptday => aptday.name === day);
  // all appointments of the day in param
  const AppoinmentsOfTheDay = filteredDay.length === 0 ? [] : filteredDay[0]['appointments'];
  const allAppointments = state.appointments;

  const resultAppointmentsArray = [];
  for (const appoinment of AppoinmentsOfTheDay) {
    resultAppointmentsArray.push(allAppointments[appoinment]);
  };

  return resultAppointmentsArray;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewerList = state.interviewers;
    const interviewerID = interview.interviewer;
    const newInterview = { ...interview };

    newInterview.interviewer = interviewerList[interviewerID];

    return newInterview;
  } else {
    return null;
  }

}

export function getInterviewersForDay(state, day) {
  // a day object accordring to day in param
  const filteredDay = state.days.filter(singleDay => singleDay.name === day);
  // all interviewers of the day in param
  const interviewersOfTheDay = filteredDay.length === 0 ? [] : filteredDay[0]['interviewers'];
  const allInterviewers = state.interviewers;

  const resultInterviewersArray = [];
  for (const interviewer of interviewersOfTheDay) {
    resultInterviewersArray.push(allInterviewers[interviewer]);
  };
  
  return resultInterviewersArray;
}