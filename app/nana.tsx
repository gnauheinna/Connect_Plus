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
        journey.authorName === "Nana Younge" &&
        journey.journeyTitle === "Voice of a First-Gen Graduate, Entrepreneur, Faculty"
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
        journey.authorName !== "Nana Younge" &&
        journey.journeyTitle !==
          "Voice of a First-Gen Graduate, Entrepreneur, Faculty"
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
      journeyTitle: "Voice of a First-Gen Graduate, Entrepreneur, Faculty",
      authorName: "Nana Younge",
      journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
      Intro: "Founder of Get Girls Going Program Director at Innovate@BU",
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
    // Check if there exists an entry with journeyTitle "Voice of a First-Gen Graduate, Entrepreneur, Faculty"
    const isPostExists = savedJourneys.some(
      (journey) =>
        journey.journeyTitle ===
        "Voice of a First-Gen Graduate, Entrepreneur, Faculty"
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
      if (scrollY >= 1200) {
        setVerticalLine3(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
    },
    []
  );

  return (
    <View style={styles.outterContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/journeyPostsGradients/nana.png")}
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
                <Text style={styles.postDate}>Dec 4th 2023</Text>
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
              <Text style={styles.postTitle}>Voice of a First-Gen Graduate, Entrepreneur, Faculty</Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/mentorProfilePics/nana.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Nana Younge</Text>
              <Text style={styles.userIntro}>
                  Founder of Get Girls Going{"\n"}Program Director at Innovate@BU
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentText}>Message for the readers:</Text>
                <Text style={styles.regularContentText}>
                “You started a journey that is so important for your future generations, and know that you aren't the only one and that there is a big community that is experiencing the same thing. As much as possible, tap into your community and learn from them.”
                </Text>
              </View>
            </View>
            {/* 2nd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>First-Gen College Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: What does first-gen mean to you?</Text>
                <Text style={styles.regularContentText}>I first realized my first-gen identity when my high school teacher encouraged me to apply to Bottom Line and Upper Bound.</Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Being first-gen is powerful.{" "}</Text>It means you’re changing the future of your family and generations.
                </Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Being first-generation makes me sad.{" "}</Text>When I was in college, I noticed my counterparts could call their families whenever they had problems related to college. My family couldn't help me in that space because I was the first to experience it.
                </Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Being first-gen is full of responsibilities.{" "}</Text>I had a lot of stress when trying to balance school, work, and life. I believe that if I had those resources that other students had, it would have been a smoother experience.
                </Text>
              </View>
              
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: How does your first gen identity make you who you are today?</Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Being first gen gives me a global perspective, a different point of view on the world and people.{" "}</Text>
                  First-generation experience also gave me an open mind and a hopeful mindset. As a first gen, I would always tell myself to{" "}
                  <Text style={styles.underlinedText}>“use the resources that you have and figure it out.”{" "}</Text>
                </Text>
              </View>

            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Tips and Advice </Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: What factors do you believe contributed most to your success?</Text>
                <Text style={styles.regularContentText}>The{" "}
                  <Text style={styles.underlinedText}>people{" "}</Text>around me and the{" "}
                  <Text style={styles.underlinedText}>willingness to experience{" "}</Text>and fail.
                </Text>
              </View>

              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: What are your top 3 pieces of advice for our students?</Text>
                <Text style={styles.regularContentText}>1. First,{" "}
                  <Text style={styles.underlinedText}>find a community{" "}</Text>with people that believe in you.
                </Text>
                <Text style={styles.regularContentText}>2. Second, stay steady and{" "}
                  <Text style={styles.underlinedText}>don't give up.{" "}</Text>
                </Text>
                <Text style={styles.regularContentText}>3. Lastly,{" "}
                  <Text style={styles.underlinedText}>care about others.{" "}</Text>
                  When you care about other people, you’re creating a community of people who are also going to value you and pour into you.
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
    fontFamily: "Stolzl Medium",
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
    paddingRight: 32,
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
  underlinedText: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: "Stolzl Regular",
    textDecorationLine: "underline",
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
