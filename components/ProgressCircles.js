import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const ProgressCircles = ({ percentages, color, title, details }) => {
  const circleRadius = 16;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * (circleRadius - strokeWidth / 2);

  const calculateDashArray = (percentage) => {
    const dashArray = [(percentage / 100) * circumference, circumference];
    return dashArray.join(" ");
  };

  return (
    <View style={styles.container}>
      {percentages.map((percentage, index) => (
        <Svg
          key={index}
          height={circleRadius * 2}
          width={circleRadius * 2}
          style={{ marginRight: 10, transform: [{ rotate: '270deg' }], }}
        >
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius - strokeWidth / 2}
            fill="transparent"
            stroke="#e9eff6"
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius - strokeWidth / 2}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={calculateDashArray(percentage)}
            strokeLinecap="round"
          />
        </Svg>
      ))}
      <View>
        <Text style={styles.bold}>{title}</Text>
        <Text style={[styles.details, styles.bold]}>{details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bold: {
    fontWeight: "500",
  },
  details: {
    color: "#b5b3b3",
  },
});

export default ProgressCircles;
