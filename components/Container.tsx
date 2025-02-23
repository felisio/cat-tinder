import { View, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";

type ContainerProps = PropsWithChildren<{
  style?: object;
}>;

function Container({ children, style }: ContainerProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Container;
