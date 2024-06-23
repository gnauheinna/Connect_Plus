import React, { useRef, useState, useEffect } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContext";

interface ChatData {
  messages: Chats[];
}

type Chats = {
  chatID: string;
  date: Timestamp;
  senderID: string;
  text: string;
};

export default function IndividualChatScreen({ navigation, route }) {
  const {
    chatID,
    chatUserName,
    chatUserAvatar,
    chatUserId: routeChatUserId,
  } = route.params;

  const [chatsDocRef, setChatsDocRef] = useState(null);
  const [chatUserId, setChatUserId] = useState(routeChatUserId);

  const db = getFirestore();
  const { user } = useUser();

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
    if (!chatUserId || !user) {
      console.log("ERRuser.userID", user.userID);
      console.log("ERRchatUserId", chatUserId);
      console.error("chatUserId/userId is not defined in useEffect");
      return;
    }

    const ChatsDocRef = doc(db, "chats", chatID);
    setChatsDocRef(ChatsDocRef);

    const unsubscribe = onSnapshot(ChatsDocRef, (doc) => {
      if (doc.exists()) {
        console.log("chat exists");
        fetchUserChat(ChatsDocRef);
      } else {
        console.log("chat does not exist");
        createNewChat(ChatsDocRef);
      }
    });

    return () => unsubscribe();
  }, [chatUserId, user.userID]);

  const fetchUserChat = async (ChatsDocRef) => {
    const ChatsDocSnapshot = await getDoc(ChatsDocRef);
    const ChatsData = (await ChatsDocSnapshot.data()) as ChatData;
    if (ChatsData) {
      setChats(ChatsData.messages);
    }
  };

  const createNewChat = async (ChatsDocRef) => {
    try {
      await setDoc(ChatsDocRef, { messages: [] });
      setChats([]);

      const newField = {
        [chatID]: {
          chatID: chatID,
          date: Timestamp.now(),
          lastMessage: "new chat",
          userInfo: {
            name: chatUserName,
            avatar: chatUserAvatar,
            userID: chatUserId,
          },
        },
      };

      const othernewField = {
        [chatID]: {
          chatID: chatID,
          date: Timestamp.now(),
          lastMessage: "new chat",
          userInfo: {
            name: user.name,
            avatar: user.avatar,
            userID: user.userID,
          },
        },
      };

      const chatsref = doc(db, "userChats", user.userID);
      const otherchatsref = doc(db, "userChats", chatUserId);
      await setDoc(chatsref, newField, { merge: true });
      await setDoc(otherchatsref, othernewField, { merge: true });
    } catch (error) {
      console.error("Error creating new chat document:", error);
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      try {
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
        await updateDoc(doc(db, "userChats", chatUserId), {
          [chatID + ".lastMessage"]: inputText.toString(),
          [chatID + ".date"]: serverTimestamp(),
        });
        setInputText("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const goToMessageScreen = async () => {
    navigation.navigate("Tabs", { screen: "Message" });
  };

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
          <View style={styles.backBtnContainer}>
            <TouchableOpacity onPress={goToMessageScreen}>
              <Image
                style={styles.backBtnImg}
                source={require("../../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.recipientContainer}>
            <Image
              style={styles.recipientImg}
              source={avatarImages[chatUserAvatar]}
              onError={(e) =>
                console.log("Failed to load image:", e.nativeEvent.error)
              }
            />
            <Text style={styles.recipient}>{chatUserName}</Text>
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
                showsVerticalScrollIndicator={false}
                data={chats}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.senderID === user.userID
                        ? styles.sentMessageContainer
                        : styles.receivedMessageContainer
                    }
                  >
                    <Text style={styles.sentMessageText}>{item.text}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
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
          <TouchableOpacity style={styles.inputMessageBox}>
            <TextInput
              style={styles.inputText}
              placeholder="Type your message"
              onChangeText={(text) => setInputText(text)}
              value={inputText}
            />
          </TouchableOpacity>
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
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    height: 60,
    position: "relative",
  },
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
  },
  backBtnContainer: {
    position: "absolute", // Positions the back button absolutely
    left: 20, // Adjust as needed for spacing from the left edge
    top: "50%", // Centers the button vertically
    transform: [{ translateY: -10 }],
  },
  backBtnImg: {
    width: 20,
    height: 20,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    height: "100%",
  },
  recipient: {
    color: "black",
    fontSize: 24,
    fontFamily: "Stolzl Medium",
    textAlign: "center",
    marginLeft: 15, // Reduced margin for closer proximity to the image
  },
  recipientImg: {
    width: 50,
    height: 50,
    marginLeft: 5, // Adjust as needed to control spacing
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
