import { View, Text, Pressable, StyleSheet, Image } from "react-native";

// only works if user has Calendly link; bring user to Calendly page when clicked
function ScheduleMeeting({ userCalendlyLink }) {

  const handleClick = () => {
    window.location.href = userCalendlyLink; // fix for phone
  };

  return (
    <Pressable style={styles.button} onPress={handleClick}>
      <Text style={styles.buttonText}>{"Schedule a Meeting"}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8E71BE",
    borderRadius: 20,
    height: 38,
    width: 250,
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

export default ScheduleMeeting;
