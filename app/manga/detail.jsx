import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { getAllVolumes } from "../../api/mangadex";
import dateFormat from "../../helper/dateFormat";
import ViewMoreText from "react-native-view-more-text";
import { ActivityIndicator } from "react-native-paper";

const DetailPage = () => {
  const { mangaId, title, cover, description, status } = useLocalSearchParams();
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        const volumesData = await getAllVolumes(mangaId);
        setVolumes(volumesData);
      } catch (error) {
        console.error("Failed to fetch volumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumes();
  }, [mangaId]);

  const renderVolume = (volume, index) => (
    <Link
      key={index}
      href={{
        pathname: "/manga/reader",
        params: { mangaId, chapterId: volume.id },
      }}
    >
      <View style={styles.chapterLayout}>
        <Text style={styles.chapterTitle}>
          Vol.{volume.volume ?? "?"} Ch. {volume.chapter ?? "?"}
          {volume.title ? ` : ${volume.title}` : ""}
        </Text>
        <Text style={styles.chapterDate}>
          {dateFormat(volume.publishedAt ?? "")}
        </Text>
      </View>
    </Link>
  );

  const renderVolumes = () => {
    if (loading) return <ActivityIndicator />;
    if (volumes.length === 0) {
      return (
        <Text style={styles.noVolumesText}>
          There may not be an English translation for this manga 😔
        </Text>
      );
    }
    return volumes.map(renderVolume);
  };

  return (
    <ScrollView>
      <View style={styles.descriptionContainer}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: cover }} style={styles.descriptionImage} />
          <View>
            <Text style={styles.descriptionTitle}>{title}</Text>
            <Text>{status}</Text>
          </View>
        </View>
        <ViewMoreText numberOfLines={4} textStyle={styles.viewMoreText}>
          <Text style={styles.descriptionText}>
            {description ?? "No Description..."}
          </Text>
        </ViewMoreText>
      </View>
      <Text style={styles.chapterHeader}>Chapters</Text>
      <View style={styles.chapterContainer}>{renderVolumes()}</View>
    </ScrollView>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  descriptionContainer: {
    padding: 8,
    backgroundColor: "white",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  descriptionImage: {
    width: 175,
    height: 250,
    borderRadius: 4,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    width: 165,
  },
  descriptionText: {
    color: "gray",
  },
  viewMoreText: {
    textAlign: "justify",
  },
  chapterHeader: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: "white",
  },
  chapterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  chapterLayout: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    width: deviceWidth,
  },
  chapterTitle: {
    fontSize: 16,
  },
  chapterDate: {
    fontSize: 12,
    color: "gray",
  },
  noVolumesText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});

export default DetailPage;
