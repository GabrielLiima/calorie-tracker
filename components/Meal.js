import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Bar from "./Bar";

const Meal = ({
  id,
  imageUrl,
  name,
  calories,
  amount,
  protein,
  carbs,
  fat,
  type,
  percentProtein,
  percentCarbs,
  percentFat,
}) => {
  const navigator = useNavigation();

  const onPressHandler = () => {
    navigator.navigate("Details", {
      id: id,
      type: type,
      meal: {
        id: id,
        imageUrl: imageUrl,
        name: name,
        calories: calories,
        amount: amount,
        protein: protein,
        carbs: carbs,
        fat: fat,
        type: type,
        percentProtein: percentProtein,
        percentCarbs: percentCarbs,
        percentFat: percentFat,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{
            uri:
              type == "Foods"
                ? `https://spoonacular.com/cdn/ingredients_500x500/${imageUrl}`
                : imageUrl,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
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
          title={protein ? `${protein}g` : "-"}
          percentage={`${percentProtein}%`}
          details={"Protein"}
          color={"#63BA6A"}
        />
        <Bar
          title={carbs ? `${carbs}g` : "-"}
          percentage={`${percentCarbs}%`}
          details={"Carbs"}
          color={"#F7C442"}
        />
        <Bar
          title={fat ? `${fat}g` : "-"}
          percentage={`${percentFat}%`}
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
