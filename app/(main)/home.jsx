import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBook from "../../components/book-card";

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Continue Reading</Text>
        <CardBook
          title="Naruto"
          cover={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgy4RFkOhKbWbfX4h8mCLR1o6nWCXLT1h_lQ&s"
          }
          progress={50}
          langIso="id"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
});
