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
    <Pressable onPress={handlePress}>
      <View style={styles.button}>
        <Image
          source={require("../../assets/images/icons/MentorMessage.png")}
          style={styles.buttonImage}
        />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonImage: {
    height: "100%",
    width: "100%",
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
