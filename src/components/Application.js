import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import Button from "./Button";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { resolvePlugin } from "@babel/core";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const bookInterview = (id, interview) => {
    //console.log('id and interview!!!',id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({
          ...state,
          appointments
        });
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    //console.log('appointment', appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log('appointments', appointments)

    //console.log('id-------------------------------',id)
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        //console.log('id to be canclled : ', id)
        setState({
          ...state,
          appointments
        });
      })
  }

  //console.log('props from application.js', props)
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  //console.log('dailyAppointments', dailyAppointments)
  const interviewersArray = getInterviewersForDay(state, state.day)
  //console.log('interviewersArray', interviewersArray)
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  // useEffect(() => {
  //   axios.get(`/api/days`).then((response) => {
  //     setDays([...response.data])
  //   });
  // }, [])
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log('all[0]', all[0]); // first
      // console.log('all[1]', all[1]); // second
      // console.log('all[2]', all[2]); // third
      //console.log('all', all)
      //const [first, second, third] = all;
      //console.log('all three ', first, second, third);
      //console.log('all[0][data]', all[0]['data'])
      setState(prev => ({
        ...prev,
        days: all[0]['data'],
        appointments: all[1]['data'],
        interviewers: all[2]['data'],
      }));
    });
  }, [])
  //console.log('state.days ->>>>>>>>>', state.days)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment time="5pm"/>
      </section>
    </main>
  );
}
