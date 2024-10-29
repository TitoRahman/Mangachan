import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getVolumes } from "../../api/mangadex";
import dateFormat from "../../helper/dateFormat";

export default function DetailPage() {
  const params = useLocalSearchParams();
  const { mangaId } = params;
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVolumes(mangaId)
      .then((chapters) => {
        setVolumes(chapters);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mangaId]);

  return (
    <ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          {volumes.map((volume, index) => (
            <View key={index} style={style.chapterLayout}>
              <Text style={style.chapterTitle}>
                Vol.{volume.volume ?? "?"} Ch. {volume.chapter ?? "?"}
                {volume.title ? ` : ${volume.title}` : ""}
              </Text>
              <Text style={style.chapterDate}>
                {dateFormat(volume.publishedAt ?? "")}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  chapterLayout: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  chapterTitle: {
    fontSize: 16,
  },
  chapterDate: {
    fontSize: 12,
    color: "gray",
  },
});
