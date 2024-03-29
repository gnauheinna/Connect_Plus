import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";

function MentorCards() {
  return (
    <View style={styles.outterContainer}>
      <View style={styles.topContainer}>
        {/* top half of the card*/}
        <ImageBackground
          style={styles.mentorProfilePhoto}
          imageStyle={{ borderRadius: 15, backgroundColor: "transparent" }}
          source={require("../../assets/images/mentorCards/Shateva.png")}
        >
          <Pressable style={styles.starContainer}>
            {/* star button */}
            <Image source={require("../../assets/images/icons/star.png")} />
          </Pressable>
          <View style={styles.buttonContainer}>
            <Pressable>
              {/* calendar button */}
              <Image
                resizeMode="cover"
                style={styles.button}
                source={require("../../assets/images/icons/MentorInfo.png")}
              ></Image>
            </Pressable>
            <Pressable>
              {/* message button */}
              <Image
                resizeMode="cover"
                style={styles.button}
                source={require("../../assets/images/icons/MentorMessage.png")}
              ></Image>
            </Pressable>
            <Pressable>
              {/* linkedin button */}
              <Image
                resizeMode="cover"
                style={styles.button}
                source={require("../../assets/images/icons/LinkedIn.png")}
              ></Image>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottomContainer}>
        {/* bottom half of the card */}
        <View style={styles.nameContainer}>
          {/* Name and star */}

          <Text style={styles.MentorName}>Shateva Long</Text>
          <Image
            style={styles.verifiedIcon}
            source={require("../../assets/images/icons/Verified.png")}
          />
        </View>
        <View>
          <Text style={styles.infoText}>Class of 2023, CS Major</Text>
        </View>
        <View style={styles.aboutContainer}>
          {/* About Section */}
          <Text style={styles.aboutText}>About:</Text>
          <Text style={styles.introText}>
            Open to{" "}
            <Text
              style={{
                fontFamily: "Stolzl Medium",
                color: "rgba(140,140,140,1)",
              }}
            >
              Coffee Chats
            </Text>
            , Looking for{" "}
            <Text
              style={{
                fontFamily: "Stolzl Medium",
                color: "rgba(140,140,140,1)",
              }}
            >
              Mentorship,
            </Text>{" "}
            or ask me about
            <Text
              style={{
                fontFamily: "Stolzl Medium",
                color: "rgba(140,140,140,1)",
              }}
            >
              {" "}
              My Startup
            </Text>
          </Text>
        </View>
        <View style={styles.expertiseContainer}>
          {/* Expertise Section */}
          <View style={styles.expertisetitleContainer}>
            <Text style={styles.expertiseTitle}>Expertise:</Text>
          </View>
          <View style={styles.expertiseButtonContainer}>
            <View style={styles.individualExpertiseContainer}>
              <Text style={styles.individualExpertiseText}>Academic</Text>
            </View>
            <View style={styles.individualExpertiseContainer}>
              <Text style={styles.individualExpertiseText}>Career</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  outterContainer: {
    position: "relative",
    backgroundColor: "transparent",
    display: "flex",
    maxWidth: 240,
    borderRadius: 14,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    marginTop: 90,

    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 40,
    width: 40,
    zIndex: 2,
  },
  topContainer: {
    borderRadius: 14,
    display: "flex",
    height: 250,
    width: 238,
    backgroundColor: "transparent",
  },

  mentorProfilePhoto: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "transparent",
  },
  bottomContainer: {
    position: "absolute",
    top: 190,
    borderRadius: 14,
    backgroundColor: "#FFF",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    color: "#000",
    fontWeight: "400",
    padding: 10,
    zIndex: 2,
    height: 200,
  },
  nameContainer: {
    marginTop: 5,
    flexDirection: "row",
    marginLeft: 20,
    gap: 10,
    fontSize: 21,
    fontWeight: "500",
    textTransform: "capitalize",
    backgroundColor: "transparent",
  },
  MentorName: {
    fontFamily: "Stolzl Medium",
    fontSize: 21,
  },
  infoText: {
    paddingTop: 3,
    fontFamily: "Stolzl Regular",
    paddingBottom: 5,
    fontSize: 10,
    color: "#8C8C8C",
    marginLeft: 20,
  },
  starContainer: {
    height: 40,
    width: 40,
    marginLeft: 190,
    marginTop: 15,
    backgroundColor: "transparent",
  },
  verifiedIcon: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
  aboutContainer: {
    marginLeft: 20,
    paddingTop: 5,
  },
  aboutText: {
    fontFamily: "Stolzl Medium",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  introText: {
    fontFamily: "Stolzl Regular",
    fontSize: 11,
    color: "#8C8C8C",
  },
  expertiseContainer: {
    marginTop: 5,
  },
  expertisetitleContainer: {
    marginVertical: 5,
    marginLeft: 20,
  },
  expertiseButtonContainer: {
    marginTop: 5,
    flexDirection: "row",
    gap: 6,
    marginLeft: 20,
  },
  expertiseTitle: {
    fontFamily: "Stolzl Medium",
    fontSize: 11,
  },
  individualExpertiseText: {
    fontFamily: "Stolzl Regular",
    fontSize: 10,
    fontWeight: "bold",
    color: "#724EAE",
  },
  individualExpertiseContainer: {
    borderRadius: 25,
    backgroundColor: "#EDE7FF",
    padding: 5,
    paddingHorizontal: 10,
  },
});
export default MentorCards;
