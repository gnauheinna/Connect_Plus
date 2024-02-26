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

export default function NeriScreen({ navigation }) {
  const [isSaved, setIsSaved] = useState(false);
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const db = getFirestore();

  const { savedJourneys, setSavedJourneys, setLoading, loading } =
    useSavedJourneyContext();

  // updates savebutton status according to saveJourney context
  useEffect(() => {
    const isNeriSaved = savedJourneys.some(
      (journey) =>
        journey.authorName === "Neri Ajiatas Arreaga" &&
        journey.journeyTitle ===
          "Discovering BU: Campus Communities and Organizations"
    );
    if (isNeriSaved) {
      // Neri's journey is saved
      setIsSaved(true);
    } else {
      // Neri's journey is not saved
      setIsSaved(false);
    }
  }, []);

  // saves and unsaves the journey
  const handleClick = async () => {
    await setIsSaved(!isSaved);
    // Check if there exists an entry with journeyTitle "School Program"
    const isSchoolProgramExists = savedJourneys.some(
      (journey) =>
        journey.journeyTitle ===
        "Discovering BU: Campus Communities and Organizations"
    );
    if (isSaved && isSchoolProgramExists) {
      // unsave the journey
      unsaveJourney();
    } else if (!isSaved && !isSchoolProgramExists) {
      // saves journey
      saveJourney();
    }
  };

  const unsaveJourney = async () => {
    const updatedSavedJourneys = savedJourneys.filter(
      (journey) =>
        journey.authorName !== "Neri Ajiatas Arreaga" &&
        journey.journeyTitle !==
          "Discovering BU: Campus Communities and Organizations"
    );

    // updates context
    await setSavedJourneys(updatedSavedJourneys);
    // updates firestore
    // 1. get reference of Firestore document

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
      journeyTitle: "Discovering BU: Campus Communities and Organizations",
      authorName: "Neri Ajiatas Arreaga",
      journeyID: "vEJlU8RCqhAgX6gX004t4ckpyfVbyPHy",
      Intro: "Class of 2025, Data Science Major",
    };
    // Add the new entry to the savedJourneys array
    await savedJourneys.push(newJourney);
    // updates firestore
    // 1. get reference of Firestore document

    const savedjourneyDocRef = doc(db, "savedJourneys", currentUserID);
    // 2. get instance of document
    const savedjourneySnapshot = await getDoc(savedjourneyDocRef);
    // 3. Update the Firestore document with the modified savedJourneys array
    await updateDoc(savedjourneyDocRef, {
      savedjourneys: savedJourneys,
    });
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
          source={require("../../../assets/images/journeyPostsGradients/neri.png")}
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
                <Text style={styles.postDate}>Nov 13th 2023</Text>
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
                Discovering BU: Campus Communities and Organizations
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../../../assets/images/mentorProfilePics/neri.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Neri Ajiatas Arreaga</Text>
              <Text style={styles.userIntro}>
                Class of 2025, Data Science Major
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
                  Clubs and organizations offer opportunities to engage with
                  other students and can help you discover interests you may not
                  have considered.
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
                  {"1. You can visit "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://bu.campuslabs.com/engage/")
                    }
                  >
                    <Text style={styles.linkText}>Terrier Central</Text>
                  </TouchableOpacity>
                  {" to learn more about the hundreds of clubs on campus."}
                </Text>
                <Text style={styles.regularContentText}>
                  2. Get in touch with fellow students in class and see what
                  they may be involved in.
                </Text>
                <Text style={styles.regularContentText}>
                  {"3. Visit "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.bu.edu/articles/2023/everything-you-need-to-know-about-boston-university-splash/"
                      )
                    }
                  >
                    <Text style={styles.linkText}>Splash</Text>
                  </TouchableOpacity>
                  {" that happens at the start of every semester!"}
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
                  • I've felt that the multitude of clubs and organizations can
                  be overwhelming, and there's the discomfort of trying
                  something new without knowing anyone in the group you want to
                  join.
                </Text>
                <Text style={styles.regularContentText}>
                  • I’ve learned that BU groups are very welcoming to all
                  individuals of any background. So don’t feel alone, there will
                  always be someone that wants to talk and help you feel
                  comfortable.
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
                  • You have plenty of time to get involved with a community
                  outside of your classroom. Especially throughout the semester,
                  people are always having events and willing to welcome new
                  members :)
                </Text>
                <Text style={styles.regularContentText}>
                  • You also never have to stick with the organization if you
                  don’t like it. From personal experience, I’ve found it helpful
                  to try a lot of things and reflect on whether I like or don’t
                  like something.
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
                  {"- Make sure you click to learn more about "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.bu.edu/diversity/our-communities/"
                      )
                    }
                  >
                    <Text style={styles.linkText}>
                      Diversity and Inclusion at BU
                    </Text>
                  </TouchableOpacity>
                </Text>
                <Text style={styles.regularContentText}>
                  {"- Click here to view all "}
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://bu.campuslabs.com/engage/organizations"
                      )
                    }
                  >
                    <Text style={styles.linkText}>
                      BU Clubs and Organizations
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            {/* 6th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Additional Groups</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.bu.edu/questrom/diversity-and-inclusion/"
                      )
                    }
                  >
                    <Text style={styles.linkText}>
                      Center for Diversity, Equity, & Inclusion (DEI), Questrom
                      School of Business
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      The center provides diversity education, programs, and
                      community building initiatives for all Questrom students,
                      both undergraduate and graduate.
                    </Text>
                  </View>
                </Text>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://www.bu.edu/newbury-center/about/"
                      )
                    }
                  >
                    <Text style={styles.linkText}>The Newbury Center</Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      Supporting and celebrating first-generation undergraduate,
                      graduate, and professional students at BU.
                    </Text>
                  </View>
                </Text>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://www.bu.edu/thurman/programs/")
                    }
                  >
                    <Text style={styles.linkText}>Howard Thurman Center</Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      This is a place where cultural expression in all of its
                      forms is embraced and encouraged.
                    </Text>
                  </View>
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
    fontWeight: "bold",
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
