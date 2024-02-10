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
        journey.authorName === "Bailey Borden" &&
        journey.journeyTitle === "The Most Important Career Lessons I’ve Learned"
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
        journey.authorName !== "Bailey Borden" &&
        journey.journeyTitle !==
          "The Most Important Career Lessons I’ve Learned"
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
      journeyTitle: "The Most Important Career Lessons I’ve Learned",
      authorName: "Bailey Borden",
      journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
      Intro: "BU Alumni Software Engineer @Capital One",
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
      if (scrollY >= 650) {
        setVerticalLine2(true);
        setVerticalLine1(false);
        setVerticalLine3(false);
        setVerticalLine4(false);
        setVerticalLine5(false);
      }
      if (scrollY >= 2200) {
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
          source={require("../assets/images/journeyPostsGradients/rachel.png")}
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
                <Text style={styles.postDate}>Dec 10th 2023</Text>
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
              <Text style={styles.postTitle}>The Most Important Career Lessons I’ve Learned</Text>
            </View>
          </View>
          {/* Author's information */}
          <View style={styles.authorInfoContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/mentorProfilePics/bailey.png")}
            />
            <View style={styles.userNameAndIntro}>
              <Text style={styles.userName}>Bailey Borden</Text>
              <Text style={styles.userIntro}>
              BU Alumni{"\n"}Software Engineer @Capital One
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContentContainer}>
          <View style={styles.postContentMainContainer}>
            {/* 1st Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>College Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: When did you start to be aware of your first-gen identity? What does that mean to you?</Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>My first-gen identity for me means independence.{" "}</Text>In high school I realized that there were a lot of steps I needed to take that other students had laid out in front of them.{" "}
                  <Text style={styles.underlinedText}>First-gen identity taught me to actively pursue my opportunities though and appreciate the ones I found even more so.{" "}</Text>
                </Text>
              </View>
              
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: What were some of the challenges you encountered during your computer science studies, and how did you overcome them?</Text>
                <Text style={styles.regularContentText}>
                A lot of the curriculum can be extremely difficult but the biggest challenge I faced though was the more social aspect of going into each of my classes without a support network to help push me. Meeting new people can be incredibly terrifying but if you can push yourself to make those connections then going through a CS course with friends who are understanding and willing to help each other when they’re struggling makes the experience so much better.
                </Text>
              </View>
            </View>
            {/* 2nd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Professional Experience</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: Could you share more about your career journey?</Text>
                <Text style={styles.regularContentText}>My first full time role was with IBM as a Software Engineer in San Jose, which I had interned for the summer before. I transitioned to my full time role during Covid. One year into my role I realized how unhappy I was due to the limited social aspect and the nature of the role. That's when I joined Capital One in Boston. </Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>My transition was a little rough.{" "}</Text>It was a new department and we were low on staff at the time so I had to learn on the fly.{" "}
                  <Text style={styles.underlinedText}>My organization had awesome people I could lean on for support and helped me keep my head above water{" "}</Text>until I could support myself and the rest of my team.
                </Text>
              </View>

              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: Can you share your experience in searching for software engineering internships?</Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Be on the lookout for opportunities to connect with people with similar backgrounds or interests,{" "}</Text>like recruitment events catered for LGBT folks, women in STEM, video game developer conferences,etc.{" "}
                  <Text style={styles.underlinedText}>In person networking events are an amazing way to stand out.{" "}</Text>Remember that a lot of recruiters aren’t looking for your technical skills or brainpower doing events, they already know that the interview process will take care of that.{" "}
                  <Text style={styles.underlinedText}>Focus on showing them your enthusiasm and drive instead and you’ll make a much more lasting impression.{" "}</Text>It doesn’t even need to be job related, just find a way to steer the conversation to something you’ve been obsessing over or a long term passion you’ve always had and they’ll recognize that you can bring that energy into the office too.
                </Text>
              </View>

              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: Were there particular skills or experiences that helped you to navigate the workforce as a young professional?</Text>
                <Text style={styles.regularContentText}>
                   I fully believe that{" "}
                  <Text style={styles.underlinedText}>the most crucial skill you can refine in any type of career is your listening ability{" "}</Text>Misunderstandings happen all the time and in a remote or hybrid workforce where avenues of communication are limited, making sure you’re actively processing the information thrown at you is critical to prevent major errors and missteps.
                </Text>
              </View>
            
            {/* 3rd Step */}
            <View style={styles.individualStep}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Tips and Advice</Text>
              </View>
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: What factors do you believe contributed most to your success?</Text>
                <Text style={styles.regularContentText}>
                It sounds corny but{" "}
                  <Text style={styles.underlinedText}>a positive attitude takes you a super long way.{" "}</Text>Life gets rough, work gets rough, sometimes your team will have a super tight deadline or home life will compound with work stress, but trying to keep a positive perspective genuinely helps you and the people you work with get through those days.{" "}
                  <Text style={styles.underlinedText}>You’ll always be remembered and appreciated for bringing that light to the people around you, and nothing feels better than helping someone else get through a hard day too.{" "}</Text>
                </Text>
              </View>
              
              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: How do you think students can benefit from peer-to-peer relationships?</Text>
                <Text style={styles.regularContentText}>
                  <Text style={styles.underlinedText}>Mutual Support and shared resources are both really important{" "}</Text>things I think Connect+ could provide for first-gen students. A lot of students just don’t know about all the amazing opportunities that Boston holds. Having a place to share information about those opportunities is super useful. Even having the ability to do something as simple as “Hey I found a cool AI conference that so-and-so is holding, would anyone want to go together?” can be really useful for a first-gen student who might be nervous about entering the professional world.
                </Text>
              </View>

              <View style={styles.regularContentContainer}>
                <Text style={styles.regularContentTextBolded}>Q: For students who are about to graduate and start their early careers, what are the top 3 advice you have for them?</Text>
                <Text style={styles.regularContentText}>1.{" "}
                  <Text style={styles.underlinedText}>Alway prioritize a job where you feel happy{" "}</Text>with your role rather than chasing a higher paycheck. Burnout is so real and happens even faster when you’re miserable in your job.
                </Text>
                <Text style={styles.regularContentText}>2.{" "}
                  <Text style={styles.underlinedText}>Don’t feel ashamed of your knowledge gaps.{" "}</Text>No one is expecting you to know everything and a leader always appreciates questions and engagement more than zoom silence.
                </Text>
                <Text style={styles.regularContentText}>3.{" "}
                  <Text style={styles.underlinedText}>Never compare your journey to someone else’s.{" "}</Text>You’re living a life, not checking a bunch of boxes on a list.{" "}
                  <Text style={styles.underlinedText}>There’s no “right” way to be you.{" "}</Text>
                </Text>
              </View>

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
