import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Bar from "./Bar";

const Meal = ({
  id,
  imageUrl,
  title,
  calories,
  amount,
  protein,
  carbs,
  fat,
}) => {
  const navigator = useNavigation();

  const onPressHandler = () => {
    navigator.navigate("Details", { id: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.details}>
            <Ionicons name="flame" color="red" size={15} />
            {`${calories} kcal · ${amount}g`}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={styles.button}
            onPress={onPressHandler}
          >
            <Ionicons name="ellipsis-horizontal" size={15} />
          </Pressable>
        </View>
      </View>
      <View style={styles.contents}>
        <Bar
          percentage={`${(protein / amount) * 100}%`}
          title={`${protein}g`}
          details={"Protein"}
          color={"#63BA6A"}
        />
        <Bar
          percentage={`${(carbs / amount) * 100}%`}
          title={`${carbs}g`}
          details={"Carbs"}
          color={"#F7C442"}
        />
        <Bar
          percentage={`${(fat / amount) * 100}%`}
          title={`${fat}g`}
          details={"Fat"}
          color={"#A79EDE"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderColor: "#e6e6e6",
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 20,
    padding: 12,
  },
  contents: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
  },
  buttonContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#F4F5F6",
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: "auto",
    overflow: "hidden",
  },
  image: {
    borderRadius: 10,
    height: 50,
    marginRight: 12,
    width: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },
  details: {
    color: "#b5b3b3",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Meal;
