import { makeAutoObservable } from "mobx";
import type { IMonth } from "../components/Schedule";

interface ISavedMonth {
  year: number;
  month: number;
  data: IMonth[];
}

function getLocalStorageValue<T>(name: string) {
  const data = localStorage.getItem(name);
  return data ? (JSON.parse(data) as T) : [];
}

class SavedMonthStore {
  savedData: ISavedMonth[] = getLocalStorageValue<ISavedMonth[]>("data");
  constructor() {
    makeAutoObservable(this);
  }
  addNewSavedData(year: number, month: number, data: IMonth[]) {
    const index = this.savedData.findIndex(
      (el) => el.year === year && el.month === month
    );
    if (index !== -1) {
      this.savedData[index] = { year, month, data };
    } else {
      this.savedData = [...this.savedData, { year, month, data }];
    }
    localStorage.setItem("data", JSON.stringify(this.savedData));
  }
  getMonth(year: number, month: number) {
    const savedData = this.savedData.find(
      (el) => el.year === year && el.month === month
    )?.data;
    return savedData;
  }
}

export default new SavedMonthStore();
