import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function EditProfile({ close }) {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  const handleSubmit = () => {
    // Handle the submit action here
    close();
  };

  const handleCancel = () => {
    // Handle the cancel action here
    close();
  };

  return (
    <View style={styles.modalView}>
      <TextInput
        style={styles.input}
        onChangeText={setInput1}
        value={input1}
        placeholder="Bio"
        placeholderTextColor="#000000"
        maxLength={35}
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput2}
        value={input2}
        placeholder="Select Status"
        placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput3}
        value={input3}
        placeholder="Select Status"
        placeholderTextColor="#000000"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput4}
        value={input4}
        placeholder="Select Status"
        placeholderTextColor="#000000"
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
  button:{

  },
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
    // input: {
    //     height: 40,
    //     borderColor: 'gray',
    //     borderWidth: 1,
    //     marginBottom: 10,
    //     padding: 10,
    // },
    input: {
        borderRadius: 10,
        paddingLeft: 48,
        width: "100%",
        height: 42,
        marginVertical: 10,
        backgroundColor: "white",
        borderBottomWidth: 0,
        borderColor: "#E3E3E3",
        fontSize: 16,
        fontFamily: "Stolzl Regular",
        shadowColor: "#49006C",
        shadowOffset: {
          width: -2,
          height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
      },
});