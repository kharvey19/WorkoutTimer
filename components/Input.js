import React, { useState, useEffect } from 'react';
import { View, Text, Button, Vibration, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Input screen for adding intervals
const InputScreen = ({ intervals, setIntervals, setCurrentPage }) => {
  const [intervalInput, setIntervalInput] = useState('');

  const addInterval = () => {
    if (intervalInput !== '') {
      setIntervals([...intervals, parseInt(intervalInput)]);
      setIntervalInput('');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <View style={styles.container1}>
      <Text style={styles.title}>Enter Intervals</Text>
      
      <View style={{ paddingHorizontal: 30, width: "100%", }}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter interval in seconds"
          placeholderTextColor="white"
          value={intervalInput}
          onChangeText={setIntervalInput}
        />
      </View>

      <TouchableOpacity onPress={addInterval} style={styles.button}>
        <Text style={styles.buttonText}>Add Interval</Text>
      </TouchableOpacity>

      <FlatList
        style = {{marginTop: 20}}
        data={intervals}
        renderItem={({ item, index }) => 
          <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold' }}>
            Interval {index + 1}:</Text> {item} seconds
          </Text>
        }
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Start Workout" onPress={() => setCurrentPage('workout')} />
    </View>
  );
};

export default InputScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2d3142'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        marginTop: 300
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: '5px',
        color: 'white', 
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: '5px',
    },
    buttonText: {
        color: 'white',
        borderRadius: '50px',
    },
});
  