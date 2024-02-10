import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  serverTimestamp,
  setDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { useUser } from "./context/UserContext";

const AddAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const auth = getAuth();

  const { user, setUser } = useUser();
  const userId = auth.currentUser?.uid;

  const router = useRouter();

  const directToInterest = async (avatarName: string) => {
    if (!userId) {
      console.error("User or userID is undefined");
      return;
    }
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, { avatar: avatarName });
      console.log("Avatar added!");
    } catch (error) {
      console.error("Error adding avatar: ", error);
    }
    router.push("/interest");
  };

  const avatarSelected = async (avatarName: string) => {
    setSelectedAvatar(avatarName);
    const newUser = {
      name: user.name,
      email: user.email,
      major: user.major,
      year: user.year,
      userID: user.userID,
      avatar: avatarName,
      academic: user.academic,
      career: user.career,
      financial: user.financial,
      studentLife: user.studentLife,
    };
    setUser(newUser);
  };

  function directToSignUp() {
    router.push("/signup");
  }

  return (
    // <LinearGradient locations={[0, 1]} colors={["#fff9e9", "#fff"]} style={styles.container}>
    <View style={styles.outterMostContainer}>
      <ImageBackground
        source={require("../assets/images/gradient/whiteGradientAskNShare.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        {/* Back Button */}
        <View style={styles.backBtnContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={directToSignUp}>
            <Image
              style={styles.backBtnImg}
              source={require("../assets/images/icons/blackBack.png")}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.topPortion}>
          <Text style={[styles.title]}>Add an Avatar</Text>
          <Text style={[styles.subTitle]}>Pick your profile picture.</Text>
        </View>

        <View style={styles.avatarsContainer}>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar1")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar1"
                    ? require("../assets/images/avatars/avatar1Selected.png")
                    : require("../assets/images/avatars/avatar1.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar2")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar2"
                    ? require("../assets/images/avatars/avatar2Selected.png")
                    : require("../assets/images/avatars/avatar2.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar3")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar3"
                    ? require("../assets/images/avatars/avatar3Selected.png")
                    : require("../assets/images/avatars/avatar3.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar4")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar4"
                    ? require("../assets/images/avatars/avatar4Selected.png")
                    : require("../assets/images/avatars/avatar4.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar5")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar5"
                    ? require("../assets/images/avatars/avatar5Selected.png")
                    : require("../assets/images/avatars/avatar5.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar6")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar6"
                    ? require("../assets/images/avatars/avatar6Selected.png")
                    : require("../assets/images/avatars/avatar6.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar7")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar7"
                    ? require("../assets/images/avatars/avatar7Selected.png")
                    : require("../assets/images/avatars/avatar7.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar8")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar8"
                    ? require("../assets/images/avatars/avatar8Selected.png")
                    : require("../assets/images/avatars/avatar8.png")
                }
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => avatarSelected("avatar9")}>
              <Image
                style={[styles.avatar]}
                source={
                  selectedAvatar === "avatar9"
                    ? require("../assets/images/avatars/avatar9Selected.png")
                    : require("../assets/images/avatars/avatar9.png")
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: selectedAvatar === "" ? "#E6E6E6" : "#FFC940" },
          ]}
          onPress={() => directToInterest(selectedAvatar)}
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: selectedAvatar === "" ? "#9A969F" : "#3A3340" },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 32,
    color: "#453B4F",
    zIndex: 2,
    lineHeight: 20,
    fontFamily: "Stolzl Regular",
  },
  topPortion: {
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  avatarsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  avatar: {
    width: 88,
    height: 88,
    margin: 6,
  },
  nextButtonContainer: {
    marginLeft: 40,
    marginRight: 40,
  },
  nextButton: {
    backgroundColor: "#FFC940",
    marginTop: 60,
    width: "100%",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  nextButtonText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Stolzl Regular",
  },
});

export default AddAvatar;
