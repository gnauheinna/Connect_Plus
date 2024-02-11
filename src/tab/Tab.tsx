import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Profile";
import AskNShareScreen from "./AskNShare";
import MessageScreen from "./Messages";
import MyJourneyScreen from "./MyJourneys";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyJourneys"
        component={MyJourneyScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AskNShare"
        component={AskNShareScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
