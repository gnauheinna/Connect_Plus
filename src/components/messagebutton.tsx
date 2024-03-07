import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";

function MessageButton({ navigation, chatID, ChatUserId }) {
  const [isClicked, setIsClicked] = useState(false);
  const handlePress = () => {
    // Toggle the state when the button is clicked
    setIsClicked(!isClicked);
    navigation.navigate("IndividualChat", {
      chatID: chatID,
      ChatUserId: ChatUserId,
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
      <Image
        source={require("../../assets/images/MessageButton.png")}
        style={styles.icon}
      />
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
    flexDirection: "row",
  },
  buttonText: {
    color: "#8E71BE",
    marginRight: 10,
    fontSize: 16,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  clickedButton: {
    backgroundColor: "white",
  },
});
export default MessageButton;
