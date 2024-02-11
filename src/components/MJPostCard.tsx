import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Avatar, IconButton } from "react-native-paper";
import { Image } from "react-native";
import * as Font from "expo-font";

interface IndividualPostProps {
  img: ImageSourcePropType;
  title: string;
  name: string;
  year: string;
  onPress: () => void;
}

const MJPostCard: React.FC<IndividualPostProps> = ({
  img,
  title,
  name,
  year,
  onPress,
}) => {
  // const loadFonts = async () => {
  //   await Font.loadAsync({
  //     'Stolzl Bold': require('../assets/fonts/stolzlBold.ttf'),
  //     'Stolzl Medium': require('../assets/fonts/stolzlMedium.otf'),
  //     'Stolzl Regular': require('../assets/fonts/stolzlRegular.ttf'),
  //     'Stolzl Light': require('../assets/fonts/stolzlLight.ttf'),
  //   });
  // }
  // useEffect(() => {
  //   loadFonts();
  // }, []);

  // function viewPostDetails() {
  //   localStorage.setItem("curPostID", postId);
  //   setCurPostID(postId);
  //   router.push("/postdetails");
  // }

  return (
    <TouchableOpacity style={styles.individualJourney} onPress={onPress}>
      {/* Mentor's Image */}
      <View style={styles.mentorImgContainer}>
        <Image style={styles.mentorImg} source={img} />
      </View>
      {/* Journey's title and mentor's information container */}
      <View style={styles.journeyInfoContainer}>
        {/* Journey's title */}
        <View style={styles.journeyTitleContainer}>
          <Text style={styles.journeyTitle}>{title}</Text>
        </View>
        {/* Mentor's information container */}
        <View style={styles.mentorInfoContainer}>
          <Text style={styles.mentorName}>{name}</Text>
          <Text style={styles.mentorYear}>{year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MJPostCard;

const styles = StyleSheet.create({
  individualJourney: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    shadowColor: "#49006C",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    height: 120,
  },
  mentorImgContainer: {
    marginRight: 20,
    justifyContent: "center",
  },
  mentorImg: {
    maxWidth: 90,
    maxHeight: 90,
  },
  journeyInfoContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  journeyTitleContainer: {},
  journeyTitle: {
    fontSize: 13,
    marginBottom: 16,
    maxWidth: 210,
    lineHeight: 16,
    fontFamily: "Stolzl Medium",
  },
  mentorInfoContainer: {},
  mentorName: {
    fontSize: 13,
    marginBottom: 4,
    fontFamily: "Stolzl Regular",
  },
  mentorYear: {
    fontSize: 12,
    color: "#7C7C7C",
    fontFamily: "Stolzl Light",
  },
});
