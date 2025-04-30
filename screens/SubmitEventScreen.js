import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const SubmitEventScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !location || !date || !tags) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        description,
        location,
        date,
        tags: tags.split(',').map(t => t.trim()), // Convert comma string to array
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Event submitted');
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setTags('');
    } catch (error) {
      console.error('Error submitting event:', error);
      Alert.alert('Error', 'Failed to submit event');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Submit an Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (e.g., May 10, 2025)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated, e.g., Tech, Career Fairs)"
        value={tags}
        onChangeText={setTags}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubmitEventScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
