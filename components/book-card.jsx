import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../constant/colors";
import React from "react";
import CountryFlag from "react-native-country-flag";
const defaultImage = require("../assets/imgNotFound.jpg");
const cardSize = { width: 140 };
export default function CardBook({
  title,
  cover,
  langIso = "id",
  progress = 0,
}) {
  return (
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
      <View style={{ margin: 5 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <CountryFlag style={styles.cardLang} isoCode={langIso} size={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    flexDirection: "column",
    justifyContent: "start",
    width: cardSize.width,
    backgroundColor: "white",
  },
  cardImage: {
    width: cardSize.width,
    height: cardSize.width + 75,
    objectFit: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardLang: {},
});
