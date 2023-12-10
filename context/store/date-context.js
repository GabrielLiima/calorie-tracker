import { createContext, useState } from "react";

export const DateContext = createContext({
  day: Number,
  month: String,
  switchDate: (day) => {}
});

const DateContextProvider = ({ children }) => {
  const currentDate = new Date();

  const dayOfMonth = currentDate.getDate();

  const monthAbbreviation = currentDate.toLocaleString("default", {
    month: "short",
  });

  const [day, setDay] = useState(dayOfMonth);
  const [month, setMonth] = useState(monthAbbreviation);

  const switchDate = (day) => {
    setDay(day);
  };

  const values = {
    day: day,
    month: month,
    switchDate: switchDate
  };

  return (
    <DateContext.Provider value={values}>
      {children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
