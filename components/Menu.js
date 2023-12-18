import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useContext } from "react";

import Meal from "./Meal";
import CollapsedMeal from "./CollapsedMeal";
import { DateContext } from "../context/store/date-context";

const Menu = ({ options, meals, onSelect, collapsed }) => {
  const dateCtx = useContext(DateContext);

  const [selected, setSelected] = useState(options[0]);

  const optionSelected = (option) => {
    return selected === option ? styles.selected : {};
  };

  const textSelected = (text) => {
    return selected === text ? { fontWeight: "500" } : {};
  };

  let key = 1;

  let filteredData = [];

  if (!collapsed) {
    filteredData = meals.filter(
      (item) =>
        item.category === selected &&
        item.day == dateCtx.day &&
        item.month == dateCtx.month
    );
  } else {
    filteredData = meals.filter((item) => item.type === selected);
  }

  return (
    <>
      <View style={styles.container}>
        {options.map((option) => (
          <Pressable
            style={styles.option}
            onPress={() => {
              setSelected(option);
              onSelect(option);
            }}
            key={key++}
          >
            <View style={optionSelected(option)}>
              <Text style={[styles.text, textSelected(option)]}>{option}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {collapsed ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredData.map((item) => (
            <CollapsedMeal meal={item} key={item.id + Math.random()} />
          ))}
        </ScrollView>
      ) : (
        filteredData.map((item) => (
          <Meal {...item} key={item.id + Math.random()} />
        ))
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F4F5F6",
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: "row",
    marginVertical: 20,
    overflow: "hidden",
  },
  selected: {
    backgroundColor: "white",
    borderColor: "#e6e6e6",
    borderRadius: 20,
    elevation: 8,
    paddingVertical: 8,
  },
  option: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Menu;
