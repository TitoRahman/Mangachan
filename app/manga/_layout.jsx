import React from "react";
import { Stack } from "expo-router";

export default function MangaLayout() {
  return (
    <Stack>
      <Stack.Screen name="detail" options={{ headerShown: false }} />
      <Stack.Screen name="reader" options={{ headerShown: false }} />
    </Stack>
  );
}
