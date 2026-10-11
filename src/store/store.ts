import { create } from "zustand";
import type { ISavedMonth } from "./SavedMonthStore";
import type { IMonth } from "../components/Schedule";
import { persist } from "zustand/middleware";

type MenuState = { x: number; y: number; day: IMonth } | null;

interface IStore {
  savedData: ISavedMonth[];
  addNewSavedData: (y: number, m: number, d: IMonth[]) => void;
  getMonth: (y: number, m: number) => IMonth[] | undefined;
  menu: MenuState;
  setMenu: (v: MenuState) => void;
  deleteTask: (y: number, m: number, d: number) => void;
  updateTask: (
    year: number,
    month: number,
    day: number,
    newTaskValue: string,
  ) => void;
}

export const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      savedData: [],
      menu: null,
      setMenu: (menu) => set({ menu }),
      addNewSavedData: (year: number, month: number, data: IMonth[]) => {
        const index = get().savedData.findIndex(
          (el) => el.year === year && el.month === month,
        );
        if (index !== -1) {
          set((state) => ({
            savedData: [...state.savedData].map((el, i) =>
              i === index ? { year, month, data } : el,
            ),
          }));
        } else {
          set((state) => ({
            savedData: [...state.savedData, { year, month, data }],
          }));
        }
      },
      getMonth: (year: number, month: number) =>
        get().savedData.find((el) => el.year === year && el.month === month)
          ?.data,

      updateTask: (
        year: number,
        month: number,
        day: number,
        newTaskValue: string,
      ) => {
        return set((state) => ({
          savedData: state.savedData.map((saved) =>
            saved.year === year && saved.month === month
              ? {
                  ...saved,
                  data: saved.data.map((v) =>
                    v.day === day ? { ...v, task: newTaskValue } : v,
                  ),
                }
              : saved,
          ),
        }));
      },
      deleteTask(year: number, month: number, day: number) {
        return set((state) => ({
          savedData: state.savedData.map((data) =>
            data.year === year && data.month === month
              ? {
                  ...data,
                  data: data.data.map((el) =>
                    el.day === day ? { ...el, taskColor: null, task: "" } : el,
                  ),
                }
              : data,
          ),
        }));
      },

      //   deleteTask(year: number, month: number, day: number) {
      // return set(state=>({savedData:state.savedData.map((data) =>
      //   data.year === year && data.month === month
      //     ? {
      //         ...data,
      //         data: data.data.map((el) =>
      //           el.day === day ? { ...el, taskColor: null, task: "" } : el,
      //         ),
      //       }
      //     : data,
      // }
    }),

    { name: "zdata" },
  ),
);
