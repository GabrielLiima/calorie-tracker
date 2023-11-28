import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MealsContext } from "../context/store/meals-context";

import Ionicons from "react-native-vector-icons/Ionicons";

const CollapsedMeal = ({ meal }) => {
  const navigator = useNavigation();

  const onPressHandler = () => {
    navigator.navigate("Details", { id: meal.id });
  };

  const mealsCtx = useContext(MealsContext);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
        </Text>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={styles.button}
              onPress={toggleModal}
            >
              <Ionicons name="add" size={15} />
            </Pressable>
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
      </View>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={toggleModal}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Meal</Text>
            <View style={styles.option}>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  mealsCtx.addMeal(meal, "Breakfast");
                  toggleModal();
                }}
              >
                <View style={{ padding: 12 }}>
                  <Text>Breakfast</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.option}>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  mealsCtx.addMeal(meal, "Lunch");
                  toggleModal();
                }}
              >
                <View style={{ padding: 12 }}>
                  <Text>Lunch</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.option}>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  mealsCtx.addMeal(meal, "Dinner");
                  toggleModal();
                }}
              >
                <View style={{ padding: 12 }}>
                  <Text>Dinner</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.cancel}>
              <Pressable
                android_ripple={{ color: "#ec4b4b" }}
                onPress={toggleModal}
              >
                <View style={{ padding: 12 }}>
                  <Text style={{ color: "white" }}>Cancel</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderColor: "#e6e6e6",
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 15,
    padding: 12,
  },
  innerContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  },
  details: {
    color: "#b5b3b3",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "#F4F5F6",
    borderColor: "#e6e6e6",
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginLeft: "auto",
  },
  modal: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 5,
    overflow: "hidden",
    padding: 15,
    width: "85%",
  },
  modalTitle: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 15,
    marginBottom: 15,
  },
  option: {
    borderColor: "#e6e6e6",
    borderRadius: 15,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 10,
  },
  cancel: {
    alignSelf: "flex-end",
    backgroundColor: "#ff715e",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default CollapsedMeal;
