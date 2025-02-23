import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.tabIconSelected,
        headerShown: false,
        tabBarStyle: Platform.select({
          default: {
            position: "absolute",
            paddingHorizontal: 10,
            paddingTop: 5,
            backgroundColor: Colors.tabBarBackground,
            borderTopWidth: 0,
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            bottom: 20,
            left: 500,
            borderRadius: 20,
            marginHorizontal: "30%",
            height: 45,
            width: "40%",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="paw" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
