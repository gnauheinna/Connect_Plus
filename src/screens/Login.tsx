import { View, Text, Button, TextField } from "react-native-ui-lib";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { TouchableOpacity, ImageBackground } from "react-native";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color, Border } from "../../styles/GlobalStyles";

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

export default function LoginScreen({ navigation }) {
  const db = getFirestore();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");

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
    navigation.navigate("Profile");
  }
  function createUser() {
    navigation.navigate("SignUp");
  }

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
        };
        console.log("Index UserDATA: ", userData);
        setUser(userData);
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
        console.log("logged In!");
        setLoginError(null);
        setUserID(user.uid);
        setIsLoggedIn(true);
        nextpage();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
        console.log(errorCode + errorMessage);
      });
  }

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
        source={require("../../assets/images/gradient/whiteGradientAskNShare.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.connectPlusLogo}
            source={require("../../assets/images/connectPlusLogo.png")}
          />
        </View>
      </ImageBackground>

      <View style={styles.container}>
        {/* ConnectPlus Logo */}
        {/* <Image
          style={styles.connectPlusLogo}
          source={require("../assets/images/connectPlusLogo.png")}
        /> */}

        {/* Welcome Message */}
        <View style={styles.welcomeMessageContainer}>
          <Text style={styles.welcomeMessage}>Welcome to Connect+</Text>
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={[styles.input]}
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        {/* Sign In Button */}
        <View style={styles.signInBtn}>
          <TouchableOpacity onPress={LogIn}>
            <Text style={styles.createAccountText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Divider for 3rd Party Login Options */}
        <View style={styles.orDivider}>
          <View style={styles.line1}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line2}></View>
        </View>

        <View style={styles.thirdPartyLogIn}>
          {/* Google Login Button */}
          <View>
            <TouchableOpacity onPress={GoogleLogin}>
              <Image
                source={require("../../assets/images/googleLogo.png")}
                style={[styles.thirdPartyIcon]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: 50 }}></View>
          {/* Kerberos Login Button */}
          <View>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/kerberosLogo.png")}
                style={[styles.thirdPartyIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Switch to Sign Up Option */}
        <View style={styles.switchToSignUp}>
          <Text style={styles.switchToSignUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={createUser}>
            <Text style={{ fontFamily: "Stolzl Medium", fontSize: 16 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    width: "100%",
    height: 220,
    zIndex: 1,
  },
  container: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "#F9F6FF",
    zIndex: 2,
  },
  logoContainer: {
    zIndex: 2,
    marginTop: 48,
  },
  connectPlusLogo: {
    height: 120,
    width: 140,
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 24,
  },
  welcomeMessageContainer: {
    marginBottom: 32,
  },
  welcomeMessage: {
    fontSize: 24,
    color: "#453b4f",
    textAlign: "center",
    fontFamily: "Stolzl Bold",
  },
  inputTitle: {
    color: "black",
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "Stolzl Regular",
  },
  inputContainer: {},
  input: {
    borderRadius: 10,
    width: "100%",
    paddingLeft: 16,
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
  // rememberMeContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  // rememberMeText: {
  //   color: "#9b9b9b",
  //   fontSize: 14,
  // },
  // checkboxContainer: {
  //   marginRight: 0,
  // },
  signInBtn: {
    backgroundColor: "#FFC940",
    marginTop: 48,
    marginBottom: 48,
    width: 320,
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
