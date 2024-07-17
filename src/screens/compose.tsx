import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Image } from "expo-image";
import { useUser } from "../context/UserContext";
import {
  getFirestore,
  doc,
  serverTimestamp,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
  startAt,
  endAt,
  getDocs
} from "firebase/firestore";
import { useGestureHandlerRef } from '@react-navigation/stack';

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

type NewChat = {
  avatar: string,
  name: string,
  handle: string,
  userID: string,
}

export default function Compose({ navigation, close }) {
  const { user, setUser } = useUser();
  const [result, setResult] = useState<string[]>([]);
  const [composeArr, setComposeArr] = useState<NewChat[] | null>(null);
  const db = getFirestore();

  useEffect(() => {
  }, [user]);

  async function directToChatBox(
    chatID: string,
    name: string,
    chatUserId: string,
    avatar: string
  ) {
    try {
      // if chat id exists, bring up existing chat, else create new chat

      navigation.navigate("IndividualChat", {
        chatID: chatID,
        chatUserName: name,
        chatUserAvatar: avatar,
        chatUserId: chatUserId,
      });
    } catch (error) {
      // Handle errors if any
      console.error("Error while setting AsyncStorage:", error);
    }
  }

  const handleSearchPrefix = async (prefix: string) => { // create delay later
    // setResult([]);
    setComposeArr([]);
    const collectionRef = collection(db, 'userlist');
    // console.log(collectionRef)
    if (prefix !== "") {
      const q = query(collectionRef, orderBy('__name__'), startAt(prefix), endAt(prefix + "\uf8ff"));
      try {
        const querySnapshot = await getDocs(q);
        const results: string[] = [];
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          const data = doc.data();
          results.push(data.userID);
        });
        if (results.length > 0) {
          // setResult(results);
          // console.log(result);
          fetchData(results);
        }
      } catch (error) {
          console.error("Error fetching documents: ", error);
      }
    } else {
      // don't show any results
      
      console.log('no prefix')
    }
  }

  const fetchData = async (ids: string[]) => {
    const userData: NewChat[] = [];
    for (const id of ids) {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as NewChat;
        userData.push({
          avatar: data.avatar,
          name: data.name,
          handle: data.handle,
          userID: id,
        });
      } else {
        console.log(`No such document with ID: ${id}`);
      }
    }
    setComposeArr(userData);
  }

  const handleCancel = () => {
    close();
  };

  return (
    <View style={styles.modalView}>
      <View style={styles.titlecontainer}>
        <Pressable onPress={handleCancel}>
          <Image
              style={styles.backbtn}
              source={ require("../../assets/images/icons/blackBack.png")
              }
            />
        </Pressable>
        <View style={styles.centerContainer}>
          <Text style={styles.compose}>Compose Message</Text>
        </View>
      
      </View>
      <View style={styles.inputcontainer}>
        <Text style={styles.search_to}>To:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchPrefix}
          placeholderTextColor="#85808C"
          maxLength={35}
        />
      </View>
      <View style={styles.messagesMainContainer}>
        <FlatList
          data={composeArr}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: NewChat }) => (
            <TouchableOpacity
              style={styles.individualMessageContainer}
              onPress={() =>
                directToChatBox(
                  "",
                  item.name,
                  item.userID,
                  item.avatar
                )
              }
            >
              <View style={styles.individualMessageMainContainer}>
                <View style={styles.profilePicContainer}>
                  <Image
                    style={styles.profilePhoto}
                    source={avatarImages[item.avatar]}
                  />
                </View>
                <View style={styles.userInfoContainer}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userUsername}>{item.handle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
  },
  titlecontainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  backbtn: {
    width: 20,
    height: 20,
  },
  compose: {
    textAlign: "center",
    fontFamily: "Stolzl Medium",
    fontSize: 20,
  },
  modalView: {
    marginTop: 80,
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 0, // Set the offset to 0 to make the shadow appear around the entire modal
    },
    shadowOpacity: 0.5, // Increase the opacity to make the shadow darker
    shadowRadius: 10, // Increase the radius to make the shadow larger
    elevation: 5,
    height: '100%',
  },
  label: {
    fontFamily: "Stolzl Regular",
    alignSelf: "flex-start",
    fontSize: 14,
  },
  subLabel: {
    color: "#85808C",
    fontFamily: "Stolzl Regular",
    alignSelf: "flex-end",

  },
  input: {
    paddingLeft: 20,
    width: "90%",
    height: 42,
    // marginVertical: 10,
    backgroundColor: "white",
    borderColor: "#85808C",
    fontSize: 14,
    fontFamily: "Stolzl Regular",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  search_to: {
    fontFamily: "Stolzl Regular",
    paddingLeft: 20,
  },
  inputcontainer: {
    flexDirection: "row",
    backgroundColor: 'white', // Set the background color to white
    borderWidth: 1,
    borderRadius: 1,
    alignItems: 'center',
    height: 45,
    width: '120%',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  button: {
    borderWidth: 1, // Add this
    borderColor: 'black', // Add this
    borderRadius: 10,
    backgroundColor: "#FFD465",
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  messagesMainContainer: {
    width: "120%",
    borderRadius: 30,
    backgroundColor: "white",
    flex: 1,
    zIndex: 2,
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
  userInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
  },
  userUsername: {
    color: "gray",
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Stolzl Regular",
    marginBottom: 5,
  },
});