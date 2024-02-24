import * as React from "react";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PostProvider } from "./src/context/postContext";
import { PostIdProvider } from "./src/context/PostIDContext";
import { CurrentChatContextProvider } from "./src/context/currentChatContext";
import { SavedJourneyProvider } from "./src/context/savedJourneyContext";
import { UserProvider } from "./src/context/UserContext";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { initializeApp, getApps } from "firebase/app";
import { useCallback } from "react";
import { firebaseConfig, app } from "./firebase";
import { View, Text, useColorScheme } from "react-native";
import * as Font from "expo-font";
import LoginScreen from "./src/screens/Login";
import SignUpScreen from "./src/screens/SignUp";
import InterestScreen from "./src/screens/Interest";
import AddAvatarScreen from "./src/screens/AddAvatar";
import PostDetailsScreen from "./src/screens/PostDetails";
import MyTabs from "./src/tab/Tab";
import PostScreen from "./src/screens/post";
import IndividualChatScreen from "./src/screens/IndividualChat";
import SeeAllJourneysScreen from "./src/screens/SeeAllJourneys";
import NeriScreen from "./src/screens/MyJourneyPosts/Neri";
import BaileyScreen from "./src/screens/MyJourneyPosts/Bailey";
import NanaScreen from "./src/screens/MyJourneyPosts/Nana";
import JuliaScreen from "./src/screens/MyJourneyPosts/Julia";
import RachelScreen from "./src/screens/MyJourneyPosts/Rachel";
import RachelFeaturedScreen from "./src/screens/MyJourneyPosts/RachelFeatured";
import ShatevaScreen from "./src/screens/MyJourneyPosts/Shateva";
import ShatevaFeaturedScreen from "./src/screens/MyJourneyPosts/ShatevaFeatured";

// Create a Stack navigator
const Stack = createStackNavigator();
//SplashScreen.preventAutoHideAsync();
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
      <PostIdProvider>
        <PostProvider>
          <CurrentChatContextProvider>
            <SavedJourneyProvider>
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
                  <Stack.Screen
                    name="AddAvatar"
                    component={AddAvatarScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PostDetails"
                    component={PostDetailsScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Tabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Post"
                    component={PostScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="IndividualChat"
                    component={IndividualChatScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SeeAllJourneys"
                    component={SeeAllJourneysScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="neri"
                    component={NeriScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="bailey"
                    component={BaileyScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="nana"
                    component={NanaScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="julia"
                    component={JuliaScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="rachel"
                    component={RachelScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="rachelFeatured"
                    component={RachelFeaturedScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="shateva"
                    component={ShatevaScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="shatevaFeatured"
                    component={ShatevaFeaturedScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SavedJourneyProvider>
          </CurrentChatContextProvider>
        </PostProvider>
      </PostIdProvider>
    </UserProvider>
  );
}
