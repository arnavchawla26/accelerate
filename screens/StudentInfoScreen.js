import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

// 🚀 Firebase Firestore imports
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function StudentInfoScreen({ navigation }) {
  console.log("StudentInfoScreen loaded"); // Debug log

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');

  const isValid = name !== '' && studentId !== '' && email.includes('@');

  const handleContinue = async () => {
    try {
      await addDoc(collection(db, 'users'), {
        name: name,
        studentId: studentId,
        email: email,
        createdAt: new Date(),
      });
      console.log('User info saved to Firestore');
      navigation.navigate('Interests');
    } catch (error) {
      console.error('Error saving user info: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Tell us about yourself</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="University ID (e.g., 012345678)"
          keyboardType="numeric"
          value={studentId}
          onChangeText={setStudentId}
          style={styles.input}
        />

        <TextInput
          placeholder="University Email (e.g., you@sjsu.edu)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.continueButton, !isValid && { opacity: 0.4 }]}
          disabled={!isValid}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    paddingTop: 60,
    paddingHorizontal: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  continueText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
