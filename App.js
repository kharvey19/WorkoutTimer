import React, { useState } from 'react';
import { View } from 'react-native';
import WorkoutScreen from './components/Workout'
import InputScreen from './components/Input'

export default function App() {
  const [intervals, setIntervals] = useState([]);
  const [currentPage, setCurrentPage] = useState('input');

  return (
    <View style={{ flex: 1 }}>
      {currentPage === 'input' ? (
        <InputScreen
          intervals={intervals}
          setIntervals={setIntervals}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <WorkoutScreen
          intervals={intervals}
          setIntervals={setIntervals}
          setCurrentPage={setCurrentPage}
        />
      )}
    </View>
  );
}