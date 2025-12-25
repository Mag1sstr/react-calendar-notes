import type { FunctionComponent } from "react";

interface Props {
  setCurrentMonth: (n: number | ((prev: number) => number)) => void;
  setCurrentYear: (n: number | ((prev: number) => number)) => void;
  currentMonth: number;
}

const SwitchMonth: FunctionComponent<Props> = ({
  setCurrentMonth,
  setCurrentYear,
  currentMonth,
}) => {
  const handleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };
  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };
  return (
    <div className="flex gap-2 my-5">
      <div
        onClick={handlePrevMonth}
        className="bg-white/35
  backdrop-blur-sm
  border border-white/50
  rounded-xl
  px-5 py-2.5
  text-gray-700
  transition
  hover:bg-white/50
  rotate-180"
        onDragOver={(item) => {
          (item.target as HTMLDivElement).style.transform = "scale(1.2)";
        }}
        onDragLeave={(item) => {
          (item.target as HTMLDivElement).style.transform = "scale(1)";
        }}
      >
        ▶
      </div>

      <div
        onClick={handleNextMonth}
        className="bg-white/35
  backdrop-blur-sm
  border border-white/50
  rounded-xl
  px-5 py-2.5
  text-gray-700
  transition
  hover:bg-white/50
  "
      >
        ▶
      </div>
    </div>
  );
};

export default SwitchMonth;
