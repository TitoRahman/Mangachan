import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useNavigation } from "expo-router";
import { getMangas } from "../../api/mangadex";
import CardBook from "../../components/book-card";
import { debounce } from "lodash";
export default function BrowsePage() {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(10);
  const [total, setTotal] = useState(0);
  function handleSearch() {
    setMangas([]);
    setLoading(true);
    setTotal(0);
    setOffset(10);
    debounceGetManga();
  }

  const debounceGetManga = debounce(() => getManga(), 500);
  const debounceGetMoreManga = debounce(() => getMoreManga(), 500);

  async function getManga() {
    try {
      const dataManga = await getMangas(searchValue);
      setMangas(dataManga);
      setTotal(dataManga.total);
    } catch (error) {
      console.error("Failed to fetch mangas.", error);
    } finally {
      setLoading(false);
    }
  }
  async function getMoreManga() {
    try {
      if (mangas.length >= total) return;
      setLoadingMore(true);
      const dataManga = await getMangas(searchValue, 10, offset);
      setMangas((prevMangas) => [...prevMangas, ...dataManga]);
      setOffset((prevOffset) => prevOffset + 10);
    } catch (error) {
      console.error("Failed to fetch more mangas.", error);
    } finally {
      setLoadingMore(false);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Searchbar
          placeholder="Search Mangas"
          onChangeText={setSearchValue}
          onSubmitEditing={handleSearch}
          value={searchValue}
          style={{ backgroundColor: "white" }}
        />
      ),
      headerTitleContainerStyle: {
        width: "100%",
      },
    });
  }, [navigation, searchValue]);

  return (
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator style={style.centerContent} />
      ) : mangas.length === 0 ? (
        <Text style={style.centerContent}>No results found.</Text>
      ) : (
        <FlatList
          data={mangas}
          keyExtractor={(manga) => manga.id}
          renderItem={({ item: manga }) => (
            <CardBook
              cover={manga.coverArt}
              key={manga.id}
              title={manga.title}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={!loadingMore ? debounceGetMoreManga : null}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={style.centerContent} />
            ) : null
          }
          numColumns={2}
          columnWrapperStyle={style.row}
        />
      )}
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
