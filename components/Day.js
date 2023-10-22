import { Pressable, Text, StyleSheet, View } from "react-native";

const Day = ({ day, month, active, setActiveDay }) => {
  const onPressHandler = () => {
    setActiveDay(day);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: day == active ? "#fe7648" : "#fafafa",
          borderColor: day == active ? "#ff612b" : "#e6e6e6",
        },
      ]}
    >
      <Pressable android_ripple={{ color: "#ccc" }} onPress={onPressHandler}>
        <View style={styles.innerContainer}>
          <Text
            style={[styles.month, { color: day == active ? "white" : "black" }]}
          >
            {month}
          </Text>
          <Text
            style={[styles.day, { color: day == active ? "white" : "#b5b3b3" }]}
          >
            {day}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
    width: 60,
  },
  innerContainer: {
    alignItems: "center",
    padding: 10,
  },
  month: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 3,
  },
  day: {
    fontSize: 20,
  },
});

export default Day;
