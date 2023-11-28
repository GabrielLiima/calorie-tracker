import { createContext, useState } from "react";

export const MealsContext = createContext({
  mealsList: [{}],
  addMeal: (meal, category) => {},
});

const MealsContextProvider = ({ children }) => {
  const [mealsList, setMeals] = useState([]);

  const addMeal = (meal, category) => {
    setMeals((currentState) => [...currentState, { ...meal, category: category }]);
  };

  const values = {
    mealsList: mealsList,
    addMeal: addMeal,
  };

  return (
    <MealsContext.Provider value={values}>{children}</MealsContext.Provider>
  );
};

export default MealsContextProvider;
