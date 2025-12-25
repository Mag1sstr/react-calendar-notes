export const getFirstDayInMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return [...Array(day === 0 ? 6 : day - 1)];
};
