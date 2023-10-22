import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Routes from "./Routes";
import FavoritesContextProvider from "./context/store/favorites-context";
import MealsContextProvider from "./context/store/meals-context";

const App = () => {
  return (
    <>
      <MealsContextProvider>
        <FavoritesContextProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </FavoritesContextProvider>
      </MealsContextProvider>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
};

export default App;
