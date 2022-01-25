export function getAppointmentsForDay(state, day) {
  //console.log('state begining ', state)
  const filteredDay = state.days.filter(aptday => aptday.name === day);
  //console.log('filteredDay', filteredDay)
  const AppoinmentsOfTheDay = filteredDay.length === 0 ? [] : filteredDay[0]['appointments'];
  const allAppointments = state.appointments
  //console.log('day => ', day)
  //console.log('allAppointments =>', allAppointments)
  //console.log('AppoinmentsOfTheDay => ', AppoinmentsOfTheDay)

  const resultAppointmentsArray = []
  for (const appoinment of AppoinmentsOfTheDay) {
    //console.log('appoinment = >', appoinment)
    resultAppointmentsArray.push(allAppointments[appoinment])
  }
  //console.log('resultAppointmentsArray', resultAppointmentsArray)
  //console.log('state end', state)
  return resultAppointmentsArray;
}

export function getInterview(state, interview) {
  //console.log('state@here is', state)
  //console.log('interview@here is', interview)
  if (interview) {
    const interviewerList = state.interviewers;
    const interviewerID = interview.interviewer;
    //console.log('interviewerID->>>>>>', interviewerID)
    const newInterview = {...interview}
    newInterview.interviewer = interviewerList[interviewerID]
    return newInterview;
  } else {
    return null
  }

}

export function getInterviewersForDay(state, day) {
  //console.log('state begining ', state)
  const filteredDay = state.days.filter(singleDay => singleDay.name === day);
  //console.log('filteredDay', filteredDay)
  const interviewersOfTheDay = filteredDay.length === 0 ? [] : filteredDay[0]['interviewers'];
  const allInterviewers = state.interviewers
  //console.log('day => ', day)
  //console.log('allAppointments =>', allAppointments)
  //console.log('AppoinmentsOfTheDay => ', AppoinmentsOfTheDay)

  const resultInterviewersArray = []
  for (const interviewer of interviewersOfTheDay) {
    //console.log('appoinment = >', appoinment)
    resultInterviewersArray.push(allInterviewers[interviewer])
  }
  //console.log('resultAppointmentsArray', resultAppointmentsArray)
  //console.log('state end', state)
  return resultInterviewersArray;
}