import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./screens/Home";
import Search from "./screens/Search";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
import MealDetails from "./screens/MealDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Routes = () => {
  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "fade_from_bottom",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="StackHome"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={MealDetails} />
      </Stack.Navigator>
    );
  };

  const SearchStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "fade_from_bottom",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="StackSearch"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={MealDetails} />
      </Stack.Navigator>
    );
  };

  const FavoritesStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "fade_from_bottom",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="StackFavorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={MealDetails} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? "#ff715e" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={focused ? "#ff715e" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={focused ? "#ff715e" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={focused ? "#ff715e" : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
