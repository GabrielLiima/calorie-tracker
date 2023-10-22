import { useContext } from "react";
import { FavoritesContext } from "../context/store/favorites-context";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import meals from "../data/dummy_data";
import CollapsedMeal from "../components/CollapsedMeal";

const Favorites = () => {
  const favoritesCtx = useContext(FavoritesContext);

  const favoriteMeals = meals.filter((meal) =>
    favoritesCtx.ids.includes(meal.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites</Text>
      {favoriteMeals.length == 0 ? (
        <View style={styles.default}>
          <Text style={styles.defaultText}>No favorite meals yet.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {favoriteMeals.map((meal) => (
            <CollapsedMeal key={meal.id} {...meal} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
    paddingTop: 60,
  },
  default: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  defaultText: {
    fontSize: 16
  },
});

export default Favorites;
