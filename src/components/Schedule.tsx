import { useState, type DragEvent, type FunctionComponent } from "react";
import { monthNames } from "../constants";
import SwitchMonth from "./SwitchMonth";
import { getFirstDayInMonth } from "../helper/getFirstDayInMonth";
import WeekDays from "./WeekDays";
import CreateTaskModal from "./CreateTaskModal";
import { observer } from "mobx-react-lite";
import SavedMonthStore from "../store/SavedMonthStore";

export interface IMonth {
  day: number;
  task: string;
  taskColor: null | string;
}

const Schedule: FunctionComponent = observer(() => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [openModal, setOpenModal] = useState(false);
  const [selectDay, setSelectDay] = useState(0);

  // const currDate = new Date();

  const daysCurrMonth = [
    ...Array(new Date(currentYear, currentMonth + 1, 0).getDate()),
  ].map((_, i) => ({ day: i + 1, task: "", taskColor: null }));

  const handleClickTask = (day: number) => {
    setOpenModal(true);
    setSelectDay(day);
  };

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).style.backgroundColor = "#b1ff9c";
    (event.target as HTMLLIElement).style.outline = "2px solid #b1ff9c";
    (event.target as HTMLLIElement).style.outlineOffset = "4px";
    (event.target as HTMLLIElement).style.transform = "scale(1.2)";
  };
  const handleDragLeave = (event: DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).style.backgroundColor = "#fff";
    (event.target as HTMLLIElement).style.outline = "none";
    (event.target as HTMLLIElement).style.transform = "scale(1)";
  };

  const monthData =
    SavedMonthStore.getMonth(currentYear, currentMonth) ?? daysCurrMonth;

  return (
    <div className="w-full min-h-screen  flex items-center justify-center">
      <CreateTaskModal
        currentMonth={currentMonth}
        currentYear={currentYear}
        open={openModal}
        setOpen={setOpenModal}
        data={monthData}
        selectDay={selectDay}
      />
      <div className="p-[20px]  bg-[var(--bg-col)] w-[1200px] glass">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-3xl first-letter:uppercase">
              {`${monthNames[currentMonth]} ${currentYear}`}
            </h2>
          </div>
          <SwitchMonth
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
            currentMonth={currentMonth}
          />
        </div>
        <ul className="grid grid-cols-7 auto-rows-[100px] gap-5 ">
          <WeekDays />
          {getFirstDayInMonth(currentYear, currentMonth).map((_, i) => (
            <li key={i}></li>
          ))}

          {monthData.map((el) => (
            <li
              key={el.day}
              className={`p-[20px] font-bold text-[18px] rounded-lg cursor-pointer transition-all hover:scale-110 hover:shadow-lg word-break `}
              style={{ backgroundColor: el.taskColor ?? "#fff" }}
              onClick={() => handleClickTask(el.day)}
              draggable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {el.day}
              {!!el.task.length && <p>{el.task}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Schedule;
