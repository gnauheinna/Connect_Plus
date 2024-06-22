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
  const [inputName, setInputName] = useState(""); // Input field value
  const [searchUser, setSearchUser] = useState<DocumentData | null>(null); // User data from search
  const [err, setErr] = useState(false); // Flag for user not found error
  const [lastMessage, setLastMessage] = useState(""); // Last message in chat
  const db = getFirestore(); // Firestore instance

  // Navigate to individual chat screen
  const directToChatBox = () => {
    navigation.navigate("IndividualChat", { ChatID: "chatID" }); // TODO NEED TO UPDATE THIS TO PASS CORRECT CHAT INFO
  };

  // Handle search button press
  const handleSearch = async () => {
    // Handles substring search
    const nameSubstrings = inputName.split(" ");
    console.log("nameSubstrings: " + nameSubstrings);
    // Searches for target user from database
    const q = query(
      collection(db, "users"),
      where("nameSubstrings", "array-contains-any", nameSubstrings[0])
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // User not found
        setErr(true);
      } else {
        // Search User exists
        querySnapshot.forEach((doc) => {
          setSearchUser(doc.data());
        });
      }
    } catch (err) {
      // Searched user doesn't exist
      setErr(true);
    }
  };

  // Load chat data when search user changes
  useEffect(() => {
    LoadChat();
  }, [searchUser]);

  // Load chat data
  const LoadChat = async () => {
    if (user != null && searchUser != null) {
      // Combine user IDs to form chat ID
      const combinedId =
        user.userID > searchUser.userID
          ? user.userID + searchUser.userID
          : searchUser.userID + user.userID;

      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        if (!res.exists()) {
          // Create chat if it doesn't exist
          await updateDoc(doc(db, "userChats", user.userID), {
            [combinedId + ".userInfo"]: {
              userID: searchUser.userID,
              name: searchUser.name,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", searchUser.userID), {
            [combinedId + ".userInfo"]: {
              userID: user.userID,
              name: user.name,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          // Load last message if chat exists
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
