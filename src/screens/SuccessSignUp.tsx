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
export default function SuccessSignUpScreen({ navigation }) {
  function NextPage() {
    navigation.navigate("Login");
  }
  return (
    <View style={styles.outterMostContainer}>
      <ImageBackground
        source={require("../../assets/images/signUpGradientBackground.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        {/* Modal Container */}
        <View style={styles.container}>
          <Text style={styles.title}>Signed Up Successful!</Text>
          <View style={styles.textbox}>
            <Text style={styles.span1}>
              The next few steps are only for the purpose of making your
              experience here at Connect+ as personal as possible.
            </Text>
            <Text style={styles.span2}>
              Feel free to go back and edit your responses later.
            </Text>
          </View>
          <Pressable style={styles.button} onPress={NextPage}>
            <Text style={styles.buttontext}>Continue</Text>
          </Pressable>
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
  textbox: {
    justifyContent: "center",
    paddingHorizontal: "6%",
  },
  container: {
    flex: 1,
    borderRadius: 22,
    marginHorizontal: "8%",
    padding: 30,
    backgroundColor: "white",
    marginVertical: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    color: "#453b4f",
    textAlign: "center",
    fontFamily: "Stolzl Bold",
    fontSize: 25.24,
  },
  span1: {
    color: "#453b4f",
    textAlign: "center",
    fontFamily: "Stolzl Regular",
    fontSize: 12,
    marginTop: 20,
  },
  span2: {
    marginTop: 15,
    marginBottom: 20,
    color: "#453b4f",
    textAlign: "center",
    fontFamily: "Stolzl Regular",
    fontSize: 12,
  },
  button: {
    justifyContent: "center",
    borderRadius: 57,
    borderColor: "#724EAE",
    borderWidth: 3,
    width: 291,
    height: 44,
  },
  buttontext: {
    color: "#724EAE",
    textAlign: "center",
    fontFamily: "Stolzl Medium",
    fontSize: 18,
  },
});
