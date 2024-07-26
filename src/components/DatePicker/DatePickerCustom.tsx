import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "~/assets/images/calendar.png";
import { cn } from "~/utils/utils";
import "./DatePicker.css";

type DatePickerCustomProps = {
  classNameDatePicker?: string;
  className?: string;
};

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({ classNameDatePicker, className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        weekLabel="Wk"
        showWeekNumbers
        className={cn("border pl-1 w-[97px] text-xs py-[2px]", classNameDatePicker)}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
      >
        <div className=" ">
          <hr className="w-64 border-t-2" />
          <div className="flex justify-between pt-2">
            <button className="border border-[#d6d6d6] text-[#90adc9] rounded-md bg-[#fafafa] px-2 py-1 hover:border-[#8caac7]">Today</button>
            <button className="border border-[#cccccc] text-[#628db6] font-bold rounded-md bg-[#fafafa] px-2 py-1 relative left-10 hover:border-[#8caac7]">
              Done
            </button>
          </div>
        </div>
      </DatePicker>
      <img src={Calendar} alt="Calendar" className="cursor-pointer ml-1" onClick={toggleCalendar} />
    </div>
  );
};

export default DatePickerCustom;
