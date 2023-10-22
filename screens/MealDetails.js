import { FavoritesContext } from "../context/store/favorites-context";
import { useLayoutEffect, useContext } from "react";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import meals from "../data/dummy_data";
import Bar from "../components/Bar";

const MealDetails = ({ navigation, route }) => {
  const meal = meals.find((meal) => meal.id === route.params.id);

  const favoritesCtx = useContext(FavoritesContext);
  const isFavorite = favoritesCtx.ids.includes(meal.id);

  const onPressHandler = () => {
    if (isFavorite) {
      favoritesCtx.removeFavorite(meal.id);
    } else {
      favoritesCtx.addFavorite(meal.id);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: meal.title,
      headerRight: () => (
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          color={"#ff715e"}
          size={28}
          onPress={onPressHandler}
        />
      ),
    });
  }, [navigation, meal, isFavorite, onPressHandler]);

  const proteinPercentage = ((meal.protein / meal.amount) * 100).toFixed(1);
  const carbsPercentage = ((meal.carbs / meal.amount) * 100).toFixed(1);
  const fatPercentage = ((meal.fat / meal.amount) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <ScrollView>
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{meal.title}</Text>
            <Text style={styles.title}>{meal.amount}g</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Nutritional value</Text>
            <Text style={styles.subtitle}>{meal.calories} kcal</Text>
          </View>
          <View
            style={[styles.textContainer, { marginTop: 20, marginBottom: 10 }]}
          >
            <Text style={styles.details}>Protein</Text>
            <Text style={styles.details}>{proteinPercentage}%</Text>
          </View>
          <Bar
            percentage={`${proteinPercentage}%`}
            color={"#63BA6A"}
            horizontal
          />
          <View
            style={[styles.textContainer, { marginBottom: 10, marginTop: 15 }]}
          >
            <Text style={styles.details}>Carbs</Text>
            <Text style={styles.details}>{carbsPercentage}%</Text>
          </View>
          <Bar
            percentage={`${carbsPercentage}%`}
            color={"#F7C442"}
            horizontal
          />
          <View
            style={[styles.textContainer, { marginBottom: 10, marginTop: 15 }]}
          >
            <Text style={styles.details}>Fat</Text>
            <Text style={styles.details}>{fatPercentage}%</Text>
          </View>
          <Bar percentage={`${fatPercentage}%`} color={"#A79EDE"} horizontal />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    margin: 25,
  },
  image: {
    height: "50%",
    width: "100%",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  subtitle: {
    color: "#b5b3b3",
    fontSize: 15,
    fontWeight: "500",
  },
  details: {
    fontWeight: "500",
  },
});

export default MealDetails;
