import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export default AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initalState = {
    isOnboardingCompleted: false,
  };

  const [globalState, setGlobalState] = useState(initalState);

  const setOnboardingCompleted = async (value = true) => {
    setGlobalState((prev) => ({
      ...prev,
      isOnboardingCompleted: value,
    }));
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("user");
    setOnboardingCompleted(false);
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const user = JSON.parse(user);
      setGlobalState((prev) => ({
        ...prev,
        user,
      }));
      return user;
    }
  };

  const updateUser = async (userObject) => {
    if (userObject) {
      const user = (await AsyncStorage.getItem("user")) || {};

      const updatedUser = { ...JSON.parse(user), ...userObject };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

      setGlobalState((prev) => ({
        ...prev,
        ...{ user: updatedUser },
      }));
      return updatedUser;
    }
  };

  return (
    <AppContext.Provider
      value={{
        globalState,
        setGlobalState,
        setOnboardingCompleted,
        logOut,
        getUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
