import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // this function update the spots count on the sidebar
  const updateSpots = function(state, appointments) {
    const newState = JSON.parse(JSON.stringify(state)); // this is a quick solution to deep copy https://stackoverflow.com/questions/39241046/deepcopy-in-react/42018833

    // loop through the days array
    for (const day of newState.days) {
      const appointmentArray = day.appointments;
      let nullCount = 0;
      //loop through all the appoinments in a single day
      for (const appointment of appointmentArray) {
        if (!appointments[appointment]['interview']) { //appointments here is from param
          nullCount++;
        }
      }
      // update the number of spots avaiable
      day.spots = nullCount;
    }
    // return days array
    return newState.days;
  };


  // bookinterview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // update the spots number on the sidebar, and update appointments in main view
        const days = updateSpots(state, appointments)
        setState({
          ...state,
          appointments,
          days
        });
      })
  };

  //cancelInterview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // update the spots number on the sidebar, and update appointments in main view
        const days = updateSpots(state, appointments)
        setState({
          ...state,
          appointments,
          days
        });
      })
  };

  // get all the API datas we need
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0]['data'],
        appointments: all[1]['data'],
        interviewers: all[2]['data'],
      }));
    });
  }, []);

  //set day when user click on the name of the day, e.g."Monday"
  const setDay = day => setState({ ...state, day });

  return { bookInterview, cancelInterview, setDay, state };
};