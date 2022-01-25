import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //console.log('here----->', props)
  const { days } = props
  const results = days.map((day) =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />);

  return (
    <ul>
      {results}
    </ul>
  )
};

// export default function DayList(props) {
//   const textArray = [];
//   for (let i = 0; i < props.days.length; i++) {
//     textArray.push(
//     <DayListItem 
//       key={props.days[i].id}
//       name={props.days[i].name} 
//       spots={props.days[i].spots} 
//       selected={props.days[i].name === props.day}
//       setDay={props.setDay}  
//     />);
//   }
//   return(
//     <ul>
//       {textArray}
//     </ul>
//   )
// };