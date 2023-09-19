import React from "react";
import { StyleSheet, TextInput, View, Image, Text } from "react-native";
import { colors } from "../../constants/color";

const HeroSection = ({ setSearchInput, disableSearch }) => {
  return (
    <View style={styles.heroSection}>
      <Text style={styles.heroLL}>Little Lemon</Text>
      <Text style={styles.heroChicago}>Chicago</Text>
      <View style={styles.heroDescImageContainer}>
        <Text style={styles.heroDescription}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={require("../../assets/heroImage.png")}
          style={styles.heroImage}
        />
      </View>
      {!disableSearch && (
        <View style={styles.searchBarContainer}>
          <Image
            source={require("../../assets/searchIcon.png")}
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchInput} onChangeText={setSearchInput} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: colors.GREEN,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  heroLL: {
    fontSize: 60,
    color: colors.YELLOW,
    fontFamily: "Markazi",
    marginTop: -20,
  },
  heroChicago: {
    fontSize: 40,
    color: colors.GRAY,
    fontFamily: "Markazi",
    marginTop: -20,
  },
  heroDescImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroDescription: {
    fontSize: 15,
    color: colors.GRAY,
    maxWidth: 200,
    fontFamily: "Karla",
    marginTop: 10,
    marginBottom: 10,
  },
  heroImage: {
    height: 140,
    width: 120,
    marginTop: -30,
    borderRadius: 20,
  },
});

export default HeroSection;
