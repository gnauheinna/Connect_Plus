import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native";

import firebase from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
import { useUser } from "../context/UserContext";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [calendly, setCalendly] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [userID, setUserID] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user, setUser } = useUser();
  const [academic, setAcademic] = useState(false);
  const [financial, setFinancial] = useState(false);
  const [studentLife, setStudentLife] = useState(false);
  const [career, setCareer] = useState(false);

  const auth = getAuth();
  const curuser = auth.currentUser;

  // create new object
  const newUser = {
    email,
    handle,
    password,
    timestamp: serverTimestamp(),
    name,
    major,
    year,
    academic,
    financial,
    career,
    studentLife,
    userID,
    avatar,
    calendly,
  };

  //triggers Firebase Auth to create new user
  function SignUp() {
    return new Promise<void>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserID(user.uid);
          setUser(newUser);
          setSignupError(null);
          resolve();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setSignupError(errorMessage);
          console.log(errorCode + errorMessage);
          reject(error);
        });
    });
  }
  // saves user data to firestore
  const handleNewUserEmail = async () => {
    // get a instance of Firebase db
    const db = getFirestore();
    const user = auth.currentUser;
    try {
      if (user) {
        const userID = user.uid;
        // create user on firestore
        const newUserRef = doc(db, "users", user.uid);
        await setDoc(newUserRef, newUser);
        // Update the document with the userID field
        await updateDoc(newUserRef, { userID });
        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", user.uid), {});
        // create empty savedJourneys
        await setDoc(doc(db, "savedJourneys", user.uid), { savedjourneys: [] });
        // create empty liked post list
        await setDoc(doc(db, "userLike", user.uid), { likes: [] });
        // create empty following on firestore
        await setDoc(doc(db, "following", user.uid), {});
        // set user handle
        await updateDoc(newUserRef, { handle: handle })
        // map user handle to user id
        const userHandleRef = doc(db, "userlist", handle);
        await setDoc(userHandleRef, { userID });
      }
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");

    setName("");
    setMajor("");
    setYear("");
    setUserID("");
    // Show the success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSignup = async () => {
    try {
      if (password === confirmPassword) {
        // Passwords match
        await SignUp();
        await handleNewUserEmail();
        directToAvatar();
      } else {
        // Passwords don't match
        Alert.alert("Error", "Passwords do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function directToIndex() {
    navigation.goBack();
  }
  function directToAvatar() {
    navigation.navigate("AddAvatar");
  }

  return (
    <KeyboardAvoidingView style={styles.outterMostContainer} behavior="padding">
      <ScrollView>
        <ImageBackground
          source={require("../../assets/images/gradient/whiteGradientAskNShare.png")}
          resizeMode="cover"
          style={styles.gradientBackground}
        >
          {/* Back Button */}
          <View style={styles.backBtnContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={directToIndex}>
              <Image
                style={styles.backBtnImg}
                source={require("../../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <Text style={[styles.title]}>Create Your Account</Text>
          <Text style={[styles.subTitle]}>
            Begin your journey here at Connect+
          </Text>
          <View style={[styles.inputContainer]}>
            <Image
              style={[styles.signUpIcons]}
              source={require("../../assets/images/signUpIcons/name.png")}
            />
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={(name) => setName(name)}
              placeholderTextColor="#A3A3A3"
            />
          </View>
          {/* </View> */}

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/email.png")}
              />
              <TextInput
                placeholder="Email"
                style={[styles.input]}
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/email.png")} // placeholder
              />
              <TextInput
                placeholder="User Handle"
                style={[styles.input]}
                value={handle}
                onChangeText={(handle) => setHandle(handle)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/password.png")}
              />
              <TextInput
                placeholder="Password"
                style={[styles.input]}
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/password.png")}
              />
              <TextInput
                placeholder="Confirm Password"
                style={[styles.input]}
                value={confirmPassword}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/major.png")}
              />
              <TextInput
                placeholder="Major"
                style={[styles.input]}
                value={major}
                onChangeText={(major) => setMajor(major)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>

          <View style={{ marginTop: 3 }}>
            <View style={[styles.inputContainer]}>
              <Image
                style={[styles.signUpIcons]}
                source={require("../../assets/images/signUpIcons/year.png")}
              />
              <TextInput
                placeholder="Year"
                style={[styles.input]}
                value={year}
                onChangeText={(year) => setYear(year)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
          </View>
        </View>

        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleSignup}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    backgroundColor: "#F9F6FF",
    flex: 1,
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
  signUpIcons: {
    width: 26,
    height: 26,
    position: "absolute",
    resizeMode: "contain",
    alignSelf: "center",
    zIndex: 1,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    borderRadius: 10,
    paddingLeft: 48,
    width: "100%",
    height: 42,
    marginVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderColor: "#E3E3E3",
    fontSize: 16,
    fontFamily: "Stolzl Regular",
    shadowColor: "#49006C",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  nextButtonContainer: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 24,
  },
  nextButton: {
    backgroundColor: "#FFC940",
    marginTop: 20,
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
