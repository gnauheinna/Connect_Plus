import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Image } from "expo-image";

import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  TouchableOpacity,
  NativeScrollEvent,
} from "react-native";
import { useSavedJourneyContext } from "../../context/savedJourneyContext";
import { useUser } from "../../context/UserContext";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function RachelScreen({ navigation }) {
  const [isSaved, setIsSaved] = useState(false);
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const db = getFirestore();
  const { savedJourneys, setSavedJourneys, setLoading, loading } =
    useSavedJourneyContext();

  // updates savebutton status according to saveJourney context
  useEffect(() => {
    const isRachelSaved = savedJourneys.some(
      (journey) =>
        journey.authorName === "Rachel Li" &&
        journey.journeyTitle ===
          "The Ultimate SNAP Guide: Get $200 Monthly for Groceries"
    );
    if (isRachelSaved) {
      //Rachel's journey is saved
      setIsSaved(true);
    } else {
      // Rachel's journey is not saved
      setIsSaved(false);
    }
  }, []);

  const unsaveJourney = async () => {
    const updatedSavedJourneys = savedJourneys.filter(
      (journey) =>
        journey.authorName !== "Rachel Li" &&
        journey.journeyTitle !==
          "The Ultimate SNAP Guide: Get $200 Monthly for Groceries"
    );

    // updates context
    await setSavedJourneys(updatedSavedJourneys);
    // updates firestore
    // 1. get reference of Firestore document
    console.log("unsaving Journey userid: ", currentUserID);
    const savedjourneyDocRef = doc(db, "savedJourneys", currentUserID);
    // 2. get instance of document
    const savedjourneySnapshot = await getDoc(savedjourneyDocRef);
    // 3. Update the Firestore document with the modified savedJourneys array
    await updateDoc(savedjourneyDocRef, {
      savedjourneys: updatedSavedJourneys,
    });
  };

  const saveJourney = async () => {
    // If it doesn't exist, add a new entry
    const newJourney = {
      journeyTitle: "The Ultimate SNAP Guide: Get $200 Monthly for Groceries",
      authorName: "Rachel Li",
      journeyID: "Q9heA4AhlceX6jxsBgbEezCsZV4mYk6f",
      Intro: "Class of 2024, Data Science Major",
    };
    // Add the new entry to the savedJourneys array
    await savedJourneys.push(newJourney);
    // updates firestore
    // 1. get reference of Firestore document
    console.log("saving Journey  userid: ", currentUserID);
    const savedjourneyDocRef = doc(db, "savedJourneys", currentUserID);
    // 2. get instance of document
    const savedjourneySnapshot = await getDoc(savedjourneyDocRef);
    // 3. Update the Firestore document with the modified savedJourneys array
    await updateDoc(savedjourneyDocRef, {
      savedjourneys: savedJourneys,
    });
  };

  useEffect(() => {
    console.log("changed: ", savedJourneys);
  }, [savedJourneys]);

  // saves and unsaves the journey
  const handleClick = async () => {
    await setIsSaved(!isSaved);
    // Check if there exists an entry with journeyTitle "School Program"
    const isSchoolProgramExists = savedJourneys.some(
      (journey) =>
        journey.journeyTitle ===
        "The Ultimate SNAP Guide: Get $200 Monthly for Groceries"
    );
    if (isSaved && isSchoolProgramExists) {
      // unsave the journey
      console.log("unsave!");
      unsaveJourney();
    } else if (!isSaved && !isSchoolProgramExists) {
      // saves journey
      console.log("save!");

      saveJourney();
    }
  };

  function directToMyJourney() {
    navigation.navigate("Tabs", { screen: "MyJourneys" });
  }
  // For the Progress Bar
  const [verticalLine1, setVerticalLine1] = useState(true);
  const [verticalLine2, setVerticalLine2] = useState(false);
  const [verticalLine3, setVerticalLine3] = useState(false);
  const [verticalLine4, setVerticalLine4] = useState(false);
  const [verticalLine5, setVerticalLine5] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      if (scrollY < 300) {
        setVerticalLine1(true);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 300) {
        setVerticalLine2(true);
        setVerticalLine1(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1050) {
        setVerticalLine3(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1350) {
        setVerticalLine4(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1450) {
        setVerticalLine5(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
      }
    },
    []
  );

  return (
    <View style={styles.outterContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/journeyPostsGradients/rachel.png")}
          resizeMode="cover"
          style={styles.gradientBackground}
        >
          {/* Back Button */}
          <View style={styles.backBtnContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={directToMyJourney}
            >
              <Image
                style={styles.backBtnImg}
                source={require("../../../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topContainer}></View>
        </ImageBackground>
      </View>
      {/* {mentorName === "rachelli" && ( */}
      <ScrollView
        style={styles.postContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.topPortionContainer}>
          {/* Post Title & Save Button */}
          <View style={styles.titleAndSaveButtonContainer}>
            <View style={styles.postTitleContainer}>
              <View style={styles.timeAndSaveContainer}>
                {/* Timestamp */}
                <Text style={styles.postDate}>Nov 21th 2023</Text>
                {/* Save Button */}
                <TouchableOpacity onPress={() => handleClick()}>
                  <Image
                    style={styles.saveIcon}
                    source={
                      isSaved
                        ? require("../../../assets/images/icons/journeySaved.png")
                        : require("../../../assets/images/icons/journeyUnsaved.png")
                    }
                  />
                </TouchableOpacity>
              </View>
              {/* Title */}
              <Text style={styles.postTitle}>
                The Ultimate SNAP Guide: Get $200 Monthly for Groceries
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../../../assets/images/mentorProfilePics/rachel.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Rachel Li</Text>
              <Text style={styles.userIntro}>
                Class of 2024, Data Science Major
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              {/* <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Theme</Text>
              </View> */}
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  If you’re a student working part-time, don’t have a meal plan,
                  and shop for groceries on your own, here’s a resource for you:
                  The Supplemental Nutrition Assistance Program (SNAP) gives
                  people who are eligible around{" "}
                  <Text style={styles.regularContentTextBolded}>
                    $200 monthly funds to buy food.{" "}
                  </Text>
                  Navigating this process has been a headache. I spent hours on
                  the phone with customer service, figuring out the right
                  document to submit. Here is a guide to applying for SNAP from
                  my own experience so that you can have a much smoother
                  process.
                </Text>
              </View>
            </View>
            {/* 2nd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Processes</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  {"1. Do a "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://dtaconnect.eohhs.mass.gov/screening?_gl=1*19vwokf*_ga*NDU5MDQyNTc0LjE2OTkzODAxNTk.*_ga_SW2TVH2WBY*MTY5OTM4MDE1OS4xLjAuMTY5OTM4MDE1OS4wLjAuMA.."
                      )
                    }
                  >
                    <Text style={styles.linkText}>quick check</Text>
                  </TouchableOpacity>
                  {" to see if you’re eligible."}
                </Text>
                <Text style={styles.regularContentText}>
                  {"2. File the "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://dtaconnect.eohhs.mass.gov/?_gl=1*1qkcl0m*_ga*NDU5MDQyNTc0LjE2OTkzODAxNTk.*_ga_SW2TVH2WBY*MTY5OTM4MDE1OS4xLjEuMTY5OTM4MDUxMi4wLjAuMA.."
                      )
                    }
                  >
                    <Text style={styles.linkText}>initial application</Text>
                  </TouchableOpacity>
                  {"."}
                </Text>
                <Text style={styles.regularContentText}>
                  3. The documents I submitted as a full-time student:{" "}
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                    • Financial aid proof
                  </Text>
                  <Text style={styles.regularContentText}>
                    • Proof that you don’t have a meal plan on campus
                  </Text>
                  <Text style={styles.regularContentText}>
                    • Proof of work-study
                  </Text>
                  <Text style={styles.regularContentText}>
                    • Proof of other work you’re (or have been) participating in
                  </Text>
                </View>
                <Text style={styles.regularContentText}>
                  4. After the initial application, they require a phone
                  interview asking you to verify the information.{" "}
                </Text>
                <Text
                  style={[styles.regularContentTextBolded, { marginTop: 20 }]}
                >
                  Additional Info:
                </Text>
                <Text style={styles.regularContentText}>
                  {"1. Reach out to BU Housing "}
                  <TouchableOpacity
                    onPress={() => Linking.openURL("housing@bu.edu")}
                  >
                    <Text style={styles.linkText}>housing@bu.edu</Text>
                  </TouchableOpacity>
                  {" to request a signed document."}
                </Text>
                <Text style={styles.regularContentText}>
                  2. You need to be actively participating in the work-study in
                  order to be qualified. The number of hours you work doesn't
                  matter.
                </Text>
                <Text style={styles.regularContentText}>
                  3. Go to studentlink work portal to see if you can find a
                  printable version. If not, reach out to your supervisor.
                </Text>
                <Text style={styles.regularContentText}>
                  4. The document needs to have a specific start and end date.
                </Text>
              </View>
            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Challenges</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  Trying to figure out what kind of document they need and being
                  able to connect with a representative is the most daunting
                  part.
                </Text>
              </View>
            </View>
            {/* 4th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Takeaways</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  • Try your best to not miss the scheduled phone call because
                  it’s very hard to connect with a representative when you dial
                  in yourself. The average wait time is around 30 min.
                </Text>
                <Text style={styles.regularContentText}>
                  • Download DTA Connect App, it’s the place where you submit
                  all the verification documents.
                </Text>
                <Text style={styles.regularContentText}>
                  • Keep an eye on your mail. They will email letters to you
                  with your case number (you need this number to sign into your
                  DTA app account)
                </Text>
              </View>
            </View>
            {/* 5th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Resources</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  Here are BU resources related to food:
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                    {"• "}
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          "https://www.bu.edu/chapel/programming/community-dinner/"
                        )
                      }
                    >
                      <Text style={styles.linkText}>Marsh Chapel</Text>
                    </TouchableOpacity>
                    {
                      " hosts a community dinner on Mondays from 5 p.m. to 6:30 p.m., you do not need to have any religious affiliation to participate."
                    }
                  </Text>
                  <Text style={styles.regularContentText}>
                    {"• "}
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          "https://www.bu.edu/studentwellbeing/place-a-bu-food-pantry-order/"
                        )
                      }
                    >
                      <Text style={styles.linkText}>BU Food Pantry</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* )} */}
      <View style={styles.progressBarContainer}>
        <View
          style={
            verticalLine1 ? styles.verticalLine1Active : styles.verticalLine1
          }
        ></View>
        <View
          style={
            verticalLine2 ? styles.verticalLine2Active : styles.verticalLine2
          }
        ></View>
        <View
          style={
            verticalLine3 ? styles.verticalLine3Active : styles.verticalLine3
          }
        ></View>
        <View
          style={
            verticalLine4 ? styles.verticalLine4Active : styles.verticalLine4
          }
        ></View>
        <View
          style={
            verticalLine5 ? styles.verticalLine5Active : styles.verticalLine5
          }
        ></View>
      </View>
      {/* </View>)} */}
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
  },
  container: {},
  topContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent",
    paddingTop: 50,
  },
  gradientBackground: {
    width: 390,
    height: 170,
    zIndex: 1,
  },
  backBtnContainer: {
    top: 60,
    left: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    zIndex: 2,
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
  postContainer: {
    flex: 1,
    zIndex: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -60,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.02)",
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 22,
    shadowOpacity: 1,
  },
  topPortionContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
  titleAndSaveButtonContainer: {
    flexDirection: "row",
    // width: "100%",
  },
  postTitleContainer: {
    width: "100%",
  },
  timeAndSaveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  saveIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  postDate: {
    color: "#818181",
    fontSize: 16,
    fontFamily: "Stolzl Medium",
    marginBottom: 5,
  },
  postTitle: {
    color: "#000000",
    fontSize: 28,
    width: "100%",
    fontFamily: "Stolzl Bold",
  },
  authorInfoContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileImg: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
  },
  userNameAndIntro: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 14,
    fontFamily: "Stolzl Medium",
    marginBottom: 5,
  },
  userIntro: {
    fontSize: 12,
    color: "#888888",
    fontFamily: "Stolzl Regular",
  },
  postContentContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  postContentMainContainer: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 20,
  },
  individualStep: {
    marginBottom: 20,
  },
  subtitleContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CA95C8",
    backgroundColor: "#FAF4F9",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    // This line makes this container to only be as wide as its content (plus padding)!
    alignSelf: "flex-start",
  },
  subtitleText: {
    color: "#AF6BAB",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Stolzl Medium",
  },
  boldedContentContainer: {
    marginBottom: 10,
  },
  boldedContentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  regularContentContainer: {
    marginBottom: 10,
  },
  regularContentText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#393939",
    marginBottom: 10,
    fontFamily: "Stolzl Regular",
  },
  regularContentTextBolded: {
    fontSize: 16,
    lineHeight: 25,
    color: "#393939",
    marginBottom: 10,
    fontFamily: "Stolzl Medium",
  },
  indentedContentContainer: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  linkText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#CA95C8",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontFamily: "Stolzl Regular",
  },
  progressBarContainer: {
    zIndex: 3,
    position: "absolute",
    right: 20,
    top: 280,
    flexDirection: "column",
    height: 450,
  },
  verticalLine1Active: {
    flex: 1,
    borderLeftColor: "#FFD979",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine1: {
    flex: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine2Active: {
    flex: 1,
    borderLeftColor: "#FFD979",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine2: {
    flex: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine3Active: {
    flex: 1,
    borderLeftColor: "#FFD979",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine3: {
    flex: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine4: {
    flex: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine4Active: {
    flex: 1,
    borderLeftColor: "#FFD979",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine5: {
    flex: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  verticalLine5Active: {
    flex: 1,
    borderLeftColor: "#FFD979",
    borderLeftWidth: 5,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
});
