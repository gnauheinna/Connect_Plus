import * as React from "react";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  if (getApps().length == 0) {
    const app = initializeApp(firebaseConfig);
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
