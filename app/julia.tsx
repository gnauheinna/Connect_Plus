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

import { useUser } from "./context/UserContext";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSavedJourneyContext } from "./context/savedJourneyContext";
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
    const isJuliaSaved = savedJourneys.some(
      (journey) =>
        journey.authorName === "Julia Tran" &&
        journey.journeyTitle === "Everything You Need to Know About On-Campus Jobs"
    );
    if (isJuliaSaved) {
      // Julia's journey is saved
      setIsSaved(true);
    } else {
      // Julia's journey is not saved
      setIsSaved(false);
    }
  }, []);

  const unsaveJourney = async () => {
    const updatedSavedJourneys = savedJourneys.filter(
      (journey) =>
        journey.authorName !== "Julia Tran" &&
        journey.journeyTitle !== "Everything You Need to Know About On-Campus Jobs"
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
      journeyTitle: "Everything You Need to Know About On-Campus Jobs",
      authorName: "Julia Tran",
      journeyID: "0tDW3Y3MSmJsElnvYXKEOc6RT8lwaU1p",
      Intro: "Class of 2027, Business Administration Major",
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
    // Check if there exists an entry with journeyTitle "School Program"
    const isSchoolProgramExists = savedJourneys.some(
      (journey) => journey.journeyTitle === "Everything You Need to Know About On-Campus Jobs"
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
      if (scrollY >= 300) {
        setVerticalLine2(true);
        setVerticalLine1(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 2500) {
        setVerticalLine3(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 2750) {
        setVerticalLine4(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine3(false);
        setVerticalLine5(false);
      }
    },
    []
  );

  return (
    <View style={styles.outterContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/journeyPostsGradients/julia.png")}
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
                <Text style={styles.postDate}>Nov 18th 2023</Text>
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
              <Text style={styles.postTitle}>Everything You Need to Know About On-Campus Jobs</Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/mentorProfilePics/julia.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Julia Tran</Text>
              <Text style={styles.userIntro}>Class of 2027, Business Administration Major</Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  I’m an Admissions Ambassador, leading campus tours around our
                  Charles River Campus in BU gear you usually see on your way to
                  class! At first, I thought it was a volunteering opportunity
                  like a Club, so I applied, hoping to engage with BU’s
                  community. What I didn’t anticipate going into the job was
                  that I would get paid (of course!) and the motivation for me
                  to step outside of my comfort zone, to do the things I
                  wouldn’t normally do on my own accord. Getting a job doesn’t
                  mean taking on an additional responsibility that might
                  interfere with academics, but it can also be a chance to try
                  something new and develop your skill set!
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
                  1. Figure out what you can do:
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                  •{" "}
                  <Text style={styles.regularContentTextBolded}>For international students:{" "}</Text>
                  For international students: You can only work on-campus
                    for your first year. After one full year of education,
                    however, you can expand to off-campus positions that sponsor
                    a work visa.
                  </Text>
                  <Text style={styles.regularContentText}>
                  •{" "}
                    <Text style={styles.regularContentTextBolded}>For U.S. citizens:{" "}</Text>
                    You can already go off-campus as a
                    first-year. There is also a work-study award available if
                    you are a U.S. citizen that automatically deposits your
                    salary into your Student Account.
                  </Text>
                </View>

                <Text style={styles.regularContentText}>
                  2. Search for available opportunities:
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                  • Utilize{" "}
                    <Text style={styles.regularContentTextBolded}>Student Link{" "}</Text>
                    : You can find a list of
                    On/Off-campus Part-time positions or Quick Jobs (one-time
                    jobs) listed under the “Job and Career” tab with the
                    eligibilities, pay rates, and contact information. You can
                    then email the person(s) in charge of the job listings you
                    find interesting to ask for more information or apply!
                  </Text>
                  <Text style={styles.regularContentText}>
                  • Keep up with the BU Student Employment page:{" "}
                    <Text style={styles.regularContentTextBolded}>BU’s Student Employment Office{" "}</Text>
                    has an official Instagram page. They post
                    very frequently about available positions and job-tips for
                    students on/off-campus.
                  </Text>
                  <Text style={styles.regularContentText}>
                  • Ask around:{" "}
                    <Text style={styles.regularContentTextBolded}>Some jobs are referrals, so they are not officially posted{" "}</Text>
                    on any websites or advertised on poster
                    boards and bulletin boards. You can talk to the people you
                    know who are currently working in a position or organization
                    that you are interested in and they can let you know if they
                    are recruiting.
                  </Text>
                </View>

                <Text style={styles.regularContentText}>
                  3. Apply
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                  • Resume, Cover letter, and Application form: Most Quick Jobs don’t require any of these, but Part-time Jobs usually require a Resume. Use the{" "}
                  <Text style={styles.regularContentTextBolded}>Career Development Center (CDC){" "}</Text>
                  to help you polish your documents!
                  </Text>
                  <Text style={styles.regularContentText}>
                  • Interview: Make sure you come prepared and be confident! I had a group interview with 2 other candidates and they were both Upperclassmen, it was nerve-wracking, but{" "}
                    <Text style={styles.regularContentTextBolded}>just be yourself, be sincere{" "}
                    , and the interviewer will notice that!
                  </Text>
                  </Text>
                </View>

                <Text style={styles.regularContentText}>
                  4. Sort through the paperwork:
                </Text>
                <View style={styles.indentedContentContainer}>
                  <Text style={styles.regularContentText}>
                  •{" "}<Text style={styles.regularContentTextBolded}>Enter your hours on the Student Employment Portal{" "}</Text>
                    : Once you’re officially hired and working, you will be entering your hours yourself every week. The period ends on Thursday (so you will need to enter future hours that you will be working after Thursday that week) and your supervisor will review your hours after you have submitted them. 
                  </Text>
                  <Text style={styles.regularContentText}>
                  • Direct Deposit: You can also{" "}<Text style={styles.regularContentTextBolded}>set up Direct Deposit{" "}</Text>
                  to have your paycheck directly deposited into your account without having to get a physical check every week! This would 
                  {" "}<Text style={styles.regularContentTextBolded}>require you to obtain a Social Security Card{" "}</Text>
                  that you can apply for once you are hired if you are employed for the first time in the U.S.!
                  </Text>
                </View>
              </View>
            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Challenges</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  Sorting through the paperwork was a challenge for me. As an
                  international student, there are certainly many more steps to
                  get hired and get all of the required documents in, and it can
                  be confusing at times. However, there are many resources out
                  there that you can refer to, and you can always ask someone at
                  work or your friends for help. Take it slow, you’re not
                  supposed to know everything!
                </Text>
              </View>
            </View>
            {/* 4th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Resources</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.bu.edu/seo/")}
                  >
                    <Text style={styles.linkText}>
                      Student Employment Office
                    </Text>
                  </TouchableOpacity>
                </Text>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://www.instagram.com/bostonuseo/")
                    }
                  >
                    <Text style={styles.linkText}>
                      Student Employment Instagram
                    </Text>
                  </TouchableOpacity>
                </Text>
                <Text style={styles.regularContentText}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.bu.edu/isso/")}
                  >
                    <Text style={styles.linkText}>
                      International Students & Scholars Office
                    </Text>
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