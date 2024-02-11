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

export default function ShatevaFeaturedScreen({ navigation }) {
  const [isSaved, setIsSaved] = useState(false);
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const db = getFirestore();

  const { savedJourneys, setSavedJourneys, setLoading, loading } =
    useSavedJourneyContext();

  // updates savebutton status according to saveJourney context
  useEffect(() => {
    const isShatevaSaved = savedJourneys.some(
      (journey) => journey.authorName === "Shateva Long"
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
        journey.journeyTitle !== "A First-Gen's Journey from BU to Microsoft"
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
      journeyTitle: "A First-Gen's Journey from BU to Microsoft",
      authorName: "Shateva Long",
      journeyID: "qwrr4XlT9K5adSasdasferqL0wHrR5og4",
      Intro: "BU Alumni Product Manager @Microsoft",
    };
    // Add the new entry to the savedJourneys array
    await savedJourneys.push(newJourney);
    // updates firestore
    // 1. get reference of Firestore document
    console.log("saving Journey userid: ", currentUserID);
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
        journey.journeyTitle === "A First-Gen's Journey from BU to Microsoft"
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
      if (scrollY >= 500) {
        setVerticalLine2(true);
        setVerticalLine1(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 2050) {
        setVerticalLine3(true);
        setVerticalLine1(false);
        setVerticalLine2(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 2500) {
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
          source={require("../../../assets/images/journeyPostsGradients/shatevaFeatured.png")}
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
                <Text style={styles.postDate}>Nov 2th 2023</Text>
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
                A First-Gen's Journey from BU to Microsoft
              </Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../../../assets/images/mentorProfilePics/shateva.png")}
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
                <Text style={styles.regularContentTextBolded}>
                  What are the three words for our students to quickly get to
                  know you?
                </Text>
                <Text style={styles.regularContentText}>
                  Twenty-two, New-york-city, dynamic
                </Text>
                <Text style={styles.regularContentTextBolded}>
                  How do you understand your first-gen identity?
                </Text>
                <Text style={styles.regularContentText}>
                  I first became aware of my first-gen identity when I was
                  applying to FY101 sections my freshman year. I think being a
                  first-gen college student is comparable to being late to a
                  lecture. You had a rough morning, missed the bus, and it's
                  raining, but you still showed up. Everyone else around you was
                  there on time and some were of course extra early, so you’re a
                  bit behind in the material. Catching up is challenging but by
                  the end of the lecture, you were able to grasp the concepts
                  and learn just as much as everyone else
                </Text>
              </View>
            </View>
            {/* 2nd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Internship Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>
                  Q: Could you share with us your journey to obtaining an
                  internship at Microsoft?
                </Text>
                <Text style={styles.regularContentText}>
                  I think what helped me the most was not focusing on getting an
                  internship. Instead,{" "}
                  <Text style={styles.underlinedText}>
                    I focused on taking on opportunities I was passionate about
                    and spent my time bettering myself.{" "}
                  </Text>
                  I started various personal projects, took on leadership roles,
                  and worked as a project manager on campus. These were all
                  experiences I cared deeply about and they also prepared me for
                  a role in product management.{" "}
                  <Text style={styles.underlinedText}>
                    If you put genuine time and effort into your learning, it
                    will shine through.
                  </Text>
                </Text>
                <Text style={styles.regularContentText}>
                  As for the internship application process,{" "}
                  <Text style={styles.underlinedText}>
                    the hardest part is getting through the first screening
                    process.{" "}
                  </Text>
                  The only way to really do this for an internship is by having
                  a good resume. Yes,{" "}
                  <Text style={styles.underlinedText}>
                    how your resume is written is important.{" "}
                  </Text>
                  Using strong action verbs, role specific terminology, and
                  having a clean layout are all valuable components. But the
                  most important thing is your experience and what it says about
                  you.
                </Text>

                <Text style={styles.regularContentTextBolded}>
                  Q: What do you think recruiters at these big companies are
                  looking for in a candidate?
                </Text>
                <Text style={styles.regularContentText}>
                  I think they look for different qualities at different stages.
                  Initially, they probably are just looking for people who can
                  do the job. Things are slightly different with internships
                  because employers are aware of the limited opportunities to
                  gain relevant experience. This means{" "}
                  <Text style={styles.underlinedText}>
                    they are at least looking for any indicator of potential to
                    successfully take on the role.{" "}
                  </Text>
                  For the next stages, it seems like{" "}
                  <Text style={styles.underlinedText}>
                    they start evaluating your thinking and problem solving
                    patterns.{" "}
                  </Text>
                  This is done through the more technical interviews which look
                  different depending on the role. Lastly, I think{" "}
                  <Text style={styles.underlinedText}>
                    they look for personality.{" "}
                  </Text>
                  They want to see how you communicate with others and for a
                  lack of better words, evaluate your “energy”. They want to see
                  whether you’re trustworthy, likable, and would make a good fit
                  at the company.
                </Text>
              </View>
            </View>
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>
                  Adulting & Professional Experience
                </Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>
                  Q: Now as a young professional, what are some responsibilities
                  or challenges you face that never crossed your mind as a
                  student?
                </Text>
                <Text style={styles.regularContentText}>
                  There are just so many more responsibilities to manage. Just
                  to list a few — bills on bills, purchasing and upkeep of
                  furniture/appliances, somehow fitting in dentist/doctors
                  visits, making time to cook and grocery shopping, setting time
                  aside for socializing and just time for myself, and then you
                  have to do all of that on top of working for the majority of
                  the day time. It’s a lot.{" "}
                  <Text style={styles.underlinedText}>
                    For the first few months, it felt like my world was
                    spinning. But once you plan everything on your calendar, you
                    eventually get into a routine (and you set up auto payments)
                    and it gets easier.{" "}
                  </Text>
                </Text>
              </View>
            </View>
            {/* 4th Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Tips and Advice</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>
                  Q: For students who are just beginning their college journey,
                  what is one piece of advice would you offer to them?
                </Text>
                <Text style={styles.regularContentText}>
                  The mistakes you make freshman year do not define your next
                  three years. If anything, if you acknowledge these mistakes
                  and put in effort to change, they’ll make you an even better
                  student.
                </Text>

                <Text style={styles.regularContentTextBolded}>
                  Q: What are your top 3 pieces of advice for navigating the
                  professional world, adulting challenges, or life after
                  college?
                </Text>
                <Text style={styles.regularContentText}>
                  Have people you can talk to.{" "}
                  <Text style={styles.underlinedText}>
                    My family, friends, and my mentors have been my rocks to
                    keep me grounded. Also, be honest about how you feel and
                    face these feelings head on.{" "}
                  </Text>
                  If you’re feeling overwhelmed, you need to sit down and think
                  about what small changes you can implement now to make things
                  better. And if you don’t know what to do, you have those rocks
                  or people in your life. And if you don’t have people in your
                  life or if they aren’t helpful, you have Google and Reddit.{" "}
                  <Text style={styles.underlinedText}>
                    There is not shame in asking the internet for advice.{" "}
                  </Text>
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
