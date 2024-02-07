import * as React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import { UserProvider } from "./src/context/UserContext";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig, app } from "./firebase";
import { View, Text, useColorScheme } from "react-native";
import * as Font from "expo-font";
// Create a Stack navigator
const Stack = createStackNavigator();

export default function App() {
  console.log("rootlayout");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (getApps() == null) {
    console.log("rootlayout no firebase");
    const app = initializeApp(firebaseConfig);
    if (!app) return <View />;
  }

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // The key is the name you'll use in your styles. The value is the path to the font file.
        "Stolzl Bold": require("./assets/fonts/stolzlBold.ttf"),
        "Stolzl Medium": require("./assets/fonts/stolzlMedium.otf"),
        "Stolzl Regular": require("./assets/fonts/stolzlRegular.ttf"),
        "Stolzl Light": require("./assets/fonts/stolzlLight.ttf"),
        ...FontAwesome.font,
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          {/* Add more screens here as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
