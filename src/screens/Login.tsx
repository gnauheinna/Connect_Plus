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
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color, Border } from "../../styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";
import * as Font from "expo-font";
import { app } from "../../firebase";
import { SavedPost, useSavedPostsContext } from "../context/savedPostsContext";

export default function LoginScreen({ navigation }) {
  const db = getFirestore();
  const { setSavedPostArr } = useSavedPostsContext();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // Remember me
  const handlePress = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const checkStoredUser = async () => {
      const storedUserID = await AsyncStorage.getItem("userUID");
      if (storedUserID) {
        setUserID(storedUserID);
        setIsLoggedIn(true);
      }
    };

    checkStoredUser();
  }, []);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleNewUserGoogle = async () => {
    // get a instance of Firebase db

    const userCollection = collection(db, "users");
    // create new object
    const newUser = {
      email,
      password,
      timestamp: serverTimestamp(),
      //name, major, year, interest
    };

    await addDoc(userCollection, newUser);
    setEmail("");
    setPassword("");
    // Show the success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  function nextpage() {
    navigation.navigate("Tabs");
  }
  function createUser() {
    navigation.navigate("SignUp");
  }

  const fetchSavedPosts = async (userID?: string) => {
    const db = getFirestore();
    let uid;
    if (userID) {
      uid = userID;
    } else {
      uid = user.userID;
    }
    let savedPosts = await getDoc(doc(db, "userSavedANS", uid));
    setSavedPostArr(
      savedPosts.data()["saved"].map((pid: string) => {
        let post: SavedPost = {
          postID: pid,
        };
        return post;
      })
    );
  };

  useEffect(() => {
    const updateUser = async () => {
      const usersCollection = collection(db, "users");
      if (userID) {
        const userInfo = await getDoc(doc(db, "users", userID));
        const userData = userInfo.data() as {
          name: string;
          email: string;
          major: string;
          year: string;
          userID: string;
          academic: boolean;
          career: boolean;
          avatar: string;
          financial: boolean;
          studentLife: boolean;
          calendly: string;
          handle: string;
        };
        setUser(userData);
        fetchSavedPosts(userID);
      } else {
        console.error("User is not logged in");
      }
    };
    if (userID != "") {
      updateUser();
    }
  }, [userID]);

  // useEffect(() => {
  //   if (user.name != "") {
  //     nextpage();
  //   }
  // }, [user]);

  function LogIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setLoginError(null);
        setUserID(user.uid);
        setIsLoggedIn(true);
        AsyncStorage.setItem("userUID", user.uid); // Store user UID in AsyncStorage
        nextpage();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
        console.log(errorCode + errorMessage);
      });
  }

  // checks if the user is already logged in and skips the login page
  // useEffect(() => {
  //   const autoLogin = async () => {
  //     const storedToken = await AsyncStorage.getItem("userUID");
  //     console.log("Stored Token: ", storedToken);
  //     if (storedToken) {
  //       setIsLoggedIn(true);
  //       nextpage();
  //     }
  //   };

  //   autoLogin();
  // }, []);

  function GoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
          setIsLoggedIn(true);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          nextpage();
        }
        console.log("Signed In with Google");
        // check if user exists, if not direct to onBoarding 1
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <View style={styles.outterMostContainer}>
      <ImageBackground
        source={require("../../assets/images/signUpGradientBackground.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.connectPlusLogo}
            source={require("../../assets/images/connectPlusLogo.png")}
          />
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeMessageContainer}>
          <Text style={styles.welcomeMessage}>Welcome to Connect+</Text>
          <Text style={styles.Subtitle}>Let's get started</Text>
        </View>

        {/* Bottom Container */}
        <View style={styles.container}>
          {/* Email */}
          <View style={[styles.inputContainer]}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          {/* Password */}
          <View style={[styles.inputContainer]}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={[styles.input]}
              secureTextEntry
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          {/* Remember Me */}
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={
                  isClicked
                    ? require("../../assets/images/remembermecheck.png")
                    : require("../../assets/images/RememberMeUncheck.png")
                }
                resizeMode="cover"
                style={styles.rememberMeImage}
              />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          {/* Sign In Button */}
          <View style={styles.signInBtn}>
            <TouchableOpacity onPress={LogIn}>
              <Text style={styles.createAccountText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Switch to Login Option */}
          <View style={styles.switchToSignUp}>
            <Text style={styles.switchToSignUpText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={createUser}>
              <Text style={{ fontFamily: "Stolzl Medium", fontSize: 16 }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    borderRadius: 22,
    marginHorizontal: "8%",
    padding: 30,
    backgroundColor: "white",
    marginBottom: 80,
    zIndex: 2,
  },
  logoContainer: {
    zIndex: 2,
    marginTop: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
    width: 131,
    height: 131,
    marginHorizontal: "35%",
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  connectPlusLogo: {
    height: 90,
    width: 90,
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
  },
  welcomeMessageContainer: {
    marginTop: 40,
    marginBottom: 60,
  },

  welcomeMessage: {
    fontSize: 24,
    color: "#453b4f",
    textAlign: "center",
    fontFamily: "Stolzl Bold",
  },
  Subtitle: {
    fontSize: 15,
    color: "rgba(69, 59, 79, 0.5)",
    paddingTop: 5,
    textAlign: "center",
    fontFamily: "Stolzl Regular",
  },
  inputTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "Stolzl Medium",
  },
  inputContainer: {
    marginTop: 5,
  },
  input: {
    borderRadius: 12,
    width: "100%",
    paddingLeft: 16,
    height: 42,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#CACACA",
    fontSize: 16,
    fontFamily: "Stolzl Regular",
  },
  rememberMeContainer: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rememberMeText: {
    color: "#9b9b9b",
    fontSize: 14,
  },
  rememberMeImage: {
    width: 21,
    height: 21,

    marginLeft: 2,
    marginRight: 10,
  },
  signInBtn: {
    backgroundColor: "#FFC940",
    marginTop: 48,
    marginBottom: 48,
    width: 278,
    height: 48,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  createAccountText: {
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Stolzl Regular",
  },
  orDivider: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  line1: {
    height: 1,
    width: 80,
    marginRight: 15,
    backgroundColor: "#8F8F8F",
  },
  line2: {
    height: 1,
    width: 80,
    marginLeft: 15,
    backgroundColor: "#8F8F8F",
  },
  orText: {
    color: "#8F8F8F",
    fontSize: 12,
    fontFamily: "Stolzl Regular",
  },
  thirdPartyLogIn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  thirdPartyIcon: {
    borderRadius: 50,
    backgroundColor: "#FEF7FF",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  switchToSignUp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  switchToSignUpText: {
    fontSize: 16,
    fontFamily: "Stolzl Regular",
  },
});
