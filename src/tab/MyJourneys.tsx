import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import MJPostCard from "../components/MJPostCard";
import { useSavedJourneyContext } from "../context/savedJourneyContext";
import { useUser } from "../context/UserContext";
import Search from "../components/search";

export default function MyJourneyScreen({ navigation }) {
  const db = getFirestore();
  const { savedJourneys, setSavedJourneys, setLoading, loading } =
    useSavedJourneyContext();
  const { user, setUser } = useUser();
  const currentUserID = user.userID;

  function directToMyJourneyPost(postName: string) {
    navigation.navigate(postName);
  }

  function directToSeeAllJourneys() {
    navigation.navigate("SeeAllJourneys");
  }

  useEffect(() => {
    const loadSavedJourneys = async () => {
      try {
        // get reference of Firestore document

        const savedjourneyDocRef = doc(db, "savedJourneys", currentUserID);
        // get instance of document
        const savedjourneySnapshot = await getDoc(savedjourneyDocRef);

        if (savedjourneySnapshot.exists()) {
          // get savedJourney data
          const SJData = savedjourneySnapshot.data();
          if (SJData) {
            // updated SavedJourneys with arra
            setSavedJourneys(SJData.savedjourneys);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    if (currentUserID && currentUserID != "") {
      loadSavedJourneys();
    }
  }, [currentUserID]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.outermostContainer}>
        <ImageBackground
          source={require("../../assets/images/gradient/whiteGradientAskNShare.png")}
          resizeMode="cover"
          style={styles.gradientBackground}
        >
          <View style={styles.journeyBigTitleContainer}>
            <Text style={styles.journeyBigTitle}>Connect+</Text>
            <Pressable style={styles.profileButton} />
          </View>
        </ImageBackground>

        <View style={styles.container}>
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <TextInput style={styles.searchText} placeholder="Search" />
            </View>
          </View>

          <View style={styles.journeySubTitleContainer}>
            <Text style={styles.journeySubTitle}>Popular</Text>
          </View>
          <View style={styles.popularContainer}>
            <Pressable style={styles.popularButton}>
              <Image
                style={styles.popularButtonImg}
                source={require("../../assets/images/icons/MatchAcademic.png")}
              />
              <Text style={styles.popularButtonText}>Academic</Text>
            </Pressable>
            <Pressable style={styles.popularButton}>
              <Image
                style={styles.popularButtonImg}
                source={require("../../assets/images/icons/MatchCareer.png")}
              />
              <Text style={styles.popularButtonText}>Career</Text>
            </Pressable>
            <Pressable style={styles.popularButton}>
              <Image
                style={styles.popularButtonImg}
                source={require("../../assets/images/icons/MatchFinancial.png")}
              />
              <Text style={styles.popularButtonText}>Financial</Text>
            </Pressable>
            <Pressable style={styles.popularButton}>
              <Image
                style={styles.popularButtonImg}
                source={require("../../assets/images/icons/MatchCampus.png")}
              />
              <Text style={styles.popularButtonText}>Campus Life</Text>
            </Pressable>
          </View>
          <View style={styles.journeySubTitleContainer}>
            <Text style={styles.journeySubTitle}>Featured</Text>
          </View>

          <View style={styles.featuredJourneysContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* 1st Featured Journey */}
              <TouchableOpacity
                onPress={() => directToMyJourneyPost("nana")}
                style={styles.featuredJourney}
              >
                <Image
                  style={styles.featuredJourneyImg}
                  source={require("../../assets/images/featuredMyJourneyPosts/nana.png")}
                />
              </TouchableOpacity>

              {/* 2nd Featured Journey */}
              <TouchableOpacity
                onPress={() => directToMyJourneyPost("bailey")}
                style={styles.featuredJourney}
              >
                <Image
                  style={styles.featuredJourneyImg}
                  source={require("../../assets/images/featuredMyJourneyPosts/bailey.png")}
                />
              </TouchableOpacity>

              {/* 3rd Featured Journey */}
              <TouchableOpacity
                onPress={() => directToMyJourneyPost("shatevaFeatured")}
                style={styles.featuredJourney}
              >
                <Image
                  style={styles.featuredJourneyImg}
                  source={require("../../assets/images/featuredMyJourneyPosts/shateva.png")}
                />
              </TouchableOpacity>

              {/* 4th Featured Journey */}
              <TouchableOpacity
                onPress={() => directToMyJourneyPost("rachelFeatured")}
                style={styles.featuredJourney}
              >
                <Image
                  style={styles.featuredJourneyImg}
                  source={require("../../assets/images/featuredMyJourneyPosts/rachel.png")}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.journeySubTitleContainer}>
            <Text style={styles.journeySubTitle}>Hear From Others</Text>
            <TouchableOpacity onPress={directToSeeAllJourneys}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.allJourneysContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Rachel Li's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("rachel")}
                img={require("../../assets/images/mentorMyJourneyPics/rachel.png")}
                title="The Ultimate SNAP Guide: Get $200 Monthly for Groceries"
                name="Rachel Li"
                year="Data Science Major, 2024"
              />

              {/* Julia Tran's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("julia")}
                img={require("../../assets/images/mentorMyJourneyPics/julia.png")}
                title="Everything You Need to Know About On-Campus Jobs"
                name="Julia Tran"
                year="Business Administration Major, 2027"
              />

              {/* Neri Ajiatas Arreaga's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("neri")}
                img={require("../../assets/images/mentorMyJourneyPics/neri.png")}
                title="Discovering BU: Campus Communities & Organizations"
                name="Neri Ajiatas Arreaga"
                year="Data Science Major, 2025"
              />

              {/* Shateva Long's Journey */}
              <MJPostCard
                onPress={() => directToMyJourneyPost("shateva")}
                img={require("../../assets/images/mentorMyJourneyPics/shateva.png")}
                title="I Got To Create My Own 4 Credit CS Course!"
                name="Shateva Long"
                year="BU Alumni"
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  gradientBackground: {
    width: "100%",
    height: 130,
    zIndex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    backgroundColor: "#F9F6FF",
  },
  profileButton: {
    marginTop: 15,
    marginLeft: 1,
    backgroundColor: "#D9D9D9",
    opacity: 0.5,
    padding: 23,
    borderRadius: 50,
    height: 30,
    width: 30,
  },
  searchContainer: {
    flex: 1,
    marginBottom: 20,
    height: 40,
    backgroundColor: "transparent",
  },
  searchBar: {
    height: 40,
    width: "100%",
    borderRadius: 30,
    backgroundColor: "#F4EFF5",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
    paddingLeft: 20,
    flexDirection: "row",
    shadowColor: "rgba(73, 0, 108, 0.11)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  searchText: {
    color: "#9086A1",
    marginLeft: 10,
    fontSize: 15,
    alignItems: "center",
    fontFamily: "Stolzl Regular",
  },
  journeyBigTitleContainer: {
    marginTop: 50,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    zIndex: 2,
  },
  journeyBigTitle: {
    fontSize: 34,
    color: "#453B4F",
    marginTop: 20,
    marginBottom: 5,
    justifyContent: "flex-start",
    fontFamily: "Stolzl Medium",
  },
  journeySubTitleContainer: {
    backgroundColor: "#F9F6FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAll: {
    color: "#B4AEBB",
    fontFamily: "Stolzl Regular",
  },
  journeySubTitle: {
    fontSize: 20,
    color: "#000000",
    justifyContent: "flex-start",
    fontFamily: "Stolzl Medium",
  },
  popularButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    backgroundColor: "white",
    height: 50,
    borderRadius: 8,
    width: 180,
    padding: 10,
    shadowColor: "rgba(73, 0, 108, 0.11)",
    shadowOpacity: 0.6,
    shadowOffset: { width: -1, height: -2 },
  },
  popularButtonImg: {
    marginTop: 3,
    marginLeft: 5,
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  popularButtonText: {
    paddingTop: 5,
    fontSize: 17,
    fontFamily: "Stolzl Regular",
  },
  popularContainer: {
    marginBottom: 32,
    height: 120,
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  featuredJourneysContainer: {
    marginBottom: 32,
    height: 220,
    backgroundColor: "transparent",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    marginTop: 16,
  },
  overlayTextContainer: {
    position: "absolute",
    top: 0,
    paddingLeft: 16,
    backgroundColor: "transparent",
  },
  overlayText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    lineHeight: 25,
    marginTop: 10,
    width: 130,
  },
  featuredJourney: {
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 3,
    marginBottom: 5,
    marginRight: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
      // borderRadius: 15,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  featuredJourneyImg: {
    maxWidth: 300,
    maxHeight: 200,
    borderRadius: 15,
  },
  allJourneysContainer: {
    flex: 1,
    backgroundColor: "#F9F6FF",
    marginTop: 10,
    justifyContent: "flex-start",
  },
});
