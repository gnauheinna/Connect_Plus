import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
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
import { useSavedJourneyContext } from "./context/savedJourneyContext";
import { useUser } from "./context/UserContext";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function MyJourneyPost() {
  const router = useRouter();
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
        journey.journeyTitle === "Volunteering in Florida Natural Reserve - Alternative Service Break"
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
        journey.journeyTitle !== "Volunteering in Florida Natural Reserve - Alternative Service Break"
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
      journeyTitle: "Volunteering in Florida Natural Reserve - Alternative Service Break",
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
        journey.journeyTitle === "Volunteering in Florida Natural Reserve - Alternative Service Break"
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
    router.push(`/(tabs)/journeys`);
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
      if (scrollY >= 600) {
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
      if (scrollY >= 1220) {
        setVerticalLine4(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1320) {
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
          source={require("../assets/images/journeyPostsGradients/rachelFeatured.png")}
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
                source={require("../assets/images/icons/blackBack.png")}
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
                <Text style={styles.postDate}>Dec 1st 2023</Text>
                {/* Save Button */}
                <TouchableOpacity onPress={() => handleClick()}>
                  <Image
                    style={styles.saveIcon}
                    source={
                      isSaved
                        ? require("../assets/images/icons/journeySaved.png")
                        : require("../assets/images/icons/journeyUnsaved.png")
                    }
                  />
                </TouchableOpacity>
              </View>
              {/* Title */}
              <Text style={styles.postTitle}>
              Volunteering in Florida Natural Reserve - Alternative Service Break
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/mentorProfilePics/rachel.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Rachel Li</Text>
              <Text style={styles.userIntro}>Class of 2024, Data Science Major</Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  This March, I had the incredible opportunity to participate in a week-long volunteering program, facilitated by the Center of Community Service at BU. Alongside 14 other students, I journeyed to Hobe Sound, Florida, with all expenses covered by the program.
                </Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.regularContentTextBolded}>
                  I came across this opportunity on Instagram{" "}
                  </Text>
                  during the winter break and I applied for it.{" "}
                  <Text style={styles.regularContentTextBolded}>
                  They offer scholarships for people who have financial needs.{" "}
                  </Text>
                  Last time there were five cities to choose from, each with different volunteering activities. In the application, there are two questions to answer: why do you want to participate, and describe your financial situation.
About two weeks before our departure, we had a comprehensive briefing with the program coordinator and trip leads, which prepared us for the trip and outlined safety protocols.
                </Text>
              </View>
            </View>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                On the day of departure, the morning began early at 5 am as we gathered at GSU and boarded a bus bound for Logan Airport off to Florida!
                </Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                For the first four days, we volunteered from 9 am to 4 pm with different activities throughout the day. We would go to the beach and explore the city every day after work. The last day was a fun day, we drove to Miami!
                </Text>
              </View>
            </View>
            {/* 2nd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Challenges</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                One of the challenges I faced was adapting to the living conditions. We shared an apartment with around 10 other people, equipped with bunk beds and a single bathroom. Sometimes we waited in long lines, but those moments when we were cooking in the kitchen together, singing songs were what made everything worthwhile.
                </Text>
              </View>
            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Takeaways</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                This experience was eye-opening, fun, challenging, and meaningful. From being strangers at the outset to forging meaningful connections, I returned with 14 newfound friends. We learned teamwork, how to survive in a foreign place, how to take care of each other, and how to effectively communicate. 
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
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          "https://www.bu.edu/articles/2023/photo-gallery-asb-terriers-volunteer-for-spring-break/"
                        )
                      }
                    >
                      <Text style={styles.linkText}>Our story on BU Today</Text>
                    </TouchableOpacity>
                  </Text>
                  <Text style={styles.regularContentText}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          "https://www.bu.edu/csc/programs/asb/"
                        )
                      }
                    >
                      <Text style={styles.linkText}>Program Details</Text>
                    </TouchableOpacity>
                  </Text>
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
