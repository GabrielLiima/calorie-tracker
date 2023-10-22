import { FlatList, View } from "react-native";
import { useState, useRef, useEffect } from "react";

import Day from "./Day";

const Calendar = () => {
  const currentDate = new Date();

  let dayOfMonth = currentDate.getDate();
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth.toString();

  const monthAbbreviation = currentDate.toLocaleString("default", {
    month: "short",
  });

  const [activeDay, setActiveDay] = useState(dayOfMonth);

  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      index: dayOfMonth - 1,
      animated: true,
    });
  }, [dayOfMonth]);

  const days = [];

  for (let i = 1; i <= 30; i++) {
    i < 10 ? days.push(`0${i}`) : days.push(i);
  }

  const renderDays = (itemData) => {
    return (
      <Day
        day={itemData.item}
        month={monthAbbreviation}
        active={activeDay}
        setActiveDay={setActiveDay}
      />
    );
  };

  const Separator = () => <View style={{ width: 15 }} />;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={days}
        keyExtractor={(item) => item}
        renderItem={renderDays}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        getItemLayout={(data, index) => ({
          length: 74.8,
          offset: 74.8 * index,
          index,
        })}
        initialScrollIndex={10}
      />
    </View>
  );
};

export default Calendar;
