import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../constant/colors";
import React from "react";
import CountryFlag from "react-native-country-flag";
import { Link } from "expo-router";
const defaultImage = require("../assets/imgNotFound.jpg");
const cardSize = { width: 170 };
export default function CardBook({
  id,
  title,
  cover,
  description = "",
  langIso = "id",
  progress = 0,
  status = "ongoing",
}) {
  return (
    <Link
      href={{
        pathname: "/manga/detail",
        params: {
          mangaId: id,
          title: title,
          cover: cover,
          description: description,
          status: status,
        },
      }}
      style={{ margin: 8 }}
    >
      <View style={styles.card}>
        <Image
          source={cover ? { uri: cover } : defaultImage}
          style={styles.cardImage}
        />
        <View style={{ display: progress === 0 ? "none" : "flex" }}>
          <View
            style={{
              height: 3,
              backgroundColor: colors.ghost_white[500],
              overflow: "hidden",
              width: `100%`,
            }}
          >
            <View
              style={{
                height: 3,
                backgroundColor: colors.ghost_white[100],
                width: `${progress}%`,
              }}
            />
          </View>
        </View>
        <View
          style={{
            margin: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Text style={styles.cardTitle}>
            {title.length > 24 ? `${title.substring(0, 64)}...` : title}
          </Text>
          <CountryFlag style={styles.cardLang} isoCode={langIso} size={14} />
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: cardSize.width,
    flexDirection: "column",
    justifyContent: "start",
    backgroundColor: "white",
  },
  cardImage: {
    width: cardSize.width,
    height: cardSize.width + 75,
    objectFit: "cover",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardLang: {},
});
