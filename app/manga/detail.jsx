import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getVolumes } from "../../api/mangadex";
import dateFormat from "../../helper/dateFormat";
import { Chip } from "react-native-paper";
import ViewMoreText from "react-native-view-more-text";

export default function DetailPage() {
  const params = useLocalSearchParams();
  const { mangaId, title, cover, description, status } = params;
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVolumes(mangaId, 25, 0)
      .then((chapters) => {
        setVolumes(chapters);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mangaId]);

  return (
    <ScrollView>
      <View style={style.descriptionContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 8,
          }}
        >
          <Image source={{ uri: cover }} style={style.descriptionImage} />
          <View>
            <Text style={style.descriptionTitle}>{title}</Text>
            <Text>{status}</Text>
          </View>
        </View>
        <ViewMoreText numberOfLines={4} textStyle={{ textAlign: "justify" }}>
          <Text style={style.description}>
            {description ?? "No Description..."}
          </Text>
        </ViewMoreText>
      </View>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : volumes.length === 0 ? (
          <Text>There may not be an english translation for this manga 😔</Text>
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
      </View>
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
  descriptionContainer: {
    padding: 8,
    backgroundColor: "white",
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    width: 165,
  },
  description: {
    color: "gray",
  },
  descriptionImage: {
    width: 175,
    height: 250,
    borderRadius: 4,
  },
});
