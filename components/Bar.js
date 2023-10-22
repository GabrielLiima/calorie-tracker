import { StyleSheet, Text, View } from "react-native";

const Bar = ({ percentage, title, details, color, horizontal }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          horizontal ? { height: 8, width: "100%", flexDirection: "row" } : {},
        ]}
      >
        <View
          style={[
            styles.progressBar,
            horizontal
              ? { width: percentage, backgroundColor: color }
              : { height: percentage, backgroundColor: color },
          ]}
        ></View>
      </View>
      {horizontal ? (
        <></>
      ) : (
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.details}>{details}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    flexDirection: "column-reverse",
    height: 50,
    marginRight: 10,
    overflow: "hidden",
    width: 8,
  },
  progressBar: {
    borderRadius: 5,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  details: {
    color: "#b5b3b3",
    fontSize: 15,
    fontWeight: "500",
  },
  container: {
    flexDirection: "row",
  },
});

export default Bar;
