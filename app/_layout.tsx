import { Stack } from "expo-router";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { useEffect, useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Font from "expo-font";
import { UserProvider } from "./context/UserContext";

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (getApps() == null) {
    const app = initializeApp(firebaseConfig);
    if (!app) return <View />;
  }

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // The key is the name you'll use in your styles. The value is the path to the font file.
        "Stolzl Bold": require("../assets/fonts/stolzlBold.ttf"),
        "Stolzl Medium": require("../assets/fonts/stolzlMedium.otf"),
        "Stolzl Regular": require("../assets/fonts/stolzlRegular.ttf"),
        "Stolzl Light": require("../assets/fonts/stolzlLight.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Or any other placeholder content
  }

  return (
    <UserProvider>
      <RootLayoutNav />
    </UserProvider>
  );
};
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log("in layout");
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/signup" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default RootLayout;
