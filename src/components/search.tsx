import { useState, useEffect } from "react";
import { View, Text } from "./Themed";
import { TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  serverTimestamp,
  DocumentData,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "../context/UserContext";

// import e from "express";

export default function Search({ navigation }) {
  // the user we're searching
  const { user, setUser } = useUser();
  const [inputName, setInputName] = useState("");
  const [searchUser, setSearchUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const db = getFirestore();

  const directToChatBox = () => {
    navigation.navigate("IndividualChat");
  };
  const handleSearch = async () => {
    console.log("handling search!!");
    // searches for target user from database
    const q = query(collection(db, "users"), where("name", "==", inputName));
    console.log(q);
    try {
      console.log("try block");
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // User not found
        console.log("empty query!!");
        setErr(true);
      } else {
        // Search User exists
        console.log("quersnapshot: ", querySnapshot);
        querySnapshot.forEach((doc) => {
          setSearchUser(doc.data());
        });
      }
    } catch (err) {
      // searched user doesn't exist
      console.log("err == true: ", err);
      setErr(true);
    }
  };

  useEffect(() => {
    LoadChat();
  }, [searchUser]);

  const LoadChat = async () => {
    console.log("Err at handleSelect: ", err);
    console.log("searchUser: ", searchUser);
    //check whether the group(chats in firestore) exists, if not create
    if (user != null && searchUser != null) {
      const combinedId =
        user.userID > searchUser.userID
          ? user.userID + searchUser.userID
          : searchUser.userID + user.userID;

      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        console.log("chat for: ", combinedId);
        console.log("chat data: ", res.data);
        if (!res.exists()) {
          // check if the chat exists
          console.log("chat doesn't exist");
          //create a chat in chats collection
          //await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //   //create user chats (for currentuser)
          //   await updateDoc(doc(db, "userChats", user.userID), {
          //     [combinedId + ".userInfo"]: {
          //       userID: searchUser.userID,
          //       name: searchUser.name,
          //       //photo: searchUser.photoURL,
          //     },
          //     [combinedId + ".date"]: serverTimestamp(),
          // });

          //create user chats (for targetuser)
          //   await updateDoc(doc(db, "userChats", searchUser.userID), {
          //     [combinedId + ".userInfo"]: {
          //       userID: user.userID,
          //       name: user.name,
          //       //photoURL: user.photoURL,
          //     },
          //     [combinedId + ".date"]: serverTimestamp(),
          //  });
        } else {
          const chatData = res.data();
          setLastMessage(chatData.messages[chatData.messages.length - 1]);
        }
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  return (
    <View style={styles.outterMostContainer}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          source={require("../../assets/images/search.png")}
        />
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          onChangeText={(text) => {
            setInputName(text);
            setErr(false);
            setLastMessage("");
            setSearchUser(null); // Reset searchUser to null when input text changes
          }}
          value={inputName}
          onSubmitEditing={handleSearch}
          onEndEditing={handleSearch}
        />
      </View>
      {err ? (
        <Text>User not found!</Text>
      ) : (
        inputName !== "" &&
        searchUser && (
          <TouchableOpacity
            style={styles.individualMessageContainer}
            onPress={directToChatBox}
          >
            <View style={styles.individualMessageMainContainer}>
              <View style={styles.profilePicContainer}>
                <Image
                  style={styles.profilePhoto}
                  source={require("../../assets/images/avatars/avatar4.png")}
                />
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{searchUser.name}</Text>
                <Text style={styles.lastMessage}>
                  {lastMessage ? lastMessage.toString() : ""}
                </Text>
              </View>
              <View style={styles.timestampContainer}>
                <Text style={styles.messageTimestamp}>11/6</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outterMostContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  searchBar: {
    height: 45,
    width: "100%",
    borderRadius: 30,
    backgroundColor: "white",
    // opacity: 0.8,
    padding: 10,
    paddingLeft: 20,
    flexDirection: "row",
    //justifyCenter: "center",
    shadowColor: "rgba(73, 0, 108, 0.11)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: "#777777",
    fontSize: 16,
    alignItems: "center",
    fontFamily: "Stolzl Regular",
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
    justifyContent: "space-between",
  },
  userInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 30,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: "grey",
  },
  timestampContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageTimestamp: {
    color: "#777777",
    fontSize: 12,
    fontWeight: "600",
    position: "absolute",
  },
});
