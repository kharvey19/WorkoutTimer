import React, { useState, useEffect } from 'react';
import { View, Text, Button, Vibration, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Workout screen for starting/stopping the workout and showing the timer
const WorkoutScreen = ({intervals, setIntervals, setCurrentPage}) => {

  // `useState` is a hook that allows you to add state management to functional components
  const [intervalInput, setIntervalInput] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // () => {} is an arrow function 
  const startWorkout = () => {
    if (intervals.length > 0) {
      setTimer(intervals[0]);
      setCurrentIntervalIndex(0);
      setIsRunning(true);
    }
  };

  const stopWorkout = () => {
    setIsRunning(false);
    setTimer(0);
    setCurrentIntervalIndex(0);
  };
  
  const resetWorkout = () => {
    setIsRunning(false);
    setTimer(0);
    setCurrentIntervalIndex(0);
    setIntervals([]);
    setWorkoutDuration(0);
    setIntervalInput('');
    setCurrentPage('input'); // Go back to the input screen
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        setWorkoutDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else if (isRunning && timer === 0 && intervals.length > 0) {
      Vibration.vibrate();
      if (currentIntervalIndex < intervals.length - 1) {
        // Move to the next interval
        setCurrentIntervalIndex(currentIntervalIndex + 1);
        setTimer(intervals[currentIntervalIndex + 1]);
      } else {
        // Reset to the first inter.jval and loop
        setCurrentIntervalIndex(0);
        setTimer(intervals[0]);
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  return (
    <View style={styles.container}>
      
      <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
        Total Workout Time: {formatTime(workoutDuration)}
      </Text>

      <Text style={{ color: 'white', fontSize: 20}}>Current Interval</Text>

      <Text style={styles.time}>{formatTime(timer)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startWorkout} style={styles.button}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopWorkout} style={styles.button}>
          <Text style={styles.buttonText}>Stop Workout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={resetWorkout} style={styles.resetbutton}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

    </View>
  );
};

export default WorkoutScreen;


const styles = StyleSheet.create({
  time: {
    fontSize: 80,
    color: 'white', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    padding: 10,
    borderRadius: '50px',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2d3142'
  },

  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: '5px',
  },
  resetbutton: {
    backgroundColor: 'red',
    padding: 10,
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: '5px',
  },
  buttonText: {
    color: 'white',
    borderRadius: '50px',
  },
});
