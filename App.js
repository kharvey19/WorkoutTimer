import React, { useState, useEffect } from 'react';
import { View, Text, Button, Vibration, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [intervals, setIntervals] = useState([]);
  const [intervalInput, setIntervalInput] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPage, setCurrentPage] = useState('input'); // State to manage current page

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
        // Reset to the first interval and loop
        setCurrentIntervalIndex(0);
        setTimer(intervals[0]);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  const addInterval = () => {
    if (intervalInput !== '') {
      setIntervals([...intervals, parseInt(intervalInput)]);
      setIntervalInput('');
    }
  };

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

  // Input screen for adding intervals
  const InputScreen = () => (
    <View style={styles.container1}>
      <Text style={styles.title}>Enter Intervals</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter interval in seconds"
        value={intervalInput}
        onChangeText={setIntervalInput}
      />
      <TouchableOpacity onPress={addInterval} style={styles.button}>
        <Text style={styles.buttonText}>Add Interval</Text>
      </TouchableOpacity>
      <FlatList
        data={intervals}
        renderItem={({ item, index }) => <Text>Interval {index + 1}: {item} seconds</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Start Workout" onPress={() => setCurrentPage('workout')} />
    </View>
  );

  // Workout screen for starting/stopping the workout and showing the timer
  const WorkoutScreen = () => (
    <View style={styles.container}>
      <Text>Total Workout Time: {formatTime(workoutDuration)}</Text>
      <Text>Current Interval</Text>
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

  // Conditionally render the current screen
  return currentPage === 'input' ? <InputScreen /> : <WorkoutScreen />;
}

const styles = StyleSheet.create({
  time: {
    fontSize: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    padding: 10,
    borderRadius: '50px',
    // display: 'flex',
    // justifyContent: 'center',
    // gap: '1px', // Space between the buttons
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 300
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: '5px',
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
