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

  function handleSearch() {
    setMangas([]);
    setLoading(true);
    debounceGetManga();
  }

  const debounceGetManga = debounce(() => getManga(), 500);

  async function getManga() {
    console.log("Fetching mangas with title", searchValue);
    try {
      const dataManga = await getMangas(searchValue);
      setMangas(dataManga);
    } catch (error) {
      console.error("Failed to fetch mangas.", error);
    } finally {
      setLoading(false);
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
