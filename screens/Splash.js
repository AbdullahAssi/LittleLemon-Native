import { View } from "react-native";
import Header from "../components/Header/Header";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Header />
    </View>
  );
}
