import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

const Menu = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    onSelect(selected);
  }, []);

  const optionSelected = (option) => {
    return selected === option ? styles.selected : {};
  };

  const textSelected = (text) => {
    return selected === text ? { fontWeight: "500" } : {};
  };

  let key = 1;

  return (
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
    marginBottom: 20,
    marginTop: 20,
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
