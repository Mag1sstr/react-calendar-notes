import { colors } from "../constants";

export const getRandomTaskColor = () => {
  return colors[Math.floor(Math.random() * 4)];
};
