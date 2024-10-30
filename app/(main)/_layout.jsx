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
            } else if (route.name === "settings") {
              iconName = "cog";
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
        };
      }}
    >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen
        name="bookmark"
        options={{ headerShown: true, title: "Bookmark" }}
      />
      <Tabs.Screen name="browse" options={{ headerShown: true }} />
    </Tabs>
  );
}
