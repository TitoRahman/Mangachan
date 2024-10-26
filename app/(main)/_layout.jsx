import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../../constant/colors";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "home") {
              iconName = "home";
            } else if (route.name === "bookmark") {
              iconName = "bookmark";
            } else if (route.name === "browse") {
              iconName = "book";
            }

            return (
              <Entypo
                name={iconName}
                size={size}
                color={
                  focused ? colors.ghost_white[200] : colors.ghost_white[400]
                }
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused
                    ? colors.ghost_white[200]
                    : colors.ghost_white[400],
                  fontSize: 12,
                }}
              >
                {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
              </Text>
            );
          },
          tabBarActiveTintColor: colors.ghost_white[200],
          headerShown: false,
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="bookmark" />
      <Tabs.Screen name="browse" />
    </Tabs>
  );
}
