import type { IMonth } from "../components/Schedule";
import SavedMonthStore from "../store/SavedMonthStore";
import { getRandomTaskColor } from "./getRandomTaskColor";

export const createTask = (
  data: IMonth[],
  selectDay: IMonth | null,
  year: number,
  month: number,
  value: string | null
) => {
  const newData = [...data].map((el) => {
    if (el.day === selectDay!.day) {
      return {
        ...el,
        task: value!,
        taskColor: getRandomTaskColor(),
      };
    }
    return el;
  });
  SavedMonthStore.addNewSavedData(year, month, newData);
};
