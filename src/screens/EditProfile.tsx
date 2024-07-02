import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from "../context/UserContext";
import {
  getFirestore,
  doc,
  serverTimestamp,
  setDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { useGestureHandlerRef } from '@react-navigation/stack';


export default function EditProfile({ close }) {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [calendly, setCalendly] = useState('');
  const [newHandle, setNewHandle] = useState('');
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const { user, setUser } = useUser();

  useEffect(() => {
    setMajor(user.major);
    setYear(user.year);
  }, [user]);

  const handleTextChange = async (newHandle) => {
    setNewHandle(newHandle); // ok now this throws an error when the text box is empty but whatever
    const db = getFirestore();
    if (user && newHandle !== "") {
      const userID = user.userID;
      try {
        // Check if the new handle is already in use
        const newHandleRef = doc(db, "userlist", newHandle);
        const newHandleDoc = await getDoc(newHandleRef);

        if (newHandleDoc.exists()) {
          console.log("Handle already in use. Please choose a different handle.");
          return;
        }
    } catch (error) {
      console.error("Error updating user handle: ", error);
    }
  }}

  const handleSubmit = () => {
    // Handle the submit action here
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.userID);
    const oldHandle = user.handle;
    // Update the user document with the new handle
    if (user) {
      if (newHandle.trim() !== "") {
        const newHandleRef = doc(db, "userlist", newHandle);
        const newHandleDoc = getDoc(newHandleRef);
        try {
          updateDoc(userDocRef, { handle: newHandle }); // userID -> handle
          console.log("updated");
        } catch (error) {
          console.log("failed");
        }
        
        // Remove the old handle from the userlist collection
        console.log(oldHandle)
        if (oldHandle) { // doesn't work everytime because context doesn't get updated twice in same session ;-;
          const oldHandleRef = doc(db, "userlist", oldHandle);
          deleteDoc(oldHandleRef);
          // console.log("deleted old handle");
        }
        // Map the new handle to the user ID in the userlist collection
        setDoc(newHandleRef, { userID: user.userID });
      }
      
      const oldCalendly = user.calendly;
      if (oldCalendly !== calendly) {
        try {
          updateDoc(userDocRef, { calendly: calendly });
          console.log("updated");
        } catch (error) {
          console.log("failed");
        }
      }
    }
    close();
  };

  const handleCancel = () => {
    // Handle the cancel action here
    close();
  };

  return (
    <View style={styles.modalView}>
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput1}
        value={input1}
        placeholder={"Class of " + year + ", " + major + " Major"}
        placeholderTextColor="#85808C"
        maxLength={35}
      />
      <Text style={styles.subLabel}>Character Limit: {35 - input1.length}</Text>

      <Text style={styles.label}>User Handle</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={newHandle}
        placeholder="User Handle"
        placeholderTextColor="#85808C"
      />

      <Text style={styles.label}>Calendly Link</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCalendly}
        value={calendly}
        placeholder="Calendly Link"
        placeholderTextColor="#85808C"
      />

      <Text style={styles.label}>Open To</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput2}
        value={input2}
        placeholder="Select Status"
        placeholderTextColor="#85808C"
      />
      <Text style={styles.label}>Looking For</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput3}
        value={input3}
        placeholder="Select Status"
        placeholderTextColor="#85808C"
      />
      <Text style={styles.label}>Ask Me About</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput4}
        value={input4}
        placeholder="Select Status"
        placeholderTextColor="#85808C"
      />


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
        marginTop: 70,
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
        height: '85%',
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
        marginVertical: 10,
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
});