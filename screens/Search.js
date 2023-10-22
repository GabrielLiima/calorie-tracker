import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import CollapsedMeal from "../components/CollapsedMeal";
import meals from "../data/dummy_data";
import Menu from "../components/Menu";

const Search = () => {
  const [category, setCategory] = useState("Foods");

  const selectCategoryHandler = (category) => {
    setCategory(category);
  };

  const renderMeals = (itemData) => {
    const meal = itemData.item;

    return <CollapsedMeal {...meal} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="search"
          style={{ position: "absolute", top: 11, left: 12 }}
          size={18}
          color={"#c4c4c4"}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a food..."
          cursorColor={"#cccccc"}
        />
      </View>
      <Menu
        options={["Foods", "Recipes"]}
        onSelect={selectCategoryHandler}
      />
      <FlatList
        data={meals}
        keyExtractor={(meal) => meal.id}
        renderItem={renderMeals}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 60,
  },
  input: {
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    height: 40,
    paddingHorizontal: 40,
  },
});

export default Search;
