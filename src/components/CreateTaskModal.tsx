import { observer } from "mobx-react-lite";
import { useRef, type FormEvent, type FunctionComponent } from "react";
import type { IMonth } from "./Schedule";
import { createTask } from "../helper/createTask";

interface IProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  currentMonth: number;
  currentYear: number;
  data: IMonth[];
  selectDay: IMonth | null;
}

const CreateTaskModal: FunctionComponent<IProps> = observer(
  ({ open, setOpen, currentMonth, currentYear, data, selectDay }) => {
    const valueRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      if (valueRef.current && valueRef.current.value.length > 0) {
        createTask(
          data,
          selectDay,
          currentYear,
          currentMonth,
          valueRef.current.value
        );
        setOpen(false);
        valueRef.current!.value = "";
      }
    };

    return (
      <div
        onMouseDown={() => setOpen(false)}
        className={`fixed inset-0 backdrop-blur-md  flex items-center justify-center transition-all z-[100]  ${
          open
            ? "opacity-100 pointer-events-auto"
            : "pointer-events-none opacity-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-[448px] p-6 rounded-xl bg-white shadow-xl"
        >
          <h3 className="text-center mb-8 font-bold text-3xl text-gray-800">
            Создание новой задачи
          </h3>

          <div className="flex flex-col gap-2 text-gray-600 mb-8">
            <label htmlFor="task">Название задачи *</label>
            <input
              ref={valueRef}
              id="task"
              type="text"
              placeholder="Введите название задачи"
              className="p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
            Создать задачу
          </button>
        </form>
      </div>
    );
  }
);

export default CreateTaskModal;
