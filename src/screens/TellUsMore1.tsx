import { View, Text, Button, TextField } from "react-native-ui-lib";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
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
  //   const [newIdentity, setNewIdentity] = useState<identity | null>(null);
  const [newlocation, setNewLocation] = useState<string[]>([
    "Boston",
    "Greater Boston",
    "Massachusetts",
  ]);
  const [newstudies, setNewStudies] = useState<string[]>([
    "College of Fine Arts",
    "Art",
    "Senior",
  ]);
  const [newInterest, setNewInterest] = useState<string[]>([
    "Career Advice",
    "UI/UX",
    "Financial Literacy",
  ]);
  const nextPage = async () => {
    try {
      //   await updateData();
      await navigation.navigate("TellUsMore2");
    } catch (error) {
      console.error("Error going to next page:", error);
    }
  };

  const lastPage = () => {
    navigation.navigate("TellUsMore2");
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

  return (
    <View style={styles.outterMostContainer}>
      <ScrollView style={styles.informationContainer}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Help us get to know you better</Text>
          <Text style={styles.pageDescription}>
            Enhance your matching experience
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location *</Text>
          <View style={styles.itemsContainer}>
            {newlocation.map((location) => (
              <View style={styles.itemChip}>
                <Text style={styles.itemText}>{location}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.addButton}>
            <Image
              source={require("../../assets/images/icons/AddPlus.png")}
              style={styles.addPlus}
            />
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Studies *</Text>
          <View style={styles.itemsContainer}>
            {newstudies.map((study) => (
              <View style={styles.itemChip}>
                <Text style={styles.itemText}>{study}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.addButton}>
            <Image
              source={require("../../assets/images/icons/AddPlus.png")}
              style={styles.addPlus}
            />
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Interested in *</Text>
          <View style={styles.itemsContainer}>
            {newInterest.map((interest) => (
              <View style={styles.itemChip}>
                <Text style={styles.itemText}>{interest}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.addButton}>
            <Image
              source={require("../../assets/images/icons/AddPlus.png")}
              style={styles.addPlus}
            />
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Pressable style={styles.backButtonContainer} onPress={lastPage}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Pressable style={styles.nextButtonContainer} onPress={nextPage}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  informationContainer: {
    marginTop: 60,
    padding: 50,
  },
  header: {
    paddingTop: 70,
    paddingBottom: 10,
  },
  pageTitle: {
    fontFamily: "Stolzl Bold",
    fontSize: 27,
  },
  pageDescription: {
    fontFamily: "Stolzl Regular",
    fontSize: 16,
    paddingTop: 8,
  },
  sectionContainer: {
    paddingTop: 30,
  },
  sectionTitle: {
    fontFamily: "Stolzl Medium",
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  itemsContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  itemChip: {
    height: 42,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F0E7FE",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Stolzl Regular",
    fontSize: 15,
    color: "#724EAE",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,
  },
  addPlus: {
    width: 14,
    height: 14,
  },
  addText: {
    fontFamily: "Stolzl Bold",
    color: "#724EAE",
    paddingLeft: 7,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 98,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomBarButton: {
    height: "100%",
  },
  backButtonContainer: {
    marginLeft: 43,
    marginTop: 37,
    height: "100%",
  },
  backText: {
    fontFamily: "Stolzl Regular",
    fontSize: 20,
    color: "#9C93A4",
  },
  nextButtonContainer: {
    marginRight: 43,
    marginTop: 25,
    paddingVertical: 10.5,
    paddingHorizontal: 36.5,
    width: 123,
    height: 45,
    backgroundColor: "#FFD232",
    borderRadius: 74,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontFamily: "Stolzl Regular",
    fontSize: 20,
    color: "#212121",
  },
});
