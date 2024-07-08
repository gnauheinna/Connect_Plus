import { View, Text, Button, TextField } from "react-native-ui-lib";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Image } from "react-native";
import { useUser } from "../context/UserContext";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { FontFamily, Color, Border } from "../../styles/GlobalStyles";

// type identity = {
//     firstgen: boolean;
//     gender: string[];
// }
export default function TellUsMore1Screen({ navigation }) {
  const db = getFirestore();
  const { user, setUser } = useUser();
  const [newlocation, setNewLocation] = useState("");
  const [newstudies, setNewStudies] = useState<string[] | null>(null);
  //   const [newIdentity, setNewIdentity] = useState<identity | null>(null);
  const [newInterest, setNewInterest] = useState<string[] | null>(null);

  const nextPage = async () => {
    try {
      await updateData();
      await navigation.navigate("Login"); // change to tellusMore2
    } catch (error) {
      console.error("Error going to next page:", error);
    }
  };

  const updateData = async () => {
    try {
      await setDoc(doc(db, "location", user.userID), { location: newlocation });
      await setDoc(doc(db, "studies", user.userID), { studies: newstudies });
      // await setDoc(doc(db, "identity", user.userID), {firstgen: newIdentity.firstgen, gender: newIdentity.gender});
      await setDoc(doc(db, "interest", user.userID), { interest: newInterest });
    } catch (error) {
      console.error("Error updating firebase:", error);
    }
  };

  return <View></View>;
}
