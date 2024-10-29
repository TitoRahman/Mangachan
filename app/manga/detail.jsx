import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function DetailPage() {
  const params = useLocalSearchParams();
  const { mangaId } = params;
  return (
    <View>
      <Text>Opened Manga ID : {mangaId}</Text>
    </View>
  );
}
