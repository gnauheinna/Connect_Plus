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
    const isShatevaSaved = savedJourneys.some(
      (journey) =>
        journey.authorName === "Shateva Long" &&
        journey.journeyTitle === "I Got To Create My Own 4 Credit CS Course!"
    );
    if (isShatevaSaved) {
      // Shateva Long's journey is saved
      setIsSaved(true);
    } else {
      // Shateva Long's journey is not saved
      setIsSaved(false);
    }
  }, []);

  const unsaveJourney = async () => {
    const updatedSavedJourneys = savedJourneys.filter(
      (journey) =>
        journey.authorName !== "Shateva Long" &&
        journey.journeyTitle !==
          "I Got To Create My Own 4 Credit CS Course!"
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
      journeyTitle: "I Got To Create My Own 4 Credit CS Course!",
      authorName: "Shateva Long",
      journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
      Intro: "BU Alumni Product Manager @Microsoft",
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

  // saves and unsaves the journey
  const handleClick = async () => {
    await setIsSaved(!isSaved);
    // Check if there exists an entry with journeyTitle "I Got To Create My Own 4 Credit Computer Science Course!"
    const isPostExists = savedJourneys.some(
      (journey) =>
        journey.journeyTitle ===
        "I Got To Create My Own 4 Credit CS Course!"
    );
    if (isSaved && isPostExists) {
      // unsave the journey
      console.log("unsave!");
      unsaveJourney();
    } else if (!isSaved && !isPostExists) {
      // saves journey
      console.log("save!");

      saveJourney();
    }
  };

  function directToMyJourney() {
    router.push("/journeys");
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
      if (scrollY >= 400) {
        setVerticalLine2(true);
        setVerticalLine1(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 650) {
        setVerticalLine3(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1150) {
        setVerticalLine4(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 1200) {
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
          source={require("../assets/images/journeyPostsGradients/shatevaFeatured.png")}
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
                <Text style={styles.postDate}>Nov 6th 2023</Text>
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
                I Got To Create My Own 4 Credit Computer Science Course!
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/mentorProfilePics/shateva.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Shateva Long</Text>
              <Text style={styles.userIntro}>
              BU Alumni{"\n"}Product Manager @Microsoft
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  It was my last year in college and I still needed one more
                  elective course to fulfill my Computer Science degree
                  requirements. I had a poor lottery number, which left me with
                  higher level 500+ courses that did not peak my interest. After
                  lots of searching through our course site, I saw that as a
                  senior computer science student, I was eligible for a directed
                  study so that’s what I did!
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
                  1. Figure out what to study! This can be anything related to
                  your major.
                </Text>
                <Text style={styles.regularContentText}>
                  2. Find a professor to work with.
                </Text>
                <Text style={styles.regularContentText}>
                  3. Fill out your department’s directed study application. It
                  will ask you questions about your project, what assignments
                  you’ll be submitting, how many hours you’ll be working, etc.
                </Text>
                <Text style={styles.regularContentText}>
                  4. Go through your “course” content with your professor and
                  submit your application.
                </Text>
              </View>
            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  As my project, I analyzed data from a DEI climate survey I
                  conducted and created an analysis report. I had so much fun.
                  The professor I worked with was amazing. He was extremely
                  helpful throughout the entire process and our work styles
                  meshed well. The project itself was also{" "}<Text style={styles.regularContentTextBolded}>the perfect combination of challenging and interesting.{" "}</Text>
                  I got to learn a new programming language and use it to build an interactive
                  data report, and I enjoyed every minute of it. I got to
                  utilize all of the skills I developed over the years and put
                  my all into this project. It was genuinely the first time I’ve
                  felt overall fulfillment with a course at BU.
                </Text>
              </View>
            </View>
            {/* 4th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Challenges</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  The hardest part of the directed study was the initial
                  application process. Finding a professor was not easy since
                  many professors were busy or did not have the skills I needed
                  for my project. Luckily, I was able to find a professor
                  outside of my department who had the exact skills I needed.
                  Everything else was great.
                </Text>
              </View>
            </View>
            {/* 5th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Takeaways</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  Doing a directed study is not for everyone. You have to
                  essentially build your own course and keep yourself on track.
                  {" "}<Text style={styles.regularContentTextBolded}>While it may be challenging, the experience was rewarding.{" "}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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
    fontWeight: "600",
    marginBottom: 5,
  },
  postTitle: {
    color: "#000000",
    fontSize: 24,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  userIntro: {
    fontSize: 12,
    color: "#888888",
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
    fontFamily: "Stolzl Medium",
    textAlign: "center",
  },
  boldedContentContainer: {
    marginBottom: 10,
  },
  boldedContentText: {
    fontSize: 16,
    fontFamily: "Stolzl Medium",
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
    height: 360,
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
