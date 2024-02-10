import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { useUser } from "../../app/context/UserContext";
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function InterestScreen({ navigation }) {
  const [AIsChecked, setAIsChecked] = React.useState(false);
  const [CIsChecked, setCIsChecked] = React.useState(false);
  const [FIsChecked, setFIsChecked] = React.useState(false);
  const [SIsChecked, setSIsChecked] = React.useState(false);
  const { user, setUser } = useUser();
  const db = getFirestore();
  const auth = getAuth();
  const user1 = auth.currentUser;
  const userId = user.userID;

  function nextPage() {
    if (userId) {
      const userdata = doc(db, "users", userId);
      if (AIsChecked) {
        updateDoc(userdata, { academic: true });
      }
      if (FIsChecked) {
        updateDoc(userdata, { financial: true });
      }
      if (CIsChecked) {
        updateDoc(userdata, { career: true });
      }
      if (SIsChecked) {
        updateDoc(userdata, { studentLife: true });
      }
    }

    const newUser = {
      name: user.name,
      email: user.email,
      major: user.major,
      year: user.year,
      userID: user.userID,
      avatar: user.avatar,
      academic: AIsChecked,
      career: CIsChecked,
      financial: FIsChecked,
      studentLife: SIsChecked,
    };
    setUser(newUser);
    navigation.navigate("AddAvatar");
  }

  function AcademicChosen() {
    setAIsChecked(!AIsChecked);
  }
  useEffect(() => {
    console.log("Academic: ", AIsChecked);
  }, [AIsChecked]);

  function FinancialChosen() {
    setFIsChecked(!FIsChecked);
  }
  useEffect(() => {
    console.log("Financial: ", FIsChecked);
  }, [FIsChecked]);

  function CareerChosen() {
    setCIsChecked(!CIsChecked);
  }
  useEffect(() => {
    console.log("Career: ", CIsChecked);
  }, [CIsChecked]);

  function StuLifeChosen() {
    setSIsChecked(!SIsChecked);
  }
  useEffect(() => {
    console.log("Student Life: ", SIsChecked);
  }, [SIsChecked]);

  function directToAddAvatar() {
    navigation.navigate("AddAvatar");
  }

  return (
    <View style={styles.outterMostContainer}>
      <ImageBackground
        source={require("../assets/images/gradient/whiteGradientAskNShare.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        {/* Back Button */}
        <View style={styles.backBtnContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={directToAddAvatar}>
            <Image
              style={styles.backBtnImg}
              source={require("../assets/images/icons/blackBack.png")}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <Text style={[styles.title]}>Last Steps</Text>
        <Text style={[styles.subTitle]}>
          Tell us more about you! Please select at least one interest.
        </Text>
        <View style={styles.interestBoxContainer}>
          {/* Academic Button */}
          {AIsChecked ? (
            // Render this when AIsChecked is true
            <TouchableOpacity
              style={styles.interestBoxSelected}
              onPress={AcademicChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/academic.png")}
              />
              <Text style={styles.interestText}>Academics</Text>
            </TouchableOpacity>
          ) : (
            // Render this when AIsChecked is false
            <TouchableOpacity
              style={styles.interestBox}
              onPress={AcademicChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/academic.png")}
              />
              <Text style={styles.interestText}>Academics</Text>
            </TouchableOpacity>
          )}

          {/* Career Button */}
          {CIsChecked ? (
            // Render this when CIsChecked is true
            <TouchableOpacity
              style={styles.interestBoxSelected}
              onPress={CareerChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/career.png")}
              />
              <Text style={styles.interestText}>Career</Text>
            </TouchableOpacity>
          ) : (
            // Render this when CIsChecked is false
            <TouchableOpacity style={styles.interestBox} onPress={CareerChosen}>
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/career.png")}
              />
              <Text style={styles.interestText}>Career</Text>
            </TouchableOpacity>
          )}

          {/* Financial Button */}
          {FIsChecked ? (
            // Render this when FIsChecked is true
            <TouchableOpacity
              style={styles.interestBoxSelected}
              onPress={FinancialChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/financial.png")}
              />
              <Text style={styles.interestText}>Financial</Text>
            </TouchableOpacity>
          ) : (
            // Render this when FIsChecked is false
            <TouchableOpacity
              style={styles.interestBox}
              onPress={FinancialChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/financial.png")}
              />
              <Text style={styles.interestText}>Financial</Text>
            </TouchableOpacity>
          )}

          {/* Student Life Button */}
          {SIsChecked ? (
            // Render this when SIsChecked is true
            <TouchableOpacity
              style={styles.interestBoxSelected}
              onPress={StuLifeChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/stulife.png")}
              />
              <Text style={styles.interestText}>Student Life</Text>
            </TouchableOpacity>
          ) : (
            // Render this when SIsChecked is false
            <TouchableOpacity
              style={styles.interestBox}
              onPress={StuLifeChosen}
            >
              <Image
                style={styles.interestIcons}
                source={require("../assets/images/interestIcons/stulife.png")}
              />
              <Text style={styles.interestText}>Student Life</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Done Button */}
        <View style={styles.doneButtonContainer}>
          {!AIsChecked && !FIsChecked && !SIsChecked && !CIsChecked ? (
            // Render this when none of the interests is selected
            <TouchableOpacity
              style={styles.doneButtonDisabled}
              onPress={nextPage}
            >
              <Text style={styles.doneButtonTextDisabled}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.doneButton} onPress={nextPage}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  container: {
    justifyContent: "flex-start",
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "#F9F6FF",
  },
  backBtnContainer: {
    marginTop: 60,
    marginLeft: 40,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  backBtn: {
    padding: 5,
    resizeMode: "contain",
    justifyContent: "center",
  },
  backBtnImg: {
    width: 20,
    height: 20,
  },
  gradientBackground: {
    width: "100%",
    height: 120,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "Stolzl Medium",
    marginBottom: 8,
    color: "#453B4F",
    zIndex: 2,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 48,
    color: "#453B4F",
    zIndex: 2,
    lineHeight: 20,
    fontFamily: "Stolzl Regular",
  },
  interestBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  interestBoxSelected: {
    width: 145,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#FFEAB0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#49006C",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  interestBox: {
    width: 145,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#49006C",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  interestIcons: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: "contain",
  },
  interestText: {
    color: "#453B4F",
    fontSize: 16,
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Stolzl Regular",
  },
  checkbox: {
    borderRadius: 30,
  },
  doneButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonDisabled: {
    backgroundColor: "#DADADA",
    marginTop: 40,
    marginBottom: 40,
    width: "100%",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  doneButtonTextDisabled: {
    color: "#9B9B9B",
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Stolzl Regular",
  },
  doneButton: {
    backgroundColor: "#FFC940",
    marginTop: 40,
    marginBottom: 40,
    width: "100%",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  doneButtonText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Stolzl Regular",
  },
});
