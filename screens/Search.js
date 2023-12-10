import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import axios from "axios";

import Ionicons from "react-native-vector-icons/Ionicons";
import Menu from "../components/Menu";

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const inputHandler = (input) => {
    setQuery(input);
  };

  const fetchData = (query) => {
    axios
      .get(`https://calorietrackerapi-d5wlvjoica-rj.a.run.app/search/${query}`)
      .then((response) => {
        const data = response.data.results.map((result) => {
          return { ...result, category: "Foods" };
        });

        setData(data);
      })
      .catch((err) => console.log(err));
  };

  const [text, setText] = useState("Search for Recipes...");

  const onSelect = (selected) => {
    setText(`Search for ${selected}...`);
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
          placeholder={text}
          cursorColor={"#cccccc"}
          onChangeText={inputHandler}
          value={query}
          onSubmitEditing={fetchData.bind(this, query)}
        />
      </View>
      {data != [] && (
        <Menu
          options={["Foods", "Recipes"]}
          meals={data}
          onSelect={onSelect}
          collapsed
        />
      )}
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
