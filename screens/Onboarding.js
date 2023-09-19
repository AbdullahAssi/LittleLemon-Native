import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../constants/color";
import HeroSection from "../components/Hero";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setOnboardingCompleted, updateUser } = useContext(AppContext);

  const nav = useNavigation();

  useEffect(() => {
    const nameValid = name?.length > 3;
    const emailValid = email?.length > 6 && email?.includes("@");

    if (nameValid && emailValid) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [email, name]);

  const [firstName, lastName] = name.split(" ");

  const user = { firstName, lastName, email };

  const onNextPress = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      updateUser({ firstName, lastName, email });
      setOnboardingCompleted(true);
      nav.replace("Profile");
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeroSection disableSearch />
      <View style={styles.middleContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>First Name *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, isButtonDisabled && styles.disabledButton]}
          disabled={isButtonDisabled}
          onPress={onNextPress}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  middleContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexGrow: 1,
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.BLACK,
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
    paddingVertical: 30,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: colors.BLACK,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  footer: {
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  nextButton: {
    display: "flex",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
