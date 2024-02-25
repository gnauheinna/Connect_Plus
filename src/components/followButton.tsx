import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";

function FollowButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    // Toggle the state when the button is clicked
    setIsClicked(!isClicked);
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
