import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

function MessageButton({ navigation }) {
  const [isClicked, setIsClicked] = useState(false);
  const [chatID, setChatID] = useState("");
  const handlePress = () => {
    // Toggle the state when the button is clicked
    setIsClicked(!isClicked);
    navigation.navigate("IndividualChat", {
      chatID: chatID,
    });
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
      <Text style={styles.buttonText}>Message</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderColor: "#8E71BE",
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    width: 148,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#8E71BE",
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.5, // Lower opacity when pressed
  },
  clickedButton: {
    backgroundColor: "white", // Change color when clicked
  },
});

export default MessageButton;
