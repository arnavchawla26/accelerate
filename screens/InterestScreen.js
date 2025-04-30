import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import { db, auth } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const interestsList = [
  'Tech',
  'Sports',
  'Social Events',
  'Finance',
  'Art',
  'Music',
  'Career Fairs',
  'Food',
  'Science',
  'Health & Wellness',
];

export default function InterestScreen({ navigation }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      await setDoc(doc(db, 'users', user.uid), {
        interests: selectedInterests,
      }, { merge: true });

      console.log('User interests saved:', selectedInterests);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to save interests:', error);
      Alert.alert('Error', 'Failed to save your interests. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.interestItem,
        selectedInterests.includes(item) && styles.selectedItem,
      ]}
      onPress={() => toggleInterest(item)}
    >
      <Text
        style={[
          styles.interestText,
          selectedInterests.includes(item) && styles.selectedText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick Your Interests</Text>

      <FlatList
        data={interestsList}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      {selectedInterests.length > 0 && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    justifyContent: 'center',
  },
  interestItem: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    margin: 8,
    flex: 1,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#4F46E5',
  },
  interestText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  continueText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
