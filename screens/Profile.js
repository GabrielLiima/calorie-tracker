import { ScrollView, StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Setting from "../components/Setting";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overview}>
          <View style={styles.icon}>
            <Ionicons name="person" size={40} color={"#cccccc"} />
          </View>
          <View>
            <Text style={styles.username}>Gabriel Lima</Text>
            <Text style={styles.email}>gabrieljunio25@gmail.com</Text>
          </View>
        </View>
        <View style={styles.settings}>
          <Setting name="Edit Profile" icon="person-circle-outline" />
          <Setting name="Settings" icon="settings-outline" />
          <Setting name="Help" icon="help-circle-outline" />
          <Setting name="Log Out" icon="log-out-outline" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
    paddingTop: 60,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#e9e7e7",
    borderRadius: 70,
    justifyContent: "center",
    height: 85,
    width: 85,
  },
  username: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 5
  },
  settings: {
    marginBottom: 15,
    marginTop: 30,
  },
  overview: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20
  },
  email: {
    color: "#cdcdcd",
    fontWeight: "500"
  }
});

export default Profile;
