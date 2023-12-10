import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Routes from "./Routes";
import DateContextProvider from "./context/store/date-context";

const App = () => {
  return (
    <>
      <DateContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </DateContextProvider>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
};

export default App;
