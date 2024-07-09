import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize,
} from "../../styles/ProfileStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import IndividualPost from "../components/individualPost";
import { useUser } from "../context/UserContext";
import { Post, usePostContext } from "../context/postContext";
import MJPostCard from "../components/MJPostCard";
import FollowButton from "../components/followButton";
import MessageButton from "../components/messagebutton";
import ScheduleMeeting from "../components/scheduleMeeting";

import { useSavedJourneyContext } from "../context/savedJourneyContext";
import { Title } from "react-native-paper";
import { Icon } from "react-native-elements";
import EditProfile from "../screens/EditProfile";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function ProfileScreen({ navigation, route }) {
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
    handle: "",
  });
  const [chatID, setchatID] = useState("");

  // update user info if viewing another user's profile
  // userId is the id the of the viewed user
  const { userId } = route?.params || {};
  useEffect(() => {
    const updateUser = async () => {
      const usersCollection = collection(db, "users");
      console.log("updateuser userId", userId);
      if (userId) {
        const userInfo = await getDoc(doc(db, "users", userId));
        const userData = (await userInfo.data()) as {
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
          handle: string;
        };
        // test
        if (userData.calendly !== "" && userData.calendly !== undefined) {
          console.log("calendly not empty")
        } else {
          console.log("calendly empty")
        }
        await setViewedUser(userData);
      } else {
        console.error("User is not found");
      }
    };
    if (userId !== "" && userId !== undefined) {
      updateUser();
      setViewedUser(userId);
      console.log("viewprofile chatID debug userid", userId);
      console.log("viewprofile chatID debug userid", user.userID);
      if (user.userID > userId) {
        console.log("viewprofile chatID 1", user.userID + userId);
        setchatID(user.userID + userId);
      } else {
        console.log("viewprofile chatID 2", userId + user.userID);
        setchatID(userId + user.userID);
      }
    }
  }, [userId]);

  //console.log("curruser", currentUserId);
  //console.log("vieweduser", viewedUser);
  function mentorName(Title: string) {
    switch (Title) {
      case "The Ultimate SNAP Guide: Get $200 Monthly for Groceries":
        return "rachel";
        break;
      case "School Program - Alternative Service Break":
        return "rachelFeatured";
        break;
      case "Discovering BU: Campus Communities and Organizations":
        return "neri";
        break;
      case "A First-Gen's Journey from BU to Microsoft":
        return "shatevaFeatured";
        break;
      case "I Got To Create My Own 4 Credit CS Course!":
        return "shateva";
      case "Everything You Need to Know About On-Campus Jobs":
        return "julia";

      default:
        return "rachel";

        break;
    }
  }
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
  function directToMyJourneyPost(postName: string) {
    navigation.navigate(postName);
  }

  return (
    <View style={styles.outterMostContainer}>
      <View style={styles.profileInfoContainer}>
        {/* Display the user's avatar, full name, and intro */}
        <View style={styles.profileContainer}>
          {/* display avatar */}
          <Image
            source={avatarImages[viewedUser.avatar]}
            style={styles.profileImage}
          />
          {/* Display the user's full name and intro */}
          <View style={styles.profileTextContainer}>
            <Text style={[styles.userName]}>{viewedUser.name}</Text>
            <Text style={[styles.userIntro]}>
              {" "}
              Class of {viewedUser.year}, {viewedUser.major} Major{" "}
            </Text>
          </View>
        </View>
        <View style={styles.yourTopContainer}>
          <View style={styles.yourAboutMeContainer}>
            <Text style={styles.yourAboutMeText}>
              Open to Mentorship, Looking for coffee chats, ask me about my
              startup
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ marginRight: 10 }}>
              <FollowButton userIdToFollow={viewedUser.userID} />
            </View>
            <MessageButton
              navigation={navigation}
              chatID={chatID}
              chatUserId={viewedUser.userID}
              chatUserName={viewedUser.name}
              avatar={viewedUser.avatar}
            />
          </View>
          {/* create "Schedule a Meeting" button if calendly link exists */}
          {viewedUser.calendly !== "" && viewedUser.calendly !== undefined && (
            <View style={styles.buttonContainer}>
              <ScheduleMeeting userCalendlyLink={viewedUser.calendly}>
              </ScheduleMeeting>
            </View>
          )}
          {/* Display the user's interests */}
          <View style={styles.interestsContainer}>
            {user && user.academic && (
              <View style={styles.individualInterest}>
                <Text style={styles.interestText}>Academic</Text>
              </View>
            )}
            {user && user.career && (
              <View style={styles.individualInterest}>
                <Text style={styles.interestText}>Career</Text>
              </View>
            )}
            {user && user.financial && (
              <View style={styles.individualInterest}>
                <Text style={styles.interestText}>Financial</Text>
              </View>
            )}
            {user && user.studentLife && (
              <View style={styles.individualInterest}>
                <Text style={styles.interestText}>Student Life</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* Horizontal Bar */}
      <View style={styles.horizontalBarContainer}>
        {/* My Questions tab */}
        <TouchableOpacity
          onPress={() => {
            setshowLineForJourneys(false);
            setshowLineForQuestions(true);
          }}
        >
          <Text
            style={[
              styles.myQuestionsText,
              showLineForJourneys
                ? { color: "#85808C", fontFamily: "Stolzl Regular" }
                : {},
            ]}
          >
            Asks
          </Text>
        </TouchableOpacity>
        {/* Display the line underneath the My Questions tab */}
        {showLineForQuestions && <View style={styles.lineForQuestions}></View>}
        {/* Press on the Saved tab */}
        <TouchableOpacity
          onPress={() => {
            setshowLineForJourneys(true);
            setshowLineForQuestions(false);
          }}
        >
          <Text
            style={[
              styles.savedJourneysText,
              showLineForQuestions
                ? { color: "#85808C", fontFamily: "Stolzl Regular" }
                : {},
            ]}
          >
            Journeys
          </Text>
        </TouchableOpacity>
        {/* Display the line underneath the Saved Journeys tab */}
        {showLineForJourneys && <View style={styles.lineForJourneys}></View>}
      </View>

      {/* Bottom Half of the page*/}

      {!showLineForJourneys ? (
        <FlatList
          style={styles.questionsContainer}
          showsVerticalScrollIndicator={false}
          data={filteredPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postShadowContainer}>
              {/* Displays the post */}
              <IndividualPost navigation={navigation} postId={item.postID} />
            </View>
          )}
        />
      ) : (
        <FlatList
          style={styles.questionsContainer}
          showsVerticalScrollIndicator={false}
          data={filteredJourneys}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const imgSource =
              item.authorName === "Rachel Li"
                ? require("../../assets/images/mentorMyJourneyPics/rachel.png")
                : item.authorName === "Neri Ajiatas Arreaga"
                ? require("../../assets/images/mentorMyJourneyPics/neri.png")
                : item.authorName === "Shateva Long"
                ? require("../../assets/images/mentorMyJourneyPics/shateva.png")
                : item.authorName === "Julia Tran"
                ? require("../../assets/images/mentorMyJourneyPics/julia.png")
                : require("../../assets/images/mentorMyJourneyPics/rachel.png");

            return (
              <View style={styles.myJourneyContainer}>
                <MJPostCard
                  onPress={() =>
                    directToMyJourneyPost(mentorName(item.journeyTitle))
                  }
                  img={imgSource}
                  title={item.journeyTitle}
                  name={item.authorName}
                  year={item.Intro}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  yourTopContainer: {
    paddingTop: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    paddingLeft: 20,
    marginRight: 20,
  },
  profileInfoContainer: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    paddingTop: 80,
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 10,
    borderWidth: 0.2,
  },
  profileTextContainer: {
    paddingLeft: 8,
  },
  userName: {
    fontFamily: "Stolzl Medium",
    fontSize: 22,
    color: "#000000",
    marginTop: 8,
    marginBottom: 3,
    marginLeft: 5,
  },
  userIntro: {
    fontSize: 16,
    color: "#838383",
    marginBottom: 10,
    fontFamily: "Stolzl Regular",
  },

  interestsContainer: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 40,
    marginLeft: 30,
  },
  individualInterest: {
    marginRight: 10,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F0E7FE",
  },
  interestText: {
    color: "#724EAE",
    fontFamily: "Stolzl Regular",
  },
  horizontalBarContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "#F0EAF6",
    borderBottomWidth: 1,
    paddingBottom: 20,
    backgroundColor: "white",
    // marginBottom: 24,
  },
  myQuestionsText: {
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 0,
    fontFamily: "Stolzl Medium",
  },
  savedJourneysText: {
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 0,
    fontFamily: "Stolzl Medium",
  },
  myJourneyContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  lineForQuestions: {
    backgroundColor: "#724EAE",
    height: 2,
    width: "50%",
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  lineForJourneys: {
    backgroundColor: "#724EAE",
    height: 2,
    width: "50%",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  questionsContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    paddingTop: 24,
  },
  postShadowContainer: {
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#49006C",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    marginBottom: 20,
  },
  yourAboutMeContainer: {
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 15,
  },

  yourAboutMeText: {
    color: "#838383",
    fontFamily: "Stolzl Regular",
    fontSize: 15,
  },
});
