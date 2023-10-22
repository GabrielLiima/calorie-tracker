import { Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const Setting = ({ name, icon }) => {
  return (
    <View style={styles.container}>
      <Pressable android_ripple={{color: "#cacaca"}}>
        <View style={styles.setting}>
          <View style={styles.icon}>
            <Ionicons name={icon} size={25} color={"black"} />
          </View>
          <Text style={styles.text}>{name}</Text>
          <View style={styles.arrow}>
            <Ionicons name="chevron-forward" size={18} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderBottomColor: "#e9e9e9",
    borderBottomWidth: 1,
    marginBottom: 12,
    overflow: "hidden"
  },
  setting: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    padding: 8,
  },
  icon: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 8,
  },
  text: {
    fontSize: 16,
  },
  arrow: {
    alignItems: "flex-end",
    flex: 1, 
  }
});

export default Setting;
