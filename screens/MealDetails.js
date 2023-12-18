import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

import Bar from "../components/Bar";

const MealDetails = ({ navigation, route }) => {
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState();

  const onPressHandler = () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
  };

  if (!route.params.meal.calories || route.params.type == "Foods") {
    useEffect(() => {
      let url = "";

      if (route.params.type == "Foods") {
        url = `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/search/details/${route.params.id}`;
      } else if (route.params.type == "Recipes") {
        url = `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/search/recipe/details/${route.params.id}`;
      }
      axios
        .get(url)
        .then((response) => {
          setMeal({ ...response.data, type: route.params.type });

          navigation.setOptions({
            headerTitle:
              response.data.name.charAt(0).toUpperCase() +
              response.data.name.slice(1),
          });

          return axios.get(
            `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/favorites/${route.params.id}`
          );
        })
        .then((response) => {
          if (response.data.isFavorite) {
            setFavorite(true);

            navigation.setOptions({
              headerRight: () => (
                <Ionicons
                  name={"heart"}
                  color={"#ff715e"}
                  size={28}
                  onPress={onPressHandler}
                />
              ),
            });
          } else {
            navigation.setOptions({
              headerRight: () => (
                <Ionicons
                  name={"heart-outline"}
                  color={"#ff715e"}
                  size={28}
                  onPress={onPressHandler}
                />
              ),
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, []);
  } else {
    useEffect(() => {
      setMeal(route.params.meal);

      navigation.setOptions({
        headerTitle:
          route.params.meal.name.charAt(0).toUpperCase() +
          route.params.meal.name.slice(1),
      });

      axios
        .get(
          `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/favorites/${route.params.meal.id}`
        )
        .then((response) => {
          if (response.data.isFavorite) {
            setFavorite(true);

            navigation.setOptions({
              headerRight: () => (
                <Ionicons
                  name={"heart"}
                  color={"#ff715e"}
                  size={28}
                  onPress={onPressHandler}
                />
              ),
            });
          } else {
            navigation.setOptions({
              headerRight: () => (
                <Ionicons
                  name={"heart-outline"}
                  color={"#ff715e"}
                  size={28}
                  onPress={onPressHandler}
                />
              ),
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, []);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          color={"#ff715e"}
          size={28}
          onPress={onPressHandler}
        />
      ),
    });

    if (favorite) {
      axios
        .post(
          `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/favorites/add/`,
          route.params.type == "Foods"
            ? { id: meal.id, name: meal.name, type: route.params.type }
            : { ...route.params.meal, type: route.params.type }
        )
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `https://calorietrackerapi-d5wlvjoica-rj.a.run.app/favorites/delete`,
          { id: meal.id }
        )
        .catch((err) => console.log(err));
    }
  }, [favorite]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            route.params.type == "Foods"
              ? `https://spoonacular.com/cdn/ingredients_500x500/${meal.imageUrl}`
              : meal.imageUrl,
        }}
        style={styles.image}
      />
      <ScrollView>
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
            </Text>
            <Text style={styles.title}>
              {route.params.type == "Foods" ? `${meal.amount}g` : `1 Serving`}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Nutritional value</Text>
            <Text style={styles.subtitle}>{meal.calories} kcal</Text>
          </View>
          <View
            style={[styles.textContainer, { marginTop: 20, marginBottom: 10 }]}
          >
            <Text style={styles.details}>Protein</Text>
            <Text style={styles.details}>{meal.percentProtein}%</Text>
          </View>
          <Bar
            percentage={`${meal.percentProtein}%`}
            color={"#63BA6A"}
            horizontal
          />
          <View
            style={[styles.textContainer, { marginBottom: 10, marginTop: 15 }]}
          >
            <Text style={styles.details}>Carbs</Text>
            <Text style={styles.details}>{meal.percentCarbs}%</Text>
          </View>
          <Bar
            percentage={`${meal.percentCarbs}%`}
            color={"#F7C442"}
            horizontal
          />
          <View
            style={[styles.textContainer, { marginBottom: 10, marginTop: 15 }]}
          >
            <Text style={styles.details}>Fat</Text>
            <Text style={styles.details}>{meal.percentFat}%</Text>
          </View>
          <Bar
            percentage={`${meal.percentFat}%`}
            color={"#A79EDE"}
            horizontal
          />
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
    maxWidth: 265
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
