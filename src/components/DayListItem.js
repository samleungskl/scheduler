import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, setDay, selected} = props;
  const dayClass = classNames('day-list__item', {'day-list__item--selected':selected, 'day-list__item--full':spots === 0})
  const formatSpots = (spotCount) => {
    return (
    <h3 className="text--light">
    {spotCount === 0 && 'no spots remaining'}
    {spotCount === 1 &&  `${spotCount} spot remaining`}
    {spotCount > 1 && `${spotCount} spots remaining`}
    </h3>
    )
  }

 // formatSpots();
  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      {formatSpots(spots)}
    </li>
  );
}