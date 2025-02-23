import { StyleSheet, Pressable, Animated, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRef } from "react";
import { Colors } from "@/constants/Colors";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

export default function CustomSwitch({
  value,
  onValueChange,
  style,
}: CustomSwitchProps) {
  const switchAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggleSwitch = () => {
    const toValue = value ? 0 : 1;
    onValueChange(!value);
    Animated.spring(switchAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  return (
    <Pressable onPress={toggleSwitch} style={[styles.customSwitch, style]}>
      <MaterialCommunityIcons
        name="fire"
        size={24}
        color={value ? Colors.grey : "#FF3B30"}
        style={styles.switchIcon}
      />
      <AntDesign
        name="star"
        size={24}
        color={value ? "#FFD700" : Colors.grey}
        style={styles.switchIcon}
      />
      <Animated.View
        style={[
          styles.switchThumb,
          {
            transform: [
              {
                translateX: switchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [4, 44],
                }),
              },
            ],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customSwitch: {
    width: 88,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E9E9EA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
  },
  switchThumb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    position: "absolute",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  switchIcon: {
    zIndex: 1,
    marginHorizontal: 8,
  },
});
