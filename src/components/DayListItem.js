import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {'day-list__item--selected':props.selected, 'day-list__item--full':props.spots === 0})
  const formatSpots = (spotCount) => {
    return (
    <h3 className="text--light">
    {spotCount === 0 && 'no spots remaining'}
    {spotCount === 1 &&  `${spotCount} spot remaining`}
    {spotCount > 1 && `${spotCount} spots remaining`}
    </h3>
    )
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
};