import { StyleSheet, Pressable, Text, View, ScrollView } from "react-native";

import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { DateContext } from "../context/store/date-context";

import React from "react";
import axios from "axios";

import ProgressCircles from "../components/ProgressCircles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Calendar from "../components/Calendar";
import Menu from "../components/Menu";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [quota, setQuota] = useState({});
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get("https://calorietrackerapi-d5wlvjoica-rj.a.run.app/meals")
        .then((response) => {
          setData(response.data.items);

          return axios.get(
            "https://calorietrackerapi-d5wlvjoica-rj.a.run.app/meals/daily-quota"
          );
        })
        .then((response) => {
          setQuota(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }, [])
  );

  const sendMessageChatGpt = () => {
    let recipe = {};

    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content:
                "suggest me a meal (be creative with it, i'll run this command multiple times and i want the odds of the meal repeating to be slim), in a JSON format, containing the following attributes (i'll insert the attribute names in parenthesis): name of the recipe (name), the amount in grams (amount), the amount of calories in kcal (calories), the amount of protein in it (protein), the amount of carbs (carbs), the amount of fat (fat), the percentage of protein without the percent sign (percentProtein), the percentage of carbs without the percent sign (percentCarbs), the percentage of fat without the percent sign (percentFat)",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      )
      .then((response) => {
        recipe = JSON.parse(response.data.choices[0].message.content);

        return axios.get(
          `https://api.unsplash.com/search/photos/?client_id=TEuiNU_cMAffSlvRvA4TKjnnLw-yVz5Mv6fRUvHMgGY&query=${recipe.name}`
        );
      })
      .then((response) => {
        setRecipe({
          ...recipe,
          imageUrl: response.data.results[0].urls.full,
          id: Math.floor(1000 + Math.random() * 9000),
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  let consumedCalories = 0;
  let consumedProtein = 0;
  let consumedFat = 0;
  let consumedCarbs = 0;

  const dateCtx = useContext(DateContext);

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    if (recipe) {
      navigation.navigate("Details", {
        meal: recipe,
        type: "Recipes",
      });

      setRecipe(0);
    }

    for (const meal of data) {
      consumedCalories +=
        meal.day == dateCtx.day && meal.month == dateCtx.month
          ? meal.calories
          : 0;
      consumedProtein +=
        meal.day == dateCtx.day && meal.month == dateCtx.month
          ? meal.protein
          : 0;
      consumedCarbs +=
        meal.day == dateCtx.day && meal.month == dateCtx.month ? meal.carbs : 0;
      consumedFat +=
        meal.day == dateCtx.day && meal.month == dateCtx.month ? meal.fat : 0;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Good Morning</Text>
        <Calendar />
        <View style={styles.section}>
          <Text style={styles.title}>Calories Left</Text>
          <Text style={styles.subtitle}>
            {(quota.dailyCalories - consumedCalories).toLocaleString()} kcal
          </Text>
          <View style={styles.calories}>
            <ProgressCircles
              percentages={[(consumedProtein / quota.dailyProtein) * 100]}
              color="#63BA6A"
              title="Protein"
              details={`${(quota.dailyProtein - consumedProtein).toFixed(
                0
              )}g left`}
            />
            <ProgressCircles
              percentages={[(consumedCarbs / quota.dailyCarbs) * 100]}
              color={"#F7C442"}
              title="Carbs"
              details={`${(quota.dailyCarbs - consumedCarbs).toFixed(0)}g left`}
            />
            <ProgressCircles
              percentages={[(consumedFat / quota.dailyFat) * 100]}
              color={"#A79EDE"}
              title="Fat"
              details={`${(quota.dailyFat - consumedFat).toFixed(0)}g left`}
            />
          </View>
        </View>
        <View style={[styles.section, { flexDirection: "row" }]}>
          <Text style={styles.title}>Daily Meals</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={styles.button}
              onPress={sendMessageChatGpt}
            >
              <Ionicons name="color-wand-outline" size={25} />
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
  input: {
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
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
