import React, { useRef, useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import "react-native-get-random-values";
import { Text, View } from "../components/Themed";
import {
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  onSnapshot,
  Timestamp,
  arrayUnion,
  collection,
  setDoc,
} from "firebase/firestore";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import IndividualPost from "../components/individualPost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrentChat } from "../context/currentChatContext";
import { useUser } from "../context/UserContext";

type Chats = {
  chatID: string;
  date: Timestamp;
  senderID: string;
  text: string;
};
export default function IndividualChatScreen({ navigation, route }) {
  const chatID = route.params.chatID;
  const ChatUserId = route.params.ChatUserId;
  const db = getFirestore();
  const { user, setUser } = useUser();
  // userData is the other user's userdata
  const [userData, setUserData] = useState({
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
  });

  const currentUserID = user.userID;
  const [chats, setChats] = useState<Chats[]>([]);
  const [inputText, setInputText] = useState("");

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

  useEffect(() => {
    const updateUser = async () => {
      const usersCollection = collection(db, "users");
      console.log("updateuser userId in", ChatUserId);
      const userInfo = await getDoc(doc(db, "users", ChatUserId));
      const userDatafb = userInfo.data() as {
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
      };
      console.log(
        "userData after updating everything from individual chat",
        userData
      );
      await setUserData(userDatafb);
    };
    updateUser();
  }, []);

  // fetches the correct chat
  useEffect(() => {
    // fetches chat again everytime there is a new message
    const userChatDocRef = doc(db, "chats", chatID);
    const fetchUserChat = async () => {
      const userChatDocSnapshot = await getDoc(userChatDocRef);
      const chatArray: Chats[] = [];
      const userChatData = userChatDocSnapshot.data();
      if (userChatData) {
        setChats(userChatData.messages);
      }
    };

    const createNewChat = async () => {
      // Document doesn't exist, create a new one
      try {
        // create new Chat
        await setDoc(userChatDocRef, { messages: [] });
        setChats([]);
        // Define the new field you want to add
        const newField = {
          [chatID]: {
            chatID: chatID,
            date: Timestamp.now(),
            lastMessage: "boohoo",
            userInfo: {
              name: userData.name,
              avatar: userData.avatar,
              userID: ChatUserId,
            },
          },
        };
        const othernewField = {
          [chatID]: {
            chatID: chatID,
            date: Timestamp.now(),
            lastMessage: "meow",
            userInfo: {
              name: user.name,
              avatar: user.avatar,
              userID: user.userID,
            },
          },
        };
        try {
          console.log("user.userID", userData.userID);
          // creates new user chat
          const chatsref = await doc(db, "userChats", user.userID);
          const otherchatsref = await doc(db, "userChats", ChatUserId);
          await setDoc(chatsref, newField, { merge: true });
          await setDoc(otherchatsref, othernewField, { merge: true });
          console.log("New chat document created");
        } catch (error) {
          console.error("Error creating new userChat document:", error);
        }
      } catch (error) {
        console.error("Error creating new chat document:", error);
      }
    };

    if (chatID != "") {
      const unsubscribe = onSnapshot(userChatDocRef, (doc) => {
        if (doc.exists()) {
          fetchUserChat();
        } else {
          createNewChat();
        }
      });
      return () => unsubscribe();
    } else {
      console.error("current chatID is not defined");
    }
  }, [chatID, user.name]);

  const handleSend = async () => {
    const randomString = Math.random().toString(36).substring(7);
    await updateDoc(doc(db, "chats", chatID), {
      messages: arrayUnion({
        chatID: randomString,
        text: inputText,
        senderID: user.userID,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", user.userID), {
      [chatID + ".lastMessage"]: inputText.toString(),
      [chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", ChatUserId), {
      [chatID + ".lastMessage"]: inputText.toString(),
      [chatID + ".date"]: serverTimestamp(),
    });

    setInputText("");
  };
  const goToMessageScreen = async () => {
    navigation.navigate("Tabs", { screen: "Message" });
  };
  // NOT WORKING YET
  const flatListRef = useRef<FlatList<Chats>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [chats]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.outermostContainer}
    >
      <View style={styles.outermostContainer}>
        <View style={styles.topPortionContainer}>
          {/*  Back Button */}
          <View style={styles.backBtnContainer}>
            <TouchableOpacity onPress={goToMessageScreen}>
              <Image
                style={styles.backBtnImg}
                source={require("../../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>
          </View>

          {/*  Recipient Information */}
          <View style={styles.recipientContainer}>
            <Image
              style={styles.recipientImg}
              source={avatarImages[userData.avatar]}
            />
            <Text style={styles.recipient}>{userData.name}</Text>
          </View>
        </View>

        <View style={styles.greyDividerLine}></View>

        <View style={styles.container}>
          {chats.length === 0 ? (
            <View style={styles.welcomeMessageContainer}>
              <Text style={styles.welcomeMessage}>
                Get to know your fellow First-Gen colleges, be the first to say
                hi!
              </Text>
            </View>
          ) : (
            <View style={styles.chatsContainer}>
              <FlatList
                ref={flatListRef}
                // initialScrollIndex={1}
                showsVerticalScrollIndicator={false}
                data={chats}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.senderID == user.userID
                        ? styles.sentMessageContainer
                        : styles.receivedMessageContainer
                    }
                  >
                    <Text style={styles.sentMessageText}>{item.text}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                // The following 2 lines make sure that the FlatList is scrolled to the bottom
                onLayout={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
                onContentSizeChange={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
              />
            </View>
          )}
        </View>

        <View style={styles.inputMessageContainer}>
          {/* Box to type your message */}
          <TouchableOpacity style={styles.inputMessageBox}>
            <TextInput
              style={styles.inputText}
              placeholder="Type your message"
              onChangeText={(text) => {
                setInputText(text);
              }}
              value={inputText}
            />
          </TouchableOpacity>
          {/* Send Icon */}
          <TouchableOpacity onPress={handleSend}>
            <Image
              style={styles.sendIcon}
              source={require("../../assets/images/icons/sendMessage.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
  },
  topPortionContainer: {
    flexDirection: "row",
    marginTop: 52,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
  },
  backBtnContainer: {
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
  recipientContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 120,
  },
  recipient: {
    color: "black",
    fontSize: 24,
    fontFamily: "Stolzl Medium",
    textAlign: "center",
  },
  recipientImg: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  greyDividerLine: {
    marginTop: 20,
    width: "100%",
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  welcomeMessageContainer: {
    marginBottom: 450,
  },
  welcomeMessage: {
    color: "#B7B7B7",
    fontSize: 16,
    justifyContent: "center",
    marginLeft: 60,
    marginRight: 60,
    textAlign: "center",
    lineHeight: 25,
    fontFamily: "Stolzl Regular",
  },
  chatsContainer: {
    height: 650,
  },
  sentMessageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFD465",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    maxWidth: 250,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  sentMessageText: {
    color: "#000000",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Stolzl Regular",
  },
  receivedMessageContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    backgroundColor: "#EAEAEA",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: 250,
    marginBottom: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  inputMessageContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 32,
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent",
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
    marginLeft: 20,
    marginRight: 70,
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "Stolzl Regular",
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
