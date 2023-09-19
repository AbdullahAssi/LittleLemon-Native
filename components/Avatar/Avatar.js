import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../HOC/CustomButton";
import { colors } from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import AppContext from "../../context/AppContext";

const Avatar = ({ onPress, onlyAvatar, ...props }) => {
  const {
    globalState: { user },
    updateUser,
  } = useContext(AppContext);

  const { firstName, lastName, profileImageUri } = { ...user };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateUser({ profileImageUri: result.assets[0].uri });
    }
  };

  const clearImage = async () => {
    updateUser({ profileImageUri: null });
  };

  if (onlyAvatar) {
    return (
      <Pressable onPress={onPress}>
        {profileImageUri && (
          <Image
            source={{ uri: profileImageUri }}
            style={styles.avatarImage}
            {...props}
          />
        )}
        {!profileImageUri && (
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {firstName?.slice(0, 1)}
              {lastName?.slice(0, 1)}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View>
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.container}>
        {profileImageUri && (
          <Image
            source={{ uri: profileImageUri }}
            style={styles.avatarContainer}
            {...props}
          />
        )}
        {!profileImageUri && (
          <View style={styles.avatarContainer}>
            <Text style={styles.text}>
              {firstName?.slice(0, 1)}
              {lastName?.slice(0, 1)}
            </Text>
          </View>
        )}

        <CustomButton text={"Change"} onPress={pickImage} />
        {profileImageUri && (
          <CustomButton text={"Remove"} onPress={clearImage} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: "bold",
    color: "gray",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarContainer: {
    backgroundColor: colors.GREEN,
    height: 68,
    width: 68,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatar: {
    backgroundColor: colors.GREEN,
    height: 30,
    width: 30,
    fontSize: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  headerAvatarText: {
    color: colors.GRAY,
    fontSize: 10,
  },
  text: { color: colors.GRAY, fontSize: 30 },
});
export default Avatar;
