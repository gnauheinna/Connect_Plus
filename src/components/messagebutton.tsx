import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";

function MessageButton({
  navigation,
  chatID,
  chatUserId,
  chatUserName,
  avatar,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const handlePress = () => {
    // Toggle the state when the button is clicked
    setIsClicked(!isClicked);
    navigation.navigate("IndividualChat", {
      chatID: chatID,
      chatUserId: chatUserId,
      chatUserName: chatUserName,
      chatUserAvatar: avatar,
    });
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
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
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    width: 152,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#8E71BE",
    marginRight: 7,
    fontFamily: "Stolzl Regular",
    fontSize: 17,
    fontWeight: "bold",
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
