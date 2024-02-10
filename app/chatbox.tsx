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
} from "firebase/firestore";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import IndividualPost from "../components/individualPost";
import { useRouter } from "expo-router";
import { PostIdContext, PostIdProvider } from "./context/PostIDContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrentChat } from "./context/currentChatContext";
import { useUser } from "./context/UserContext";

type Chats = {
  chatID: string;
  date: Timestamp;
  senderID: string;
  text: string;
};
export default function ChatBox() {
  const db = getFirestore();
  const { user, setUser } = useUser();
  const currentUserID = user.userID;
  const {
    currentChatID,
    setCurrentChatID,
    currentChatName,
    setCurrentChatName,
    currentChatAvatar,
    setCurrentChatAvatar,
    currentChatUserID,
    setCurrentChatUserID,
  } = useCurrentChat();
  const router = useRouter();
  const [chats, setChats] = useState<Chats[]>([]);
  const [inputText, setInputText] = useState("");

  const avatarImages: { [key: string]: any } = {
    avatar1: require("../assets/images/avatars/avatar1.png"),
    avatar2: require("../assets/images/avatars/avatar2.png"),
    avatar3: require("../assets/images/avatars/avatar3.png"),
    avatar4: require("../assets/images/avatars/avatar4.png"),
    avatar5: require("../assets/images/avatars/avatar5.png"),
    avatar6: require("../assets/images/avatars/avatar6.png"),
    avatar7: require("../assets/images/avatars/avatar7.png"),
    avatar8: require("../assets/images/avatars/avatar8.png"),
    avatar9: require("../assets/images/avatars/avatar9.png"),
  };

  useEffect(() => {
    // set currentChatID from local storage when the page refreshes
    const fetchChatData = async () => {
      if (currentChatID != "") {
        const storedChatID = await AsyncStorage.getItem("currentChatID");
        if (storedChatID !== null) {
          setCurrentChatID(storedChatID);
        }
        const storedChatName = await AsyncStorage.getItem("currentChatName");
        if (storedChatName !== null) {
          setCurrentChatName(storedChatName);
        }
        const storedChatUserID = await AsyncStorage.getItem(
          "currentChatUserID"
        );
        if (storedChatUserID !== null) {
          setCurrentChatUserID(storedChatUserID);
        }
      } else {
        console.log("this is useEffect hook currentChatID :", currentChatID);
      }
    };

    fetchChatData();
  }, []);

  // fetches the correct chat
  useEffect(() => {
    const fetchUserChat = async () => {
      console.log("curchatUserID: ", currentChatUserID);
      console.log("userID: ", user.userID);
      console.log("curchatID: ", currentChatID);
      const userChatDocRef = doc(db, "chats", currentChatID);
      const userChatDocSnapshot = await getDoc(userChatDocRef);
      console.log("snapshot data: ", userChatDocSnapshot.data());
      const chatArray: Chats[] = [];
      const userChatData = userChatDocSnapshot.data();
      if (userChatData) {
        setChats(userChatData.messages);
      }
    };

    if (currentChatID && user.name != "") {
      console.log("currentChatID exist: ", currentChatID);
      console.log("currentuser exist: ", user);
      const userChatDocRef = doc(db, "chats", currentChatID);
      const unsubscribe = onSnapshot(userChatDocRef, (doc) => {
        if (doc.exists()) {
          fetchUserChat();
        } else {
          console.error("Document does not exist");
        }
      });
      return () => unsubscribe();
    } else {
      console.error("currentChatID is not defined");
    }
  }, [currentChatID, user.name]);

  const handleSend = async () => {
    const randomString = Math.random().toString(36).substring(7);
    await updateDoc(doc(db, "chats", currentChatID), {
      messages: arrayUnion({
        chatID: randomString,
        text: inputText,
        senderID: user.userID,
        date: Timestamp.now(),
      }),
    });
    console.log("current senderID: ", user.userID);
    console.log("current receiverID: ", currentChatUserID);

    await updateDoc(doc(db, "userChats", user.userID), {
      [currentChatID + ".lastMessage"]: inputText.toString(),
      [currentChatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", currentChatUserID), {
      [currentChatID + ".lastMessage"]: inputText.toString(),
      [currentChatID + ".date"]: serverTimestamp(),
    });

    setInputText("");
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
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                router.push("/messages");
              }}
            >
              <Image
                style={styles.backBtnImg}
                source={require("../assets/images/icons/blackBack.png")}
              />
            </TouchableOpacity>
          </View>

          {/*  Recipient Information */}
          <View style={styles.recipientContainer}>
            <Image
              style={styles.recipientImg}
              source={avatarImages[currentChatAvatar]}
            />
            <Text style={styles.recipient}>{currentChatName}</Text>
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
              source={require("../assets/images/icons/sendMessage.png")}
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
