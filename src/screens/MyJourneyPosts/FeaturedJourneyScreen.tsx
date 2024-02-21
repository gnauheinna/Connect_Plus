import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Image } from "expo-image";
import { Journey, journeys } from './MyJourneyData';


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

export default function FeaturedJourneyScreen({ route, navigation }) {
  const [isSaved, setIsSaved] = useState(false);
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const db = getFirestore();
  const authId = route.params.user;

// for the background & profile image
  let backImg;  
  let profileImg

// this gives the entire object
  const journeyInfo = journeys[authId];

  const { savedJourneys, setSavedJourneys, setLoading, loading } =
    useSavedJourneyContext();

  // updates savebutton status according to saveJourney context
  useEffect(() => {
    const isJourneySaved = savedJourneys.some(
      (journey) =>
        journey.authorName === journeyInfo?.author.authorName &&
        journey.journeyTitle ===
          journeyInfo?.author.journeyTitle
    );
    if (isJourneySaved) {
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
        journey.journeyTitle === journeyInfo?.author.journeyTitle
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

  const unsaveJourney = async () => {
    const updatedSavedJourneys = savedJourneys.filter(
      (journey) =>
        journey.authorName !== journeyInfo?.author.authorName &&
        journey.journeyTitle !==
        journeyInfo?.author.journeyTitle
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
      journeyTitle:  journeyInfo?.author.journeyTitle,
      authorName:  journeyInfo?.author.authorName,
      journeyID:  journeyInfo?.author.journeyID,
      Intro:  journeyInfo?.author.intro,
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

  switch (journeyInfo?.author.photoName) {
    case "neri":
        backImg = require(`../../../assets/images/journeyPostsGradients/neri.png`);
        profileImg = require(`../../../assets/images/mentorProfilePics/neri.png`);
        break;
    case "rachel":
        backImg = require(`../../../assets/images/journeyPostsGradients/rachel.png`);
        profileImg = require(`../../../assets/images/mentorProfilePics/rachel.png`);
        break;
    case "shateva":
        backImg = require(`../../../assets/images/journeyPostsGradients/shatevaFeatured.png`);
        profileImg = require(`../../../assets/images/mentorProfilePics/shateva.png`);
        break;
    case "julia":
        backImg = require(`../../../assets/images/journeyPostsGradients/julia.png`);
        profileImg = require(`../../../assets/images/mentorProfilePics/julia.png`); 
  } 
  return (
    <View style={styles.outterContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={backImg}
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
                <Text style={styles.postDate}>{ journeyInfo?.author.date}</Text>
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
                { journeyInfo?.author.journeyTitle}
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={profileImg}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>{ journeyInfo?.author.authorName}</Text>
              <Text style={styles.userIntro}>
                {journeyInfo?.author.intro}
              </Text>
            </View>
          </View>
        </View>

        {/* Processes Content */}
        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  { journeyInfo?.header.heading}
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
                  {journeyInfo?.process.step1}
                </Text>
                <Text style={styles.regularContentText}>
                {journeyInfo?.process.step2}
                </Text>
                <Text style={styles.regularContentText}>
                  {journeyInfo?.process.step3}
                </Text>
              </View>
            </View>
            {/*    EXPERIENCE */}
            {journeyInfo?.experience.experience1 && (
                <View style={styles.individualStep}>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitleText}>Experience</Text>
                </View>
                <View style={styles.regularContentContainer}>
                  <Text style={styles.regularContentText}>
                    {journeyInfo?.experience.experience1}
                  </Text>
                </View>
              </View>

            )}
            {/* 3rd Step - challenges */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Challenges</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                   {journeyInfo?.challenges.challenge1}
                </Text>
                <Text style={styles.regularContentText}>
                  {journeyInfo?.challenges.challenge2}
                </Text>
              </View>
            </View>

            {/* 4th Step - takeaways */}
            {journeyInfo?.takeaways.takeaway1 && (
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Takeaways</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  {journeyInfo?.takeaways.takeaway1}
                </Text>
                <Text style={styles.regularContentText}>
                  {journeyInfo?.takeaways.takeaway2}
                </Text>
                {journeyInfo?.takeaways.takeaway3 && (
                    <Text style={styles.regularContentText}>
                        {journeyInfo?.takeaways.takeaway3}
                    </Text>
                )}
              </View>
            </View>)}

            
            {/* 5th Step - resources */}
            {journeyInfo?.resources.resource1 && (
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Resources</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  {journeyInfo?.resources.resource1}
                </Text>
                <Text style={styles.regularContentText}>
                    {journeyInfo?.resources.resource2}
                </Text>
                <Text style={styles.regularContentText}>
                    {journeyInfo?.resources.resource3}
                </Text>
              </View>
            </View>
            )}

           
            {/* 6th Step - additional groups*/}
            {journeyInfo?.additionalGroups.group1 &&
            (<View style={styles.individualStep}>
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
                      {journeyInfo?.additionalGroups.group1}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      {journeyInfo?.groupInfo.groupInfo1}
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
                    <Text style={styles.linkText}>{journeyInfo.additionalGroups.group2}</Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      {journeyInfo.groupInfo.groupInfo2}
                    </Text>
                  </View>
                </Text>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://www.bu.edu/thurman/programs/")
                    }
                  >
                    <Text style={styles.linkText}>{journeyInfo.additionalGroups.group3}</Text>
                  </TouchableOpacity>
                  <View style={styles.indentedContentContainer}>
                    <Text style={styles.regularContentText}>
                      {journeyInfo.groupInfo.groupInfo3}
                    </Text>
                  </View>
                </Text>
              </View>
            </View>)}

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
