import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  increment,
  addDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { AuthErrorCodes } from "firebase/auth";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Card } from "react-native-paper";
import IndividualPost from "../components/individualPost";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from "../context/UserContext";
import { LikeContext, useLikeContext } from "../context/likeContext";
// import postQuestions from "../post";
import { Post, PostProvider, usePostContext } from "../context/postContext";
import { PostIdContext } from "../context/PostIDContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AskNShareScreen({ navigation }) {
  if (getApps() == null) {
    const app = initializeApp(firebaseConfig);
  }

  const { posts, setPosts, loading, setLoading } = usePostContext();

  const db = getFirestore();
  const auth = getAuth();
  const { user, setUser } = useUser();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [likePressed, setlikePressed] = useState(false);
  // Set the initially selected tag to be All
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedAll, setSelectedAll] = useState(true);
  // use PostIDContext
  const { curPostID, setCurPostID } = useContext(PostIdContext);
  // like context
  function directToPost() {
    navigation.navigate("Post");
  }

  function viewPostDetails(postId: string) {
    AsyncStorage.setItem("curPostID", postId);
    setCurPostID(postId);
    navigation.navigate("PostDetails");
  }

  useEffect(() => {
    // Define the fetchData function here to use the state and props
    const processPosts = async () => {
      // Check if the new posts are different from the old ones
      if (JSON.stringify(allPosts) !== JSON.stringify(posts)) {
        setAllPosts(posts);
      }
    };
    // Call the fetchData function when the component mounts
    processPosts();
  }, [posts]);

  const filteredPosts = allPosts.filter(
    (post) => post.tag === selectedTag || selectedTag === "All"
  );

  const [likedPostId, setLikedPostId] = useState<string | null>(null);
  const [likedPostLikesCount, setLikedPostLikesCount] = useState<number>(0);

  return (
    <View style={styles.outermostContainer}>
      <ImageBackground
        source={require("../../assets/images/gradient/whiteGradientAskNShare.png")}
        resizeMode="cover"
        style={styles.gradientBackground}
      >
        <View style={styles.topContainer}>
          {/* Display the horizontal sub-navigation bar on top of the posts */}
          <View style={styles.bigTitleContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.askAndShareTitle}>Ask & Share</Text>
            </View>
            {/* <TouchableOpacity>
              <Image
                source={require("../../assets/images/icons/notification.png")}
                style={styles.notificationIcon}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.horizontalNavOuttermostContainer}>
            <View style={styles.horizontalSubNavMainContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={
                    selectedAll
                      ? styles.horizontalSubNavSelected
                      : styles.horizontalSubNav
                  }
                  onPress={() => {
                    setSelectedTag("All");
                    setSelectedAll(true);
                  }}
                >
                  <Text style={styles.categoryText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedTag === "Financial"
                      ? styles.horizontalSubNavSelected
                      : styles.horizontalSubNav
                  }
                  onPress={() => {
                    setSelectedTag("Financial");
                    setSelectedAll(false);
                  }}
                >
                  <Text style={styles.categoryText}>Financial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedTag === "Academic"
                      ? styles.horizontalSubNavSelected
                      : styles.horizontalSubNav
                  }
                  onPress={() => {
                    setSelectedTag("Academic");
                    setSelectedAll(false);
                  }}
                >
                  <Text style={styles.categoryText}>Academic</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedTag === "Student Life"
                      ? styles.horizontalSubNavSelected
                      : styles.horizontalSubNav
                  }
                  onPress={() => {
                    setSelectedTag("Student Life");
                    setSelectedAll(false);
                  }}
                >
                  <Text style={styles.categoryText}>Student Life</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedTag === "Career"
                      ? styles.horizontalSubNavSelected
                      : styles.horizontalSubNav
                  }
                  onPress={() => {
                    setSelectedTag("Career");
                    setSelectedAll(false);
                  }}
                >
                  <Text style={styles.categoryText}>Career</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
      {/* render the FlatList directly*/}
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <FlatList
            data={filteredPosts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.postShadowContainer}>
                <IndividualPost navigation={navigation} postId={item.postID} />
              </View>
            )}
          />
        </View>
        {/* Post button */}
        <View style={styles.postBtnContainer}>
          <TouchableOpacity style={styles.postBtn} onPress={directToPost}>
            <Image
              style={styles.postBtnImg}
              source={require("../../assets/images/icons/makeAPost.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  mainContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F9F6FF",
  },
  postShadowContainer: {
    backgroundColor: "white",
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 100,
  },
  topContainer: {
    paddingTop: 60,
    backgroundColor: "transparent",
    marginLeft: 20,
    marginRight: 20,
  },
  gradientBackground: {
    width: "100%",
    height: 90,
    zIndex: 1,
  },
  bigTitleContainer: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  askAndShareTitle: {
    fontSize: 42,
    color: "#453B4F",
    fontWeight: "bold",
    fontFamily: "Stolzl Bold",
  },
  notificationIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  horizontalNavOuttermostContainer: {
    backgroundColor: "transparent",
  },
  horizontalSubNavMainContainer: {
    // position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  horizontalSubNav: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
  },
  horizontalSubNavSelected: {
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: "#FFD465",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
  },
  categoryText: {
    fontFamily: "Stolzl Regular",
  },
  postContainer: {
    backgroundColor: "#F9F6FF",
  },
  verticalLine: {
    width: 1.5,
    height: 33,
    backgroundColor: "#9286B1",
    marginRight: 8,
    marginLeft: 8,
  },

  postBtnContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 20,
    right: 20,
  },
  postBtn: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  postBtnImg: {
    width: 56,
    height: 56,
  },
});
