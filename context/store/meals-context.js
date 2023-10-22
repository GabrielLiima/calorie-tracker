import { createContext, useState } from "react";

export const MealsContext = createContext({
  ids: [{}],
  addMeal: (id, meal) => {},
});

const MealsContextProvider = ({ children }) => {
  const [mealsList, setMeals] = useState([]);

  const addMeal = (id, meal) => {
    setMeals({ id: id, meal: meal });
  };

  const values = {
    ids: mealsList,
    addMeal: addMeal,
  };

  return (
    <MealsContext.Provider value={values}>{children}</MealsContext.Provider>
  );
};

export default MealsContextProvider;
