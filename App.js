import * as React from "react";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/Login";
import { UserProvider } from "./src/context/UserContext";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { initializeApp, getApps } from "firebase/app";
import { useCallback } from "react";
import { firebaseConfig, app } from "./firebase";
import { View, Text, useColorScheme } from "react-native";
import * as Font from "expo-font";
import SignUpScreen from "./src/screens/SignUp";
import InterestScreen from "./src/screens/Interest";
// Create a Stack navigator
const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();
export default function App() {
  console.log("rootlayout");
  const [fontsLoaded, fontError] = useFonts({
    "Stolzl Bold": require("./assets/fonts/stolzlBold.ttf"),
    "Stolzl Medium": require("./assets/fonts/stolzlMedium.otf"),
    "Stolzl Regular": require("./assets/fonts/stolzlRegular.ttf"),
    "Stolzl Light": require("./assets/fonts/stolzlLight.ttf"),
    ...FontAwesome.font,
  });
  if (getApps() == null) {
    console.log("rootlayout no firebase");
    const app = initializeApp(firebaseConfig);
    if (!app) return <View />;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Or any other placeholder content
  }
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Interest"
            component={InterestScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
