import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getChapterUri } from "../../api/mangadex";
import ImageViewer from "react-native-image-zoom-viewer";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function ReaderPage() {
  const { chapterId } = useLocalSearchParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pagesData = await getChapterUri(chapterId);
        setPages(pagesData);
        setError(false);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [chapterId]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load pages.</Text>
      ) : (
        <ImageViewer
          imageUrls={pages.map((page) => ({ url: page }))}
          enableSwipeDown={true}
          onSwipeDown={() => console.log("Swipe down detected")}
          index={0}
          loadingRender={() => <ActivityIndicator size="large" />}
          renderImage={(props) => (
            <Image
              {...props}
              resizeMode="contain" // Use contain to keep image aspect ratio
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
