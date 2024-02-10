import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { Text } from "../components/Themed";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { PostIdProvider } from "./context/PostIDContext";
import { PostProvider } from "./context/postContext";
import { CurrentChatContextProvider } from "./context/currentChatContext";
import { SavedJourneyProvider } from "./context/savedJourneyContext";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { LogBox } from "react-native";

// Ignore log notification by message
LogBox.ignoreLogs([
  // Exact message
  "Warning: componentWillReceiveProps has been renamed",

  // Substring or regex match
  /GraphQL error: .*/,
]);

// Ignore all log notifications
LogBox.ignoreAllLogs();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  if (getApps() == null) {
    const app = initializeApp(firebaseConfig);
    if (!app) return <View />;
  }

  const [loaded, error] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Stolzl Bold": require("../assets/fonts/stolzlBold.ttf"),
    "Stolzl Medium": require("../assets/fonts/stolzlMedium.otf"),
    "Stolzl Regular": require("../assets/fonts/stolzlRegular.ttf"),
    "Stolzl Light": require("../assets/fonts/stolzlLight.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log("not loaded");
    return null;
  } else {
    console.log("app will load");
  }

  return (
    <AuthProvider>
      <UserProvider>
        <PostIdProvider>
          <PostProvider>
            <CurrentChatContextProvider>
              <SavedJourneyProvider>
                <RootLayoutNav />
              </SavedJourneyProvider>
            </CurrentChatContextProvider>
          </PostProvider>
        </PostIdProvider>
      </UserProvider>
    </AuthProvider>
  );
}

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
        <Stack.Screen name="myjourneypost" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="interest" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="chatbox" options={{ headerShown: false }} />
        <Stack.Screen name="addavatar" options={{ headerShown: false }} />
        <Stack.Screen name="postdetails" options={{ headerShown: false }} />
        <Stack.Screen name="julia" options={{ headerShown: false }} />
        <Stack.Screen name="neri" options={{ headerShown: false }} />
        <Stack.Screen name="rachelFeatured" options={{ headerShown: false }} />
        <Stack.Screen name="rachel" options={{ headerShown: false }} />
        <Stack.Screen name="nana" options={{ headerShown: false }} />
        <Stack.Screen name="bailey" options={{ headerShown: false }} />
        <Stack.Screen name="shateva" options={{ headerShown: false }} />
        <Stack.Screen name="shatevaFeatured" options={{ headerShown: false }} />
        <Stack.Screen name="seeAllJourneys" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
