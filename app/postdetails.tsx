import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  onSnapshot,
  Timestamp,
  collection,
} from "firebase/firestore";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import IndividualPost from "../components/individualPost";
import IndividualComment from "../components/individualComment";
import { useRouter } from "expo-router";
import { useUser } from "./context/UserContext";
import { PostIdContext, PostIdProvider } from "./context/PostIDContext";
import { Post, usePostContext } from "./context/postContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Comment = {
  avatar: string;
  commentID: string;
  date: Timestamp;
  userIntro: string;
  userID: string;
  userName: string;
  text: string;
};

export default function PostDetails() {
  const [commentarr, setCommentArr] = useState<Comment[]>([]);
  const { curPostID, setCurPostID } = useContext(PostIdContext);
  const { posts, loading } = usePostContext();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { user, setUser } = useUser();
  const db = getFirestore();
  const router = useRouter();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const comment = async () => {
    const randomString = Math.random().toString(36).substring(7);
    await updateDoc(doc(db, "comments", curPostID), {
      commentArr: arrayUnion({
        commentID: randomString,
        text: content,
        userID: user.userID,
        userName: user.name,
        avatar: user.avatar,
        userIntro: "Class of " + user.year + ", " + user.major + " Major",
        date: Timestamp.now(),
      }),
    });
    console.log("current senderID: ", user.userID);
  };

  useEffect(() => {
    // set curPostID from local storage when the page refreshes
    const setPostIDFromStorage = async () => {
      if (curPostID != "") {
        const storedPostID = await AsyncStorage.getItem("curPostID");
        if (storedPostID !== null) {
          console.log("this is storedChatID: ", storedPostID);
          setCurPostID(storedPostID);
        }
      } else {
        console.log("this is useEffect hook curPostID :", curPostID);
      }
    };
    setPostIDFromStorage();
  }, []);

  useEffect(() => {
    // Define the fetchData function here to use the state and props
    const loadPosts = async () => {
      setAllPosts(posts);
    };
    console.log("here are the posts");
    console.log(posts);
    // Call the fetchData function when the component mounts
    loadPosts();
  }, [posts, curPostID]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentRef = doc(db, "comments", curPostID);

        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(commentRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const commentData = docSnapshot.data();
            console.log("comment snapshot array: ", commentData?.commentArr);
            if (commentData && commentData.commentArr) {
              setCommentArr(commentData.commentArr);
            } else {
              setCommentArr([]);
            }
          } else {
            setCommentArr([]);
          }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchComments();
  }, [curPostID]); // Add curPostID as a dependency
  useEffect(() => {
    console.log("comment array: ", commentarr);
  }, [commentarr]);

  useEffect(() => {
    const filteredPosts = allPosts.find((post) => post.postID == curPostID);
    console.log(curPostID);
  }, [allPosts]);

  return (
    <View style={styles.outermostContainer}>
      <View style={styles.tempContainer}>
        {/*  Back Button */}
        <View style={styles.backBtnContainer}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              router.push("/community");
            }}
          >
            <Image
              style={styles.backBtnImg}
              source={require("../assets/images/icons/blackBack.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.postContainer}>
              {/* Displays the post */}
              <IndividualPost postId={curPostID} />
            </View>
            {/* Divider line */}
            <View style={styles.dividerLine} />
            {/* Display the comments */}
            <View style={styles.repliesTitle}>
              <Text style={styles.replyTitle}>Replies</Text>
            </View>

            {/* <ScrollView
              style={styles.commentsContainer}
              showsVerticalScrollIndicator={false}
            > */}
              <FlatList
              style={styles.commentsContainer}
                data={commentarr.sort(
                  (a, b) =>
                    new Date(b.date.toDate()).getTime() -
                    new Date(a.date.toDate()).getTime()
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <IndividualComment
                    avatar={item.avatar}
                    username={item.userName}
                    intro={item.userIntro}
                    timestamp={item.date.toDate().toLocaleDateString()}
                    content={item.text}
                  />
                )}
              />
            {/* </ScrollView> */}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-10}
          style={{ backgroundColor: "white" }}
        >
          <View style={styles.inputMessageContainer}>
            {/* Box to type your message */}
            <TouchableOpacity style={styles.inputMessageBox}>
              <TextInput
                style={styles.inputText}
                placeholder="Add a Comment"
                value={content}
                onChangeText={(text) => setContent(text)}
                multiline={true}
                numberOfLines={10}
              />
            </TouchableOpacity>
            {/* Send Icon */}
            <TouchableOpacity
              onPress={() => {
                if (content.trim() !== "") {
                  comment();
                  Keyboard.dismiss();
                  setContent("");
                }
              }}
            >
              <Image
                style={styles.sendIcon}
                source={require("../assets/images/icons/sendMessage.png")}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  tempContainer: {
    flex: 1,
  },
  backBtnContainer: {
    top: 60,
    left: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 60,
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
  replyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#7F7F7F",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  postContainer: {},
  bottomPartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 24,
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
  dividerLine: {
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 48,
    textAlign: "left",
  },
  titleTimestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  content: {
    fontSize: 14,
    textAlign: "left",
  },
  verticalLine: {
    width: 1.5,
    height: 33,
    backgroundColor: "#9286B1",
    marginRight: 8,
    marginLeft: 8,
  },
  repliesTitle: {
    marginRight: 20,
  },
  commentsContainer: {
    flex: 1,
    paddingBottom: 32,
    borderWidth: 0,
    marginBottom: 16,
  },
  inputContent: {
    paddingTop: 32,
    // width: "100%",
    fontSize: 18,
    outlineColor: "white",
    marginTop: 10,
  },
  postBtn: {
    backgroundColor: "#E2B8E0",
    marginTop: 40,
    marginBottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 5,
    borderRadius: 20,
    width: 80,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  postText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#9A969F",
  },
  inputMessageContainer: {
    flexDirection: "row",
    bottom: 20,
    width: "100%",
    marginLeft: 20,
    paddingTop: 16,
    marginRight: 20,
    backgroundColor: "white",
  },
  inputMessageBox: {
    borderRadius: 30,
    backgroundColor: "#EFEFEF",
    width: 280,
    height: 42,
    marginRight: 20,
  },
  messageText: {
    color: "#9A969F",
    fontSize: 14,
  },
  sendIcon: {
    width: 42,
    height: 42,
  },
  inputText: {
    color: "#777777",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
    fontFamily: "Stolzl Regular",
  },
});
