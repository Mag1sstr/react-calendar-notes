import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FunctionComponent,
} from "react";
import { monthNames } from "../constants";
import SwitchMonth from "./SwitchMonth";
import { getFirstDayInMonth } from "../helper/getFirstDayInMonth";
import WeekDays from "./WeekDays";
import CreateTaskModal from "./CreateTaskModal";
import { observer } from "mobx-react-lite";
import SavedMonthStore from "../store/SavedMonthStore";
import { useStore } from "../store/store";
import { useClickOutside } from "../helper/useClickOutside";
import ActionMenu from "./ActionMenu";
import { motion } from "motion/react";

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
  const [showDargHelp, setShowDragHelp] = useState(true);

  const { setMenu, menu } = useStore();

  const currDate = new Date();

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

  useEffect(() => {
    function closeMenu() {
      setMenu(null);
    }
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 1, ease: [0.65, 0, 0.35, 1] }}
      className="w-full min-h-screen  flex items-center justify-center"
    >
      <ActionMenu
        onAdd={() => handleClickTask(menu!.day)}
        onDelete={() =>
          SavedMonthStore.deleteTask(currentYear, currentMonth, menu!.day.day)
        }
      />
      <CreateTaskModal
        currentMonth={currentMonth}
        currentYear={currentYear}
        open={openModal}
        setOpen={setOpenModal}
        data={monthData}
        selectDay={selectDay}
      />
      <div className="p-[20px]  bg-[var(--bg-col)] w-[1200px] lg:rounded-2xl glass">
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
        <ul className="grid grid-cols-7 auto-rows-[70px] lg:auto-rows-[100px] gap-2 lg:gap-5 ">
          <WeekDays />
          {getFirstDayInMonth(currentYear, currentMonth).map((_, i) => (
            <li key={i}></li>
          ))}

          {monthData.map((el) => (
            <li
              key={el.day}
              className={`group relative p-2 lg:p-[20px] font-bold text-[18px] rounded-lg cursor-pointer transition-all z-10  ${el.day === currDate.getDate() ? "bg-indigo-600!" : "bg-white"} ${new Date(currentYear, currentMonth, el.day) < new Date(currDate.setHours(0, 0, 0, 0)) && "opacity-40 cursor-not-allowed!"} hover:shadow-lg word-break hover:scale-110`}
              style={{ backgroundColor: el.taskColor ?? "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                // handleClickTask(el);
                setMenu({ x: e.clientX, y: e.clientY, day: el });
              }}
              draggable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDragStart={() => {
                setShowDragHelp(false);
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
              {el.day === currDate.getDate() && showDargHelp && (
                <>
                  <svg
                    className="pointer-events-none absolute left-[25%] top-[25%] h-8 w-8 animate-[dragCursor_3s_ease-in-out_infinite]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5.5 3.5L18.5 14L12 14.5L15 20L11.5 21.5L8.5 15L4 18V3.5H5.5Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <svg
                    className="pointer-events-none absolute left-[25%] top-[25%] h-8 w-8 animate-[dragHand_3s_ease-in-out_infinite]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 11V6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5V11V4.5C11 3.67 11.67 3 12.5 3C13.33 3 14 3.67 14 4.5V11V5.5C14 4.67 14.67 4 15.5 4C16.33 4 17 4.67 17 5.5V12L18 10.5C18.45 9.83 19.36 9.65 20.03 10.1C20.7 10.55 20.88 11.46 20.43 12.13L17 17.5C15.9 19.2 14 20.2 11.97 20.2H11C8.24 20.2 6 17.96 6 15.2V12C6 11.45 6.45 11 7 11C7.55 11 8 11.45 8 12V11Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
              <p className="lg:text-2xl">{el.day}</p>
              <p className="text-[1rem] font-normal overflow-hidden text-ellipsis">
                {el.task}
              </p>
              {/* {!!el.task.length && (
                <div
                  className={`absolute invisible top-0 left-0 w-[200px] h-[300px] transition-all z-50 group-hover:visible`}
                  style={{ backgroundColor: el.taskColor! }}
                ></div>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

export default Schedule;
