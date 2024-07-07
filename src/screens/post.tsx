import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import { getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../context/UserContext";
import { Image } from "expo-image";
import { getBackgroundColor } from "react-native-ui-lib/src/helpers/AvatarHelper";
import { Post, usePostContext } from "../context/postContext";

export default function PostScreen({ navigation }) {
  // Get a reference to the Firebase database
  const db = getFirestore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { user, setUser } = useUser();
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [tag, setTag] = useState("");
  const [AButtonVisible, setAButtonVisible] = useState(true);
  const [FButtonVisible, setFButtonVisible] = useState(true);
  const [CButtonVisible, setCButtonVisible] = useState(true);
  const [SButtonVisible, setSButtonVisible] = useState(true);
  const [RButtonVisible, setRButtonVisible] = useState(true);
  const [CrossButtonVisible, setCrossButtonVisible] = useState(false);
  const [isPostCompleted, setIsPostCompleted] = useState(false);
  const { posts, setPosts, loading, setLoading } = usePostContext();

  function directToComm() {
    loadPosts();
    navigation.navigate("Tabs", { screen: "AskNShare" });
  }

  const loadPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const querySnapshot = await getDocs(postsCollection);
      const postData: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          // validatePostData is a function you'd need to implement
          postData.push(data as Post);
        }
      });
      postData.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
      setPosts(postData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  // Set postIsCompleted to true if a post is complete
  useEffect(() => {
    const postIsCompleted = title !== "" && content !== "" && tag !== "";
    setIsPostCompleted(postIsCompleted);
  }, [title, content, tag]);

  const handlePost = async () => {
    const postsCollection = collection(db, "posts");
    // Create a new post object
    const newPost = {
      title,
      content,
      timestamp: serverTimestamp(),
      userName: user.name,
      major: user.major,
      userID: user.userID,
      avatar: user.avatar,
      tag,
      likesCount: 0,
    };
    if (isPostCompleted) {
      // Push the new post to the database
      const newPostRef = await addDoc(postsCollection, newPost);
      const postID = newPostRef.id;
      // Update the document with the postID field
      await updateDoc(newPostRef, { postID });
      createNewComment(postID);
      // Add a "likes" subcollection to the new post
      const likesCollection = collection(newPostRef, "likes");
      await addDoc(likesCollection, {});
      // Clear the input fields
      setTitle("");
      setContent("");
      setUserName("");
      setUserID("");
      setTag("");
      // Reset the UI for the tags
      makeAllTagsAppear();
      // Show the success message
      setShowSuccessMessage(true);
      // Hide the success message after a few seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      // Direct back to the community page
      directToComm();
    } else {
      console.log("Post is not complete!");
    }
  };

  async function createNewComment(postid: string) {
    await setDoc(doc(db, "comments", postid), {
      postID: postid,
      commentArr: [],
    });
  }

  const AIsSelected = () => {
    setTag("Academic");
    setCrossButtonVisible(true);
    setFButtonVisible(false);
    setCButtonVisible(false);
    setSButtonVisible(false);
    setRButtonVisible(false);
  };
  const RIsSelected = () => {
    setTag("Academic");
    setCrossButtonVisible(true);
    setFButtonVisible(false);
    setCButtonVisible(false);
    setSButtonVisible(false);
    setAButtonVisible(false);
  };

  const FIsSelected = () => {
    setTag("Financial");
    setCrossButtonVisible(true);
    setAButtonVisible(false);
    setCButtonVisible(false);
    setSButtonVisible(false);
    setRButtonVisible(false);
  };

  const CIsSelected = () => {
    setTag("Career");
    setCrossButtonVisible(true);
    setAButtonVisible(false);
    setFButtonVisible(false);
    setSButtonVisible(false);
    setRButtonVisible(false);
  };

  const StuLifeIsSelected = () => {
    setTag("Student Life");
    setCrossButtonVisible(true);
    setAButtonVisible(false);
    setCButtonVisible(false);
    setFButtonVisible(false);
    setRButtonVisible(false);
  };

  const makeAllTagsAppear = () => {
    setCrossButtonVisible(false);
    setAButtonVisible(true);
    setCButtonVisible(true);
    setFButtonVisible(true);
    setSButtonVisible(true);
    setRButtonVisible(true);
    setTag("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.outermostContainer}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.backPostContainer}>
            {/*  Back Button */}
            <View style={styles.backBtnContainer}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                  navigation.navigate("Tabs", { screen: "AskNShare" });
                }}
              >
                <Image
                  style={styles.backBtnImg}
                  source={require("../../assets/images/icons/blackBack.png")}
                />
              </TouchableOpacity>
            </View>
            {/* Post Button */}
            <TouchableOpacity
              style={[
                styles.postBtn,
                { backgroundColor: isPostCompleted ? "#E2B8E0" : "#E6E6E6" },
              ]}
              onPress={handlePost}
            >
              <Text
                style={[
                  styles.postText,
                  { color: isPostCompleted ? "#3A3340" : "#9A969F" },
                ]}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          {/* Enter the title of the post */}
          <TextInput
            style={[styles.inputTitle]}
            placeholder="Title"
            placeholderTextColor="#888888"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          {/* Enter the content of the post */}
          <TextInput
            style={[styles.inputContent]}
            placeholder="What is your question?"
            placeholderTextColor="#888888"
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline={true}
            numberOfLines={10}
          />

          {/* Add a tag for this post: Financial, Academics, Student Life, or Career */}
          <Text style={styles.selectTagText}>Select a Tag</Text>
          <View style={styles.addTagContainer}>
            {AButtonVisible && (
              <View style={CrossButtonVisible && styles.crossBtnContainer}>
                <TouchableOpacity
                  style={
                    CrossButtonVisible
                      ? styles.addTagBtnActive
                      : styles.addTagBtn
                  }
                  onPress={AIsSelected}
                >
                  <Text
                    style={
                      CrossButtonVisible
                        ? styles.addTagTextActive
                        : styles.addTagText
                    }
                  >
                    Academic
                  </Text>
                </TouchableOpacity>
                {CrossButtonVisible && (
                  <View style={styles.crossBtnSubContainer}>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={makeAllTagsAppear}
                    >
                      <Image
                        style={styles.crossIcon}
                        source={require("../../assets/images/cross.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {RButtonVisible && (
              <View style={CrossButtonVisible && styles.crossBtnContainer}>
                <TouchableOpacity
                  style={
                    CrossButtonVisible
                      ? styles.addTagBtnActive
                      : styles.addTagBtn
                  }
                  onPress={AIsSelected}
                >
                  <Text
                    style={
                      CrossButtonVisible
                        ? styles.addTagTextActive
                        : styles.addTagText
                    }
                  >
                    Resource
                  </Text>
                </TouchableOpacity>
                {CrossButtonVisible && (
                  <View style={styles.crossBtnSubContainer}>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={makeAllTagsAppear}
                    >
                      <Image
                        style={styles.crossIcon}
                        source={require("../../assets/images/cross.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {FButtonVisible && (
              <View style={CrossButtonVisible && styles.crossBtnContainer}>
                <TouchableOpacity
                  style={
                    CrossButtonVisible
                      ? styles.addTagBtnActive
                      : styles.addTagBtn
                  }
                  onPress={FIsSelected}
                >
                  <Text
                    style={
                      CrossButtonVisible
                        ? styles.addTagTextActive
                        : styles.addTagText
                    }
                  >
                    Financial
                  </Text>
                </TouchableOpacity>
                {CrossButtonVisible && (
                  <View style={styles.crossBtnSubContainer}>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={makeAllTagsAppear}
                    >
                      <Image
                        style={styles.crossIcon}
                        source={require("../../assets/images/cross.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {CButtonVisible && (
              <View style={CrossButtonVisible && styles.crossBtnContainer}>
                <TouchableOpacity
                  style={
                    CrossButtonVisible
                      ? styles.addTagBtnActive
                      : styles.addTagBtn
                  }
                  onPress={CIsSelected}
                >
                  <Text
                    style={
                      CrossButtonVisible
                        ? styles.addTagTextActive
                        : styles.addTagText
                    }
                  >
                    Career
                  </Text>
                </TouchableOpacity>
                {CrossButtonVisible && (
                  <View style={styles.crossBtnSubContainer}>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={makeAllTagsAppear}
                    >
                      <Image
                        style={styles.crossIcon}
                        source={require("../../assets/images/cross.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {SButtonVisible && (
              <View style={CrossButtonVisible && styles.crossBtnContainer}>
                <TouchableOpacity
                  style={
                    CrossButtonVisible
                      ? styles.addTagBtnActive
                      : styles.addTagBtn
                  }
                  onPress={StuLifeIsSelected}
                >
                  <Text
                    style={
                      CrossButtonVisible
                        ? styles.addTagTextActive
                        : styles.addTagText
                    }
                  >
                    Student Life
                  </Text>
                </TouchableOpacity>
                {CrossButtonVisible && (
                  <View style={styles.crossBtnSubContainer}>
                    <TouchableOpacity
                      style={styles.crossBtn}
                      onPress={makeAllTagsAppear}
                    >
                      <Image
                        style={styles.crossIcon}
                        source={require("../../assets/images/cross.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  outermostContainer: {
    flex: 1,
  },
  mainContainer: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
  },
  backBtnContainer: {
    marginTop: 60,
    marginBottom: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
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
  backPostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Stolzl Bold",
  },
  inputTitle: {
    padding: 10,
    width: "80%",
    marginVertical: 10,
    fontSize: 32,
    fontFamily: "Stolzl Bold",
    marginBottom: -10,
    // outlineColor: "white",
  },
  inputContent: {
    padding: 10,
    width: "100%",
    fontSize: 18,
    // outlineColor: "white",
    marginTop: 10,
    fontFamily: "Stolzl Regular",
  },
  postBtn: {
    backgroundColor: "#E2B8E0",
    marginTop: 60,
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
    fontSize: 16,
    alignSelf: "center",
    color: "#9A969F",
    fontFamily: "Stolzl Regular",
  },
  addTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  crossBtnContainer: {
    flexDirection: "row",
  },
  crossBtnSubContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  addTagSubContainer: {
    flex: 1,
    flexDirection: "row",
  },
  selectTagText: {
    fontSize: 18,
    color: "#3A3340",
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 120,
    fontFamily: "Stolzl Medium",
  },
  addTagBtn: {
    borderColor: "#FFC940",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 8,
  },
  addTagBtnActive: {
    backgroundColor: "#FFC940",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 8,
  },
  addTagText: {
    fontSize: 16,
    color: "#FFC940",
    alignSelf: "center",
    fontWeight: "500",
    fontFamily: "Stolzl Regular",
  },
  addTagTextActive: {
    fontSize: 16,
    color: "#3A3340",
    alignSelf: "center",
    fontWeight: "500",
    fontFamily: "Stolzl Regular",
  },
  crossBtn: {
    width: 36,
    height: 36,
    borderRadius: 20,
    padding: 4,
    backgroundColor: "#FFF6E0",
    justifyContent: "center",
    alignSelf: "center",
  },
  crossIcon: {
    width: 14,
    height: 14,
    alignSelf: "center",
  },
});
