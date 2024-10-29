import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function MangaLayout() {
  const params = useLocalSearchParams();
  const [mangaTitle, setMangaTitle] = useState("");

  useEffect(() => {
    setMangaTitle(params.title);
  }, [params]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="detail"
        options={{ headerShown: true, title: mangaTitle }}
      />
      <Stack.Screen name="reader" options={{ headerShown: false }} />
    </Stack>
  );
}
