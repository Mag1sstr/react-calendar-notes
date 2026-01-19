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
  const [selectDay, setSelectDay] = useState<null | IMonth>(null);

  // const currDate = new Date();

  const daysCurrMonth = [
    ...Array(new Date(currentYear, currentMonth + 1, 0).getDate()),
  ].map((_, i) => ({ day: i + 1, task: "", taskColor: null }));

  const handleClickTask = (day: IMonth) => {
    setOpenModal(true);
    setSelectDay(day);
  };

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "#b1ff9c";
    event.currentTarget.style.outline = "2px solid #b1ff9c";
    event.currentTarget.style.outlineOffset = "4px";
    event.currentTarget.style.transform = "scale(1.2)";
  };

  const handleDragLeave = (event: DragEvent<HTMLLIElement>) => {
    event.currentTarget.style.backgroundColor = "#fff";
    event.currentTarget.style.outline = "none";
    event.currentTarget.style.transform = "scale(1)";
  };

  const monthData =
    SavedMonthStore.getMonth(currentYear, currentMonth) ?? daysCurrMonth;

  console.log(selectDay?.day);

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
              className={`group relative p-[20px] font-bold text-[18px] rounded-lg cursor-pointer transition-all z-10  hover:shadow-lg word-break hover:scale-110`}
              style={{ backgroundColor: el.taskColor ?? "#fff" }}
              onClick={() => handleClickTask(el)}
              draggable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDragStart={() => {
                setSelectDay(el);
              }}
              onDrop={(event) => {
                const newData = [...monthData].map((item) => {
                  if (item.day === el.day) {
                    return { ...selectDay!, day: el.day };
                  }
                  if (item.day === selectDay?.day) {
                    return { ...el, day: selectDay.day };
                  }
                  return item;
                });
                SavedMonthStore.addNewSavedData(
                  currentYear,
                  currentMonth,
                  newData,
                );
                (event.currentTarget as HTMLLIElement).style.backgroundColor =
                  "#fff";
                (event.currentTarget as HTMLLIElement).style.outline = "none";
                (event.currentTarget as HTMLLIElement).style.transform =
                  "scale(1)";
              }}
            >
              <p className="text-2xl">{el.day}</p>
              <p className="text-[1rem] font-normal overflow-hidden text-ellipsis">
                {el.task}
              </p>
              {!!el.task.length && (
                <div
                  className={`absolute invisible top-0 left-0 w-[200px] h-[300px] transition-all z-50 group-hover:visible`}
                  style={{ backgroundColor: el.taskColor! }}
                ></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Schedule;
