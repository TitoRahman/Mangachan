import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MangaLayout() {
  const params = useLocalSearchParams();
  const [mangaTitle, setMangaTitle] = useState("");
  const [mangaId, setMangaId] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setMangaId(params.mangaId);
    setMangaTitle(params.title);
    AsyncStorage.getItem(mangaId).then((data) => {
      setIsBookmarked(data !== null);
    });
  }, [params]);

  const handleBookmark = () => {
    if (isBookmarked) {
      AsyncStorage.removeItem(mangaId);
    } else {
      AsyncStorage.setItem(mangaId, JSON.stringify(params));
    }
    setIsBookmarked(!isBookmarked);
  };
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="detail"
        options={{
          headerShown: true,
          title: mangaTitle,
          headerRight: () => (
            <IconButton
              icon={isBookmarked ? "bookmark" : "bookmark-outline"}
              onPress={handleBookmark}
            />
          ),
        }}
      />
      <Stack.Screen name="reader" options={{ headerShown: false }} />
    </Stack>
  );
}
