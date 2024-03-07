import React, { useState, useEffect } from "react";
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
} from "firebase/firestore";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Avatar, IconButton } from "react-native-paper";
import { Image } from "react-native";

// Defines the properties that the individualComment component expects: user's name, profile picture, content, timestamp, and the reply button
interface IndividualCommentProps {
  username: string;
  intro: string;
  timestamp: string;
  content: string;
  avatar: string;
  // userId: string;
  navigation: any;
}

const IndividualComment: React.FC<IndividualCommentProps> = ({
  username,
  intro,
  timestamp,
  content,
  avatar,
  // userId,
  navigation,
}) => {
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
  return (
    <View style={styles.outermostContainer}>
      <View style={styles.mainContainer}>
        {/* Display the profile image */}
        <View style={styles.profileImgContainer}>
          <Image style={styles.profileImg} source={avatarImages[avatar]} />
        </View>
        {/* Display the comment box */}
        <View style={styles.commentContainer}>
          {/* Display the user info and timestamp of the comment */}
          <View style={styles.topPortionContainer}>
            {/* Display the username and timestamp */}
            <View style={styles.userInfoContainer}>


            {/* <TouchableOpacity 
              onPress={() => {
                console.log("USER ID", userId); // Log the user ID
                console.log("USERNAME", username); // Log the username
                navigation.navigate('ViewProfile', { userId: userId }); // Navigate to the 'Profile' screen with the user's ID as a parameter
              }}
            >
              <Text style={styles.userName}>{username}</Text>
            </TouchableOpacity> */}

            <Text style={styles.userName}>{username}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            {/* Display the timestamp */}
            <View style={styles.introContainer}>
              <Text style={styles.userIntro}>{intro}</Text>
            </View>
          </View>
          {/* Display the comment content */}
          <View style={styles.bottomPortionContainer}>
            {/* Display the content */}
            <Text style={styles.commentContent}>{content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IndividualComment;

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImgContainer: {
    marginRight: 10,
  },
  profileImg: {
    width: 48,
    height: 48,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 15,
  },
  topPortionContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 8,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Stolzl Medium",
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
    fontFamily: "Stolzl Regular",
  },
  userIntro: {
    fontSize: 12,
    color: "#888888",
    fontFamily: "Stolzl Regular",
  },
  introContainer: {},
  bottomPortionContainer: {},
  commentContent: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Stolzl Regular",
  },
});
