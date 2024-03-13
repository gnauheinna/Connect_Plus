import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from "../context/UserContext";
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list'
import {
  getAuth,
} from "firebase/auth";




export default function EditProfile({ close }) {
  const [bioInput, setBioInput] = useState('');
  const [openToInput, setOpenToInput] = useState('');
  const [lookingForInput, setLookingForInput] = useState('');
  const [askInput, setAskInput] = useState('');
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const { user, setUser } = useUser();
  const [bioPreview, setBioPreview] = useState('');
  const [img, setImg] = useState(Image);
  const db = getFirestore();
  const [avatar, setAvatar] = useState("");
  const [academic, setAcademic] = useState(false);
  const [career, setCareer] = useState(false);
  const [financial, setFinancial] = useState(false);
  const [studentLife, setStudentLife] = useState(false);
  const [showLineForQuestions, setshowLineForQuestions] = useState(true);
  const [showLineForJourneys, setshowLineForJourneys] = useState(false);
  const [Mname, setMName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = React.useState("");
  const auth = getAuth();
  const openToChoices = [
      {key:'1', value:'Coffee Chats'},
      {key:'2', value:'Mentorship'}, 
  ]

  const lookingForChoices = [
      {key:'1', value:'Friends'},
  ]

  const askMeAboutChoices = [
    {key:'1', value:'My Startup'},
]


  useEffect(() => {
    setName(user.name);
    setMajor(user.major);
    setYear(user.year);
    setAcademic(user.academic);
    setCareer(user.career);
    setFinancial(user.financial);
    setStudentLife(user.studentLife);
    setAvatar(user.avatar);
  }, [user]);


  useEffect(() => {
    setMajor(user.major);
    setYear(user.year);
  }, [user]);

  // const handleSubmit = () => {
  //   // Handle the submit action here
  //   close();
  // };
  const handleUpdateUserBio = async (bio: string) => {
    const db = getFirestore();
    const user = auth.currentUser;
    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { bio });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = () => {
    handleUpdateUserBio(bioInput);
    close();  
  };
  const handleCancel = () => {
    // Handle the cancel action here
    close();
  };

  const avatarImages: { [key: string]: any } = {
    avatar1: require("../../assets/images/avatars/avatar1.png"),
    avatar2: require("../../assets/images/avatars/avatar2.png"),
    avatar3: require("../../assets/images/avatars/avatar3.png"),
    avatar4: require("../../assets/images/avatars/avatar4.png"),
    avatar5: require("../../assets/images/avatars/avatar5.png"),
    avatar6: require("../../assets/images/avatars/avatar6.png"),
    avatar7: require("../../assets/images/avatars/avatar7.png"),
    avatar8: require("../../assets/images/avatars/avatar8.png"),
    avatar9: require("../../assets/images/avatars/avatar9.png"),
  };

  


  return (
    <View style={styles.modalView}>
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBioInput}
        value={bioInput}
        placeholder={"Class of " + year + ", " + major + " Major"}
        placeholderTextColor="#85808C"
        maxLength={35}
      />
      <Text style={styles.subLabel}>Character Limit: {35 - bioInput.length}</Text>
      
      <Text style={styles.label}>Open To</Text>
      <SelectList 
        placeholder='Select Status'
        fontFamily="Stolzl Regular"
        boxStyles={{width: '100%', height: 45, borderColor: "#85808C", borderWidth: 1, borderRadius: 5, marginVertical: 15}}
        dropdownStyles={{height: '35%'}}
        setSelected={(val) => setSelected(val)} 
        data={openToChoices} 
        maxHeight={55}
        save="value"
    />

      <Text style={styles.label}>Looking For</Text>
      <SelectList 
        placeholder='Select Status'
        fontFamily="Stolzl Regular"
        boxStyles={{width: '100%', height: 45, borderColor: "#85808C", borderWidth: 1, borderRadius: 5, marginVertical: 15}}
        dropdownStyles={{height: '35%'}}
        setSelected={(val) => setSelected(val)} 
        data={lookingForChoices} 
        maxHeight={55}
        save="value"
    />
      <Text style={styles.label}>Ask Me About</Text>
      <SelectList 
        placeholder='Select Status'
        fontFamily="Stolzl Regular"
        boxStyles={{width: '100%', height: 45, borderColor: "#85808C", borderWidth: 1, borderRadius: 5, marginVertical: 15}}
        dropdownStyles={{height: '35%'}}
        setSelected={(val) => setSelected(val)} 
        data={askMeAboutChoices} 
        maxHeight={55}
        save="value"
    />


      <View style={styles.divider} />

      <Text style={styles.label}>Preview</Text>
      <View style={styles.previewContainer}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileContainer}>
            <Image source={avatarImages[avatar]} style={styles.profileImage} />
            <View>
              <Text style={[styles.userName]}>{name}</Text>
              <Text style={[styles.userIntro]}>
                {" "}
                Class of {year}, {major} Major{" "}
              </Text>
            </View>
          </View>
          <View style={styles.aboutMePrevContainer}>
            <View>
              <Text style={styles.aboutMeTextPrev}>
                Open to Mentorship, Looking for coffee chats, ask me about my
                startup
              </Text>
            </View>
          </View>
        </View>
      </View>


        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonText: {
        
    },
    modalView: {
        margin: 20,
        marginTop: 20,
        backgroundColor: 'white', // Set the background color to white
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0, // Set the offset to 0 to make the shadow appear around the entire modal
        },
        shadowOpacity: 0.5, // Increase the opacity to make the shadow darker
        shadowRadius: 10, // Increase the radius to make the shadow larger
        elevation: 5,
        height: '95%',
    },
    label: {
      fontFamily: "Stolzl Regular",
      alignSelf: "flex-start",
      fontSize: 14,
    },
    subLabel: {
      color: "#85808C",
      fontFamily: "Stolzl Regular",
      alignSelf: "flex-end",

    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 5,
        width: "100%",
        height: 42,
        marginVertical: 5,
        backgroundColor: "white",
        borderColor: "#85808C",
        fontSize: 14,
        fontFamily: "Stolzl Regular",
        alignSelf: "flex-start",
        alignItems: "flex-start",
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
    button: {
        borderWidth: 1, // Add this
        borderColor: 'black', // Add this
        borderRadius: 10,
        backgroundColor: "#FFD465",
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
      },
      divider: {
        height: 1,
        backgroundColor: '#85808C',
        width: '126%',
        marginVertical: 10,
      },
      preview: {
        fontFamily: "Stolzl Regular",
        alignSelf: "flex-start",
        fontSize: 14,
      },     
      previewContainer: {
        flex: 1,
      },
      profileImage: {
        width: 55,
        height: 55,
        borderRadius: 100,
        overflow: "hidden",
        justifyContent: "center",
        marginRight: 10,
        marginLeft: 10,
        // borderColor: "red",
        // borderWidth: 1,

      },
      profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: 30,
        marginBottom: 5,
      },
      userName: {
        fontFamily: "Stolzl Medium",
        fontSize: 20,
        color: "#000000",
        // marginTop: 15,
        marginLeft: 5,
      },
      userIntro: {
        fontSize: 14,
        color: "#838383",
        fontFamily: "Stolzl Regular",
      },
      aboutMePrevContainer: {
        justifyContent: "space-between",
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#F9F6FF",
      },
      aboutMeTextPrev: {
        color: "#724EAE",
        fontFamily: "Stolzl Regular",
        fontSize: 14,
      },
      profileInfoContainer: {
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "white",
      },
      pickers: {
        // height: 20,x/
        width: "100%",
      }
});