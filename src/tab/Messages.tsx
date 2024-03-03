import { Text, View } from "../components/Themed";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FontSize, Color, FontFamily } from "../../styles/GlobalStyles";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Search from "../components/search";
import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  getFirestore,
  serverTimestamp,
  DocumentData,
  onSnapshot,
  getDoc,
  setDoc,
  doc,
  orderBy,
  updateDoc,
  QuerySnapshot,
  Timestamp,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { useCurrentChat } from "../context/currentChatContext";
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
type UserChat = {
  date: Timestamp;
  chatID: string;
  lastMessage: string;
  userInfo: {
    name: string;
    userID: string;
    avatar: string;
  };
};

export default function MessageScreen({ navigation }) {
  const [allMessage, setAllMessages] = useState<UserChat[] | null>(null);
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const db = getFirestore();
  const {
    currentChatID,
    setCurrentChatID,
    currentChatName,
    setCurrentChatName,
    currentChatUserID,
    setCurrentChatUserID,
    setCurrentChatAvatar,
  } = useCurrentChat();

  async function directToChatBox(
    chatID: string,
    name: string,
    userID: string,
    avatar: string
  ) {
    try {
      // passes the state to CurrentChatContext
      // Save currentChatID to AsyncStorage
      await AsyncStorage.setItem("currentChatID", chatID);
      await AsyncStorage.setItem("currentChatName", name);
      await AsyncStorage.setItem("currentChatUserID", userID);

      setCurrentChatID(chatID);
      setCurrentChatName(name);
      setCurrentChatUserID(userID);
      setCurrentChatAvatar(avatar);

      navigation.navigate("IndividualChat", { chatID: chatID });
    } catch (error) {
      // Handle errors if any
      console.error("Error while setting AsyncStorage:", error);
    }
  }

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const userChatDocRef = doc(db, "userChats", currentUserID);
        const userChatDocSnapshot = await getDoc(userChatDocRef);
        const userChatsData: UserChat[] = [];
        // we if the current userChat exists
        if (userChatDocSnapshot.exists()) {
          const userData = userChatDocSnapshot.data();
          if (userData) {
            // Iterate through the fields in the userChatDocSnapshot
            Object.keys(userData).forEach((key) => {
              const userChatData = userData[key] as UserChat;
              if (
                userChatData.date &&
                userChatData.lastMessage &&
                userChatData.userInfo
              ) {
                userChatsData.push(userChatData);
              }
            });

            // Sort userChatsData by descending date
            userChatsData.sort((a, b) => b.date.toMillis() - a.date.toMillis());
          }
        }
        setAllMessages(userChatsData);
      } catch (error) {
        console.error("Error fetching user chats: ", error);
      }
    };

    if (user.name != "") {
      const userChatDocRef = doc(db, "userChats", user.userID);
      const unsubscribe = onSnapshot(userChatDocRef, (doc) => {
        if (doc.exists()) {
          fetchUserChats();
        } else {
          console.error("Document does not exist");
        }
      });
      return () => unsubscribe();
    } else {
      console.error("user is not defined");
    }
  }, [user]);

  return (
    <View style={styles.outterContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/gradient/messagesBackground.png")}
          resizeMode="cover"
          style={styles.gradientBackground}
        >
          <View style={styles.topContainer}>
            {/* Includes the title 'Chat' and the write button */}
            <View style={styles.titleContainer}>
              <Text style={styles.chatBigTitle}>Chat</Text>
              <TouchableOpacity>
                <Image
                  style={styles.startAChatButton}
                  source={require("../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
            {/* Search Bar */}
            <Search navigation={navigation} />
          </View>
        </ImageBackground>
      </View>
      {/* Scrollable Container */}
      {/* <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      > */}
      <View style={styles.messagesMainContainer}>
        {/* Message Box */}
        <FlatList
          data={allMessage}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.individualMessageContainer}
              onPress={() =>
                directToChatBox(
                  item.chatID,
                  item.userInfo.name,
                  item.userInfo.userID,
                  item.userInfo.avatar
                )
              }
            >
              <View style={styles.individualMessageMainContainer}>
                <View style={styles.profilePicContainer}>
                  <Image
                    style={styles.profilePhoto}
                    source={avatarImages[item.userInfo.avatar]}
                  />
                </View>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>{item.userInfo.name}</Text>
                  <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
                <View style={styles.timestampContainer}>
                  <Text style={styles.messageTimestamp}>
                    {item.date.toDate().toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
  },
  container: {
    marginBottom: 10,
  },
  topContainer: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent",
    paddingTop: 50,
  },
  gradientBackground: {
    width: "100%",
    height: 220,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginBottom: 10,
    marginTop: 24,
  },
  chatBigTitle: {
    fontSize: 42,
    color: "#453B4F",
    alignItems: "center",
    fontFamily: "Stolzl Bold",
  },
  startAChatButton: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  messagesMainContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    flex: 1,
    marginTop: -36,
    zIndex: 2,
    shadowColor: "rgba(73, 0, 108, 0.11)",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  messagesContainer: {
    zIndex: 2,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  individualMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    borderRadius: 30,
  },
  individualMessageMainContainer: {
    flexDirection: "row",
  },
  userInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
  },
  profilePicContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  profilePhoto: {
    width: 64,
    height: 64,
    marginRight: 20,
    alignContent: "center",
  },
  userName: {
    color: "black",
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Stolzl Medium",
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: "grey",
    fontFamily: "Stolzl Regular",
  },
  messageTextContainer: {
    flex: 1,
    width: "95%",
    justifyContent: "flex-start",
    zIndex: 2,
  },
  timestampContainer: {
    marginTop: 24,
  },
  messageTimestamp: {
    color: "#777777",
    fontSize: 12,
    position: "absolute",
    fontFamily: "Stolzl Regular",
  },
});
