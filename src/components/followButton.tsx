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
        const FollowingListSnapShot = await getDoc(
          doc(db, "following", user.userID)
        );
        if (FollowingListSnapShot.exists()) {
          const FollowingData = await FollowingListSnapShot.data();
          const FollowingArray = FollowingData.following || [];
          await setFollowingList(FollowingArray);
          setIsClicked(FollowingArray.includes(userIdToFollow));
        } else {
          console.log("Following List doesn't exist.");
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkIfFollowing();
  }, [userIdToFollow]);

  const handlePress = async () => {
    try {
      let newFollowingArray = followingList;
      if (isClicked) {
        // Unfollow the user
        newFollowingArray = await followingList.filter(
          (item) => item !== userIdToFollow
        );
        await setFollowingList(newFollowingArray);
      } else {
        // Follow the user

        newFollowingArray.push(userIdToFollow);
        await setFollowingList(newFollowingArray);
      }
      // update firebase with the new following list
      // 1. Get the document reference
      const FollowingDocRef = doc(db, "following", user.userID);
      // 2. update the document
      await updateDoc(FollowingDocRef, { following: newFollowingArray });
      // Toggle the state when the button is clicked
      setIsClicked(!isClicked);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{isClicked ? "Followed" : "Follow"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8E71BE",

    borderRadius: 20,
    height: 38,
    width: 215,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    marginRight: 10,
    fontFamily: "Stolzl Regular",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FollowButton;
