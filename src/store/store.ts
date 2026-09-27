import { create } from "zustand";
import type { ISavedMonth } from "./SavedMonthStore";
import type { IMonth } from "../components/Schedule";
import { persist } from "zustand/middleware";

interface IStore {
  savedData: ISavedMonth[];
  addNewSavedData: (y: number, m: number, d: IMonth[]) => void;
  getMonth: (y: number, m: number) => IMonth[] | undefined;
  menu: [x: number, y: number] | null;
  setMenu: (v: [x: number, y: number] | null) => void;
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
    }),

    { name: "data" },
  ),
);
