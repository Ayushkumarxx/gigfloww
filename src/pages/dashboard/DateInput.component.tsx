import React, { useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

const DateInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());

  // WHY: Avoids recalculating formatted date on every render unnecessarily.
  const formattedDate = React.useMemo(() => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [date]);

  // WHY: Keeps input native and accessible while using a custom design. showPicker triggers native date picker for modern browsers.
  const handleClick = () => {
    inputRef.current?.showPicker();
  };

  // WHY: Updates selected date state which reflects on UI
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  return (
    <div
      className="flex space-x-2 py-2.5 px-2 items-center shadow-sm border border-black/15 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
      {/* WHY: Added consistent responsive size for better alignment on different screen sizes */}
      <div className="text-[14px] lg:text-[16px] font-normal">{formattedDate}</div>
      <input
        ref={inputRef}
        type="date"
        className="hidden"
        onChange={handleChange}
        value={date.toISOString().split("T")[0]} // WHY: toISOString gives full format; slicing for only the date part ensures HTML5 compliance
      />
    </div>
  );
};

export default DateInput;
