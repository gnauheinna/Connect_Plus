import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Profile";
import AskNShareScreen from "./AskNShare";
import MessageScreen from "./Messages";
import { Image } from "react-native";
import MyJourneyScreen from "./MyJourneys";

const Tab = createBottomTabNavigator();
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
      <Tab.Screen
        name="MyJourneys"
        component={MyJourneyScreen}
        options={{
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
      <Tab.Screen
        name="AskNShare"
        component={AskNShareScreen}
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
      <Tab.Screen
        name="Message"
        component={MessageScreen}
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
    </Tab.Navigator>
  );
};

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

export default MyTabs;
