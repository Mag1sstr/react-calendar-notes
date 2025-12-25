import type { FunctionComponent } from "react";
import { weekDays } from "../constants";

const WeekDays: FunctionComponent = () => {
  return (
    <>
      {weekDays.map((day) => (
        <li key={day} className="uppercase text-[20px]">
          {day}
        </li>
      ))}
    </>
  );
};

export default WeekDays;
