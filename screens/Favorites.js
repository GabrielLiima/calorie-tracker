import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import axios from "axios";

import CollapsedMeal from "../components/CollapsedMeal";

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get("https://calorietrackerapi-d5wlvjoica-rj.a.run.app/favorites")
        .then((response) => {
          setData(response.data.items);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }, [])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((meal) => (
          <CollapsedMeal key={meal.id} meal={meal} />
        ))}
      </ScrollView>
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
    fontSize: 16,
  },
});

export default Favorites;
