import { View, Image, StyleSheet } from "react-native";
import { colors } from "../../constants/color";

const Header = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require("../../assets/Logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  image: {
    height: 30,
    width: 170,
    resizeMode: "contain",
  },
  avatar: {
    backgroundColor: colors.GREEN,
    height: 50,
    width: 50,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
});

export default Header;
