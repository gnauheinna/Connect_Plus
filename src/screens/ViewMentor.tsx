import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../context/UserContext";
import { Post, usePostContext } from "../context/postContext";

import { useSavedJourneyContext } from "../context/savedJourneyContext";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function MentorProfileScreen({ navigation, route }) {
  const db = getFirestore();
  const { user, setUser } = useUser(); //current logged in user
  const { posts, loading } = usePostContext();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [showLineForQuestions, setshowLineForQuestions] = useState(true);
  const [showLineForJourneys, setshowLineForJourneys] = useState(false);
  const { savedJourneys, setSavedJourneys } = useSavedJourneyContext();
  const [img, setImg] = useState(Image);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewedUser, setViewedUser] = useState({
    name: "",
    email: "",
    major: "",
    year: "",
    userID: "",
    academic: false,
    career: false,
    avatar: "",
    financial: false,
    studentLife: false,
    calendly: "",
  });
  const [chatID, setchatID] = useState("");
  const [advice, setAdvice] = useState<string[]>([
    "Career Advice",
    "Business",
    "Academic Advice",
    "Financial Literacy",
  ]);

  // update user info if viewing another user's profile
  // userId is the id the of the viewed user
  const { userId } = route?.params || {};
  useEffect(() => {
    const updateUser = async () => {
      console.log("updateuser userId", userId);
      if (userId) {
        const userInfo = await getDoc(doc(db, "users", userId));
        const userData = userInfo.data() as {
          name: string;
          email: string;
          major: string;
          year: string;
          userID: string;
          academic: boolean;
          career: boolean;
          avatar: string;
          financial: boolean;
          studentLife: boolean;
          calendly: string;
        };
        if (userData.calendly !== "" && userData.calendly !== undefined) {
          console.log("calendly not empty");
        } else {
          console.log("calendly empty");
        }
        setViewedUser(userData);
      } else {
        console.error("User is not found");
      }
    };
    if (userId !== "" && userId !== undefined) {
      updateUser();
    }
  }, [userId]);

  useEffect(() => {
    // Define the fetchData function here to use the state and props
    const loadPosts = async () => {
      setAllPosts(posts);
    };

    // Call the fetchData function when the component mounts
    loadPosts();
  }, [posts]);

  const filteredPosts = allPosts.filter(
    (post) => user && post.userID == viewedUser.userID
  );

  const filteredJourneys = savedJourneys;

  const avatarImages: { [key: string]: any } = {
    avatar1: require("../../assets/images/avatars/avatar1.png"),
    avatar2: require("../../assets/images/avatars/avatar2.png"),
    avatar3: require("../../assets/images/avatars/avatar3.png"),
    avatar4: require("../../assets/images/avatars/avatar4.png"),
    avatar5: require("../../assets/images/avatars/avatar5.png"),
    avatar6: require("../../assets/images/avatars/avatar6.png"),
    avatar7: require("../../assets/images/avatars/avatar7.png"),
    avatar8: require("../../assets/images/avatars/avatar8.png"),
    avatar9: require("../../assets/images/avatars/avatar9.png"),
  };

  const buttonIcons: { [key: string]: any } = {
    message: require("../../assets/images/icons/MentorMessage.png"),
  };

  return (
    <View style={styles.outterMostContainer}>
      <View style={styles.mentorPictureContainer}>
        <Image
          //   source={avatarImages[viewedUser.avatar]}
          source={require("../../assets/images/mentorCards/Shateva.png")}
          style={styles.mentorPicture}
        />
        <LinearGradient
          colors={["#F9F6FF", "rgba(249, 246, 255, 0.0)"]}
          start={{
            x: 0.0,
            y: 0.0,
          }}
          end={{
            x: 0.0,
            y: 1.0,
          }}
          style={styles.mentorPictureFade}
        />
      </View>
      <ScrollView style={styles.mentorScrollView}>
        <View style={styles.mentorButtonsContainer}>
          <View style={styles.mentorButton}>
            <TouchableOpacity>
              <Image
                source={buttonIcons["message"]}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mentorDescriptionContainer}>
          <View style={styles.mentorTitleContainer}>
            {/* Mentor's name */}
            <Text style={styles.mentorTitle}>{viewedUser.name}</Text>
            {/* Mentor's class and major */}
            {/* Only display the template text if the info has been loaded */}
            {viewedUser.year === "" ? (
              ""
            ) : (
              <Text style={styles.mentorSubtitle}>
                Class of {viewedUser.year}, {viewedUser.major} Major
              </Text>
            )}
          </View>
          <View>
            {/* Display mentor's bio */}
            <Text style={styles.sectionTitle}>Bio:</Text>
            <Text style={styles.sectionDescription}>
              Hi there! I am a first-gen Indian who came to the US with a focus
              on providing a better life for my family but has ultimately led me
              on this path of self-discovery. I am currently a tech consultant
              in the healthcare industry with a focus on stakeholder and lorem
              ipsum filler filler.
            </Text>
          </View>
          {/* Display mentor's open to */}
          <View>
            <Text style={styles.sectionTitle}>Open to:</Text>
            <Text style={styles.sectionDescription}>
              Discussing my love for Cascade Styling Sheets, better known as
              CSS! I love using mathematical specifications and weird mode
              descriptors like "absolute" to produce visual media that is meant
              to be artistic and hand-crafted. And flexing myself in a columnal
              direction? I do it six times a day. Every time I add another
              container inside of a preexisting container, I squeal with joy.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          {/* Display each one of mentor's advice topics */}
          <View>
            <Text style={styles.sectionTitle}>Can give advice in:</Text>
            <View style={styles.adviceContainer}>
              {advice.map((topic) => (
                <View style={styles.adviceTopic}>
                  <Text style={styles.adviceText}>{topic}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  mentorPictureContainer: {
    width: "100%",
    height: 600,
    marginTop: 60,
    position: "absolute",
    top: 0,
    left: 0,
  },
  mentorPicture: {
    width: "100%",
    height: "100%",
  },
  mentorPictureFade: {
    height: 40,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  mentorScrollView: {
    flex: 1,
  },
  mentorButtonsContainer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: 400,
    padding: 20,
    alignItems: "center",
  },
  mentorButton: {
    height: 80,
    width: 80,
  },
  buttonImage: {
    height: "100%",
    width: "100%",
  },
  mentorDescriptionContainer: {
    shadowColor: "#585858",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 35,
    marginTop: 5,
  },
  mentorTitleContainer: {
    height: 100,
  },
  mentorTitle: {
    fontFamily: "Stolzl Medium",
    fontSize: 40,
    textAlign: "center",
  },
  mentorSubtitle: {
    fontFamily: "Stolzl Regular",
    fontSize: 18,
    color: "#838383",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Stolzl Medium",
    fontSize: 20,
    paddingBottom: 10,
  },
  sectionDescription: {
    fontFamily: "Stolzl Medium",
    fontSize: 15,
    color: "#939393",
    lineHeight: 25,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  adviceContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  adviceTopic: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F0E7FE",
  },
  adviceText: {
    fontFamily: "Stolzl Regular",
    fontSize: 15,
    color: "#724EAE",
  },
});
