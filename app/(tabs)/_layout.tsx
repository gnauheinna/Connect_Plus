import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import PlusButton from "../../components/postButton";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useUser, UserProvider } from "../context/UserContext";
import { PostProvider } from "../context/postContext";
import { Image } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import JourneyScreen from "./journeys";
import { CurrentChatContextProvider } from "../context/currentChatContext";
import { SavedJourneyProvider } from "../context/savedJourneyContext";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useUser();

  // if (!isLoggedIn) {
  //   return <Redirect href="/" />;
  // } else {
  return (
    // <UserProvider>

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="journeys"
        options={{
          title: "Journeys",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/icons/changedJourney.png")
                  : require("../../assets/images/icons/myJourneyIcon.png")
              }
              // style={focused ? {width: 26, height: 26} : {width: 26, height: 26}}
              style={focused ? styles.navSelected : styles.navUnselected}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Ask & Share",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/icons/changedAsknShare.png")
                  : require("../../assets/images/icons/asknshareIcon.png")
              }
              style={focused ? styles.navSelected : styles.navUnselected}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/icons/changedMessaging.png")
                  : require("../../assets/images/icons/messagingIcon.png")
              }
              style={focused ? styles.navSelected : styles.navUnselected}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/icons/changedProfile.png")
                  : require("../../assets/images/icons/profileIcon.png")
              }
              style={focused ? styles.navSelected : styles.navUnselected}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>

    // </UserProvider>
  );
}
//}

const styles = StyleSheet.create({
  navSelected: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    backgroundColor: "transparent",
    shadowOpacity: 0, // This will remove the shadow on iOS
  },
  navUnselected: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    backgroundColor: "transparent",
    shadowOpacity: 0, // This will remove the shadow on iOS
  },
});
