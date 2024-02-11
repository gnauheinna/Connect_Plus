import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, ScrollView, Image, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import MJPostCard from "../components/MJPostCard";
import Search from "../components/search";

export default function SeeAllJourneysScreen({ navigation }) {
  function directToMyJourneyPost(postName: string) {
    navigation.navigate(postName);
  }
  function directToMyJourney() {
    navigation.navigate("MyJourneys");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.outermostContainer}>
        <ImageBackground
          source={require("../../assets/images/gradient/whiteGradientAskNShare.png")}
          resizeMode="cover"
          style={styles.gradientBackground}
        >
          {/* Back Button and Page Title */}
          <View style={styles.backBtnContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={directToMyJourney}
            >
              <Image
                style={styles.backBtnImg}
                source={require("../../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>

            <View style={styles.pageTitleContainer}>
              <Text style={styles.pageTitle}>More Journeys</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.searchBarContainer}>
          <Search navigation={navigation} />
        </View>

        <View style={styles.container}>
          <View style={styles.allJourneysContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Rachel Li's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("rachel")}
                img={require("../../assets/images/mentorMyJourneyPics/rachel.png")}
                title="Save on Groceries"
                name="Rachel Li"
                year="Class of 2024, Data Science Major"
              />

              {/* Julia Tran's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("julia")}
                img={require("../../assets/images/mentorMyJourneyPics/julia.png")}
                title="I (Accidentally) Got a Job!"
                name="Julia Tran"
                year="Class of 2027, Business Administration Major"
              />

              {/* Neri Ajiatas Arreaga's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("neri")}
                img={require("../../assets/images/mentorMyJourneyPics/neri.png")}
                title="Finding Community"
                name="Neri Ajiatas Arreaga"
                year="Class of 2025, Data Science Major"
              />

              {/* Shateva Long's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("shateva")}
                img={require("../../assets/images/mentorMyJourneyPics/shateva.png")}
                title="I Got To Create My Own 4 Credit CS Course!"
                name="Shateva Long"
                year="Alumni"
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F9F6FF",
  },
  gradientBackground: {
    width: "100%",
    height: 120,
    zIndex: 1,
  },
  backBtnContainer: {
    top: 60,
    left: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    zIndex: 2,
    backgroundColor: "transparent",
  },
  backBtn: {
    padding: 5,
    resizeMode: "contain",
    justifyContent: "center",
    marginRight: 50,
  },
  backBtnImg: {
    width: 20,
    height: 20,
  },
  pageTitleContainer: {
    zIndex: 2,
    backgroundColor: "transparent",
  },
  pageTitle: {
    fontSize: 24,
    color: "#453B4F",
    fontWeight: "bold",
    backgroundColor: "transparent",
    fontFamily: "Stolzl Bold",
  },
  searchBarContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent",
  },
  featuredJourney: {
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 3,
    marginBottom: 5,
    marginRight: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
      // borderRadius: 15,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  featuredJourneyImg: {
    maxWidth: 300,
    maxHeight: 200,
    borderRadius: 15,
  },
  allJourneysContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    marginTop: 10,
    justifyContent: "flex-start",
  },
});
