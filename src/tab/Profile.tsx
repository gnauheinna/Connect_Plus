import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
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
import { useSavedJourneyContext } from "../context/savedJourneyContext";
import { Title } from "react-native-paper";
import { Icon } from "react-native-elements";
import EditProfile from "../screens/EditProfile";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function ProfileScreen({ navigation, route }) {
  const db = getFirestore();
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [avatar, setAvatar] = useState("");
  const [academic, setAcademic] = useState(false);
  const [career, setCareer] = useState(false);
  const [financial, setFinancial] = useState(false);
  const [studentLife, setStudentLife] = useState(false);
  const { posts, loading } = usePostContext();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [showLineForQuestions, setshowLineForQuestions] = useState(true);
  const [chosenJourneys, setchosenJourneys] = useState(false);
  const { savedJourneys, setSavedJourneys } = useSavedJourneyContext();
  const [Mname, setMName] = useState("");
  const [img, setImg] = useState(Image);
  const [modalVisible, setModalVisible] = useState(false);

  // update user info if viewing another user's profile
  // userId is the id the of the viewed user
  // const { userId } = route?.params || {};
  // useEffect(() => {
  //   const updateUser = async () => {
  //     const usersCollection = collection(db, "users");
  //     if (userId) {
  //       const userInfo = await getDoc(doc(db, "users", userId));
  //       const userData = userInfo.data() as {
  //         name: string;
  //         email: string;
  //         major: string;
  //         year: string;
  //         userID: string;
  //         academic: boolean;
  //         career: boolean;
  //         avatar: string;
  //         financial: boolean;
  //         studentLife: boolean;
  //       };
  //       setUser(userData);
  //     } else {
  //       console.error("User is not found");
  //     }
  //   };
  //   if (userId !== "" && userId !== undefined) {
  //     updateUser();
  //     setViewedUser(userId);
  //   }
  // }, [userId]);

  // retrieve user info of viewing another user's profile
  useEffect(() => {
    setName(user.name);
    setMajor(user.major);
    setYear(user.year);
    setAcademic(user.academic);
    setCareer(user.career);
    setFinancial(user.financial);
    setStudentLife(user.studentLife);
    setAvatar(user.avatar);
  }, [user]);

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
    (post) => user && post.userID == user.userID
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
      {/* <View style={styles.container}> */}
      <View style={styles.profileInfoContainer}>
        {/* Display the user's avatar, full name, and intro */}
        <View style={styles.profileContainer}>
          {/* display avatar */}
          <Image source={avatarImages[avatar]} style={styles.profileImage} />
          {/* Display the user's full name and intro */}
          <View>
          <Text style={[styles.userName]}>{name}</Text>
          <Text style={[styles.userIntro]}>
            {" "}
            Class of {year}, {major} Major </Text>
          </View>
        </View>
    

        {/* When viewing your own profile */}
          <View style={styles.aboutMeContainer}>
          <View>
            <Text style={styles.aboutMeText}>Open to Mentorship, Looking for coffee chats, ask me about my startup</Text>
          </View>
            <View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setModalVisible(true)}
              >
                <Icon name="pencil" type="font-awesome" size={18} color="#000" />
              </TouchableOpacity>
              <View style={styles.modalContainer}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <EditProfile close={() => setModalVisible(false)} />
                </Modal>
              </View>
            </View>
        </View>

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

      {/* Horizontal Bar */}
      <View style={styles.horizontalBarContainer}>
        {/* Press on the My Questions tab */}
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
            My Questions
          </Text>
        </TouchableOpacity>
        {/* Display the line underneath the My Questions tab */}
        {showLineForQuestions && <View style={styles.lineForQuestions}></View>}
        {/* Press on the Saved Journeys tab */}
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
            Saved Journeys
          </Text>
        </TouchableOpacity>
        {/* Display the line underneath the Saved Journeys tab */}
        {showLineForJourneys && <View style={styles.lineForJourneys}></View>}
      </View>
      {/* <View style={styles.questionsBigContainer}> */}
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
  },
  bottompartContainer: {},
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 60,
  },
  yourTopContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  profileInfoContainer: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
  profileImg: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    // shadowColor: "#49006C",
    // shadowOffset: {
    //   width: -2,
    //   height: 4,
    // },
    // shadowOpacity: 0.06,
    // shadowRadius: 10,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 10,
  },
  userName: {
    fontFamily: "Stolzl Medium",
    fontSize: 24,
    color: "#000000",
    marginTop: 15,
    marginLeft: 5,
  },
  userIntro: {
    fontSize: 14,
    color: "#838383",
    marginBottom: 10,
    fontFamily: "Stolzl Regular",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
  },
  interestsContainer: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 30,
  },
  individualInterest: {
    marginRight: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F7F4FA",
  },
  interestText: {
    color: "#724EAE",
    fontFamily: "Stolzl Regular",
  },
  nestedBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "#F0EAF6",
    borderBottomWidth: 1,
    paddingVertical: 20,
    backgroundColor: "#F9F6FF",
    // marginBottom: 24,
  },
  horizontalBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "#F0EAF6",
    borderBottomWidth: 1,
    paddingBottom: 20,
    backgroundColor: "white",
    // marginBottom: 24,
  },
  horizontalBarText: {
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 0,
  },
  myQuestionsText: {
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 0,
    fontFamily: "Stolzl Medium",
  },

  savedText: {
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
    zIndex: 1,
  },
  journeysContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    paddingTop: 24,
    zIndex: 1,
  },
  mainQuestionsContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    backgroundColor: "transparent",
  },
  verticalLine: {
    width: 1.5,
    height: 33,
    backgroundColor: "#9286B1",
    marginRight: 8,
    marginLeft: 8,
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

  postLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLikesImg: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: "contain",
  },
  postLikesText: {
    fontSize: 14,
  },
  replyPostContainer: {},
  replyPostImg: {
    maxWidth: 60,
    maxHeight: 20,
    resizeMode: "contain",
  },
  aboutMeContainer: {
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F9F6FF",
  },
  yourAboutMeContainer: {
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  aboutMeText: {
    color: "#724EAE",
    fontFamily: "Stolzl Regular",
    fontSize: 14,
  },
  yourAboutMeText: {
    color: "#838383",
    fontFamily: "Stolzl Regular",
    fontSize: 14,
  },
  editButton: {
    alignSelf: "flex-end",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "gray",
  },
});
