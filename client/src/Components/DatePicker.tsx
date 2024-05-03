import { CalendarIcon } from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function DatePicker({ showCalendar, resetCalendar, state, handleCalendarChange, toggleCalendar }) {
  return (
    <div className="relative">
      <div className="flex flex-row">
        <CalendarIcon
          className="h-10 w-10 text-blue-500"
          onClick={toggleCalendar}
        />
        {showCalendar && (
          <button
            className="px-2 py-2 bg-blue-400 text-white font-semibold rounded-md"
            onClick={resetCalendar}
          >
            Reset calendar
          </button>
        )}
      </div>

      {showCalendar && (
        <div className="absolute top-10 left-0 z-50">
          <DateRangePicker
            onChange={handleCalendarChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
}
