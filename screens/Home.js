import { StyleSheet, Pressable, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";

import React from "react";
import axios from "axios";

import ProgressCircles from "../components/ProgressCircles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Calendar from "../components/Calendar";
import Menu from "../components/Menu";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get("https://calorietrackerapi-d5wlvjoica-rj.a.run.app/meals")
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Good Morning</Text>
        <Calendar />
        <View style={styles.section}>
          <Text style={styles.title}>Calories Left</Text>
          <Text style={styles.subtitle}>1,480 kcal</Text>
          <View style={styles.calories}>
            <ProgressCircles
              percentages={[70]}
              color="#63BA6A"
              title="Protein"
              details="58g left"
            />
            <ProgressCircles
              percentages={[80]}
              color={"#F7C442"}
              title="Carbs"
              details="26g left"
            />
            <ProgressCircles
              percentages={[50]}
              color={"#A79EDE"}
              title="Fat"
              details="70g left"
            />
          </View>
        </View>
        <View style={[styles.section, { flexDirection: "row" }]}>
          <Text style={styles.title}>Daily Meals</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={styles.button}
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <Ionicons name="add" size={25} />
            </Pressable>
          </View>
        </View>
        <Menu
          options={["Breakfast", "Lunch", "Dinner"]}
          meals={data}
          onSelect={() => {}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f4f5f6",
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: "auto",
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
  },
  section: {
    padding: 6,
    marginTop: 25,
  },
  calories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
  subtitle: {
    color: "#339c4e",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 2,
  },
});

export default Home;
