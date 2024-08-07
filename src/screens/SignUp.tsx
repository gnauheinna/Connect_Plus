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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import firebase, { getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "firebase/storage";
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
import { app, storage } from "../../firebase";
import { BorderlessButton } from "react-native-gesture-handler";

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

  const uriToBlob = async () => {
    const { uri } = await FileSystem.getInfoAsync(avatar);
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Profile picture network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

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
        // create empty saved ANS posts
        await setDoc(doc(db, "userSavedANS", user.uid), { saved: [] });

        // upload profile picture to storage
        const pfpRef = ref(storage, `profilePictures/${userID}.jpg`);
        const blob = await uriToBlob();
        await uploadBytes(pfpRef, blob).then((snapshot) => {
          console.log("Uploaded file", snapshot);
        });
        // set user handle
        await updateDoc(newUserRef, { handle: handle });
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

  const handleProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  const naviSuccessPage = async () => {
    navigation.navigate("SuccessSignUp")
  }
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
          <Text style={[styles.subTitle]}>  First, the basics</Text>
          <View style={styles.inputBoxContainer}>
            <Text style={[styles.inputquery]}> Full Name *</Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholder="ex. Rachel Li"
                style={styles.input}
                value={name}
                onChangeText={(name) => setName(name)}
                placeholderTextColor="#A3A3A3"
              />
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={styles.inputquery}> Pronouns</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  placeholder="ex. She/Her"
                  style={[styles.input]}
                  value={handle}
                  onChangeText={(handle) => setHandle(handle)}
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>

            <View style={{ marginTop: 3 }}>
              <Text style={styles.inputquery}> Username *</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  placeholder="ex. lirachel25"
                  style={[styles.input]}
                  value={handle}
                  onChangeText={(handle) => setHandle(handle)}
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>

            <View style={{ marginTop: 3 }}>
              {avatar !== "" && (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: avatar }}
                />
              )}
              <Text style={styles.inputquery}> Profile Picture </Text>
              <TouchableOpacity style={styles.pfpbutton} onPress={handleProfilePicture}>
                <Text style={styles.pfpbuttontext}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Add a react-native ImagePicker for uploading avatars */}
        </View>
        <View style={styles.nextButtonContainer}>
        {/* <TouchableOpacity style={styles.nextButton} onPress={handleSignup}> */}
          <TouchableOpacity style={styles.nextButton} onPress={naviSuccessPage}>
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
    justifyContent: "center",
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
    marginTop: 30,
    fontSize: 28,
    fontFamily: "Stolzl Bold",
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
  inputBoxContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingLeft: 15,
    width: "100%",
    height: 42,
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "#A3A3A3",
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
  inputquery: {
    marginTop: 10,
    fontFamily: "Stolzl Medium",
  },
  pfpbutton: {
    borderWidth: 3,
    borderColor: "#754EAD",
    marginTop: 10,
    width: 165,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  pfpbuttontext: {
    width: "100%",
    borderRadius: 25,
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Stolzl Medium",
    color: "#724EAD",
  },
  nextButtonContainer: {
    marginLeft: 240,
    marginRight: 40,
    marginTop: 24,
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
    fontFamily: "Stolzl Medium",
  },
});
