import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";
function FollowButton({ userIdToFollow }) {
  const db = getFirestore();
  const [isClicked, setIsClicked] = useState(false);
  const [followingList, setFollowingList] = useState([]); // List of users that the current user is following
  const { user, setUser } = useUser();

  useEffect(() => {
    // Check if the current user is already following userIdToFollow
    const checkIfFollowing = async () => {
      try {
        if (user) {
          const FollowingListSnapShot = await getDoc(
            doc(db, "following", user.userID)
          );
          if (FollowingListSnapShot.exists()) {
            const FollowingData = FollowingListSnapShot.data();
            const FollowingArray = Object.keys(FollowingData).map(
              (key) => FollowingData[key]
            );
            setFollowingList(FollowingArray);
            console.log("Following List is: " + FollowingData.toString());
            setIsClicked(FollowingArray.includes(userIdToFollow));
          }
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkIfFollowing();
  }, [userIdToFollow]);

  const handlePress = async () => {
    try {
      if (user) {
        let FollowingArray = [...followingList];
        if (isClicked) {
          // Unfollow the user
          FollowingArray = await followingList.filter(
            (item) => item !== userIdToFollow
          );
          await setFollowingList(FollowingArray);
        } else {
          // Follow the user
          FollowingArray = await [...followingList, userIdToFollow];
          await setFollowingList(FollowingArray);
        }
        // update firebase with the new following list
        // 1. Get the document reference
        const FollowingDocRef = doc(db, "following", user.userID);
        // 2. update the document
        await updateDoc(FollowingDocRef, { [user.userID]: FollowingArray });
        // Toggle the state when the button is clicked
        setIsClicked(!isClicked);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        isClicked && styles.clickedButton,
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{isClicked ? "Followed" : "Follow"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8E71BE",
    padding: 10,
    borderRadius: 25,
    width: 193,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    marginRight: 10,
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.5, // Lower opacity when pressed
  },
  clickedButton: {
    backgroundColor: "white", // Change color when clicked
  },
});

export default FollowButton;
