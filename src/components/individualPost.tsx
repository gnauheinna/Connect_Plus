import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  View,
  Text,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  Firestore,
} from "firebase/firestore";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Avatar, IconButton } from "react-native-paper";
import { Image, Modal } from "react-native";

import { useUser } from "..//context/UserContext";
import { PostProvider, usePostContext } from "../context/postContext";
import { PostIdContext } from "../context/PostIDContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useSavedPostsContext } from "../context/savedPostsContext";
import { useLikeContext } from "../context/likeContext";

interface IndividualPostProps {
  postId: string;
  navigation: any;
}

const IndividualPost: React.FC<IndividualPostProps> = ({
  postId,
  navigation,
}) => {
  const [likePressed, setlikePressed] = useState(false);
  const [postSaved, setPostSaved] = useState(false);

  function viewPostDetails(postId: string) {
    AsyncStorage.setItem("curPostID", postId);
    setCurPostID(postId);
    navigation.navigate("PostDetails");
  }
  const { user, setUser } = useUser();

  // User PostContext
  const { posts, loading } = usePostContext();
  const [tag, setTag] = useState("");

  const post = posts.find((post) => post.postID === postId);
  //use PostIDContext
  const { curPostID, setCurPostID } = useContext(PostIdContext);
  useEffect(() => {
    if (post) {
      setTag(post.tag);
    }
  }, [posts, postId]);

  const { savedPostArr, setSavedPostArr } = useSavedPostsContext();
  const { likeArr, setLikeArr } = useLikeContext();
  // on bootup, determine whether this post was previously saved and
  // should start with the save button active
  useEffect(() => {
    console.log(postId)
    console.log(savedPostArr.map((post) => post.postID).includes(postId))
    setPostSaved(savedPostArr.map((post) => post.postID).includes(postId));
    setlikePressed(likeArr.map((post) => post.postID).includes(postId));
  }, [savedPostArr, likeArr]);

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

  const handleLikePress = async () => {
    setlikePressed(!likePressed);
    const db = getFirestore();
    const savedRef = doc(db, "userLike/", user.userID);
    if (!likePressed) {
      setlikePressed(true);
      let newLikesArr = likeArr.slice();
      newLikesArr.push({ postID: postId });
      setLikeArr(newLikesArr);
      await updateDoc(savedRef, {
        likes: arrayUnion(postId),
      }).catch((err) => console.log(err));
    } else {
      setlikePressed(false);
      let newLikesArr = likeArr
        .slice()
        .filter((post) => post.postID !== postId);
      setLikeArr(newLikesArr);
      await updateDoc(savedRef, {
        likes: arrayRemove(postId),
      }).catch((err) => console.log(err));
    }
  };

  const handleSavePress = async () => {
    setPostSaved(!postSaved);
    const db = getFirestore();
    const savedRef = doc(db, "userSavedANS/", user.userID);
    if (!postSaved) {
      setPostSaved(true);
      let newSPA = savedPostArr.slice();
      newSPA.push({ postID: postId });
      setSavedPostArr(newSPA);
      await updateDoc(savedRef, {
        saved: arrayUnion(postId),
      }).catch((err) => console.log(err));
    } else {
      setPostSaved(false);
      let newSPA = savedPostArr
        .slice()
        .filter((post) => post.postID !== postId);
      setSavedPostArr(newSPA);
      await updateDoc(savedRef, {
        saved: arrayRemove(postId),
      }).catch((err) => console.log(err));
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => viewPostDetails(postId)}>
        {post && (
          <View style={{ ...styles.itemContainer }}>
            {/* Display the user's profile image, name, and intro on the top */}
            <View style={styles.userContainer}>
              <View style={styles.userInfo}>
                {/* Press avatar to use other person's profile page */}
                <TouchableOpacity
                  onPress={() => {
                    if (post.userID !== user.userID) {
                      // Navigate to the other user's profile
                      navigation.navigate("ViewProfile", {
                        userId: post.userID,
                      });
                    } else {
                      // Navigate to the user's profile
                      navigation.navigate("Profile", {
                        navigation: navigation,
                      });
                    }
                  }}
                >
                  <Image
                    style={styles.profileImg}
                    source={avatarImages[post.avatar]}
                  />
                </TouchableOpacity>
                <View style={styles.userNameAndIntro}>
                  <Text style={styles.userName}>{post.userName}</Text>
                  <Text style={styles.userIntro}>{post.major}</Text>
                </View>
              </View>
              {/* Display the tag that is associated with the post to the right of the user's information */}
              <View style={styles.tagContainer}>
                {post.tag && (
                  <View>
                    <Text style={styles.tagText}>{post.tag}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.titleTimestampContainer}>
              {/* Display the title of the post */}
              <Text style={styles.title}>{post.title}</Text>
            </View>

            {/* Display the content of the post */}
            <Text style={styles.content}>{post.content}</Text>

            {/* Display the timestamp of the post */}
            <Text style={styles.timestamp}>
              {post.timestamp &&
                new Date(post.timestamp.toDate()).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.bottomPartContainer}>
        {/* Display the like icon and like number */}
        <TouchableOpacity
          style={styles.postLikesContainer}
          onPress={() => handleLikePress()}
        >
          <Image
            style={styles.postLikesImg}
            source={
              likePressed
                ? require("../../assets/images/icons/filledHeart.png")
                : require("../../assets/images/icons/unfilledHeart.png")
            }
          />
        </TouchableOpacity>
        {/* Display the save button */}
        <TouchableOpacity
          style={styles.postLikesContainer}
          onPress={() => handleSavePress()}
        >
          <Image
            style={styles.postLikesImg}
            source={
              postSaved
                ? require("../../assets/images/icons/journeySaved.png")
                : require("../../assets/images/icons/journeyUnsaved.png")
            }
          />
        </TouchableOpacity>
        {/* Display the reply button */}
        <TouchableOpacity
          style={styles.replyPostContainer}
          onPress={() => viewPostDetails(postId)}
        >
          <Image
            style={styles.replyPostImg}
            source={require("../../assets/images/icons/reply.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default IndividualPost;

const styles = StyleSheet.create({
  itemContainer: {},
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  profileImg: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
  },
  userNameAndIntro: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    fontFamily: "Stolzl Regular",
  },
  userIntro: {
    fontSize: 12,
    color: "#888888",
    fontFamily: "Stolzl Regular",
  },
  title: {
    fontSize: 16,
    marginRight: 24,
    textAlign: "left",
    fontFamily: "Stolzl Medium",
  },
  titleTimestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
    fontFamily: "Stolzl Regular",
  },
  content: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Stolzl Regular",
    lineHeight: 20,
  },
  tagContainer: {
    backgroundColor: "#FFD465",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "flex-end",
    borderColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    marginTop: 5,
  },
  tagText: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "400",
    fontFamily: "Stolzl Regular",
  },
  interestsContainer: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  individualInterest: {
    marginRight: 10,
    backgroundColor: "#F6F5F0",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  iconsOnPosts: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#E6DBF3",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 0,
  },
  iconWrapper: {
    marginHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
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
});
