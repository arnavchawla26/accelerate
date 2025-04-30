import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const universities = [
  'San Jose State University',
  'Stanford University',
  'UC Berkeley',
  'UCLA',
  'University of Southern California',
  'Cal Poly SLO',
  'UC San Diego',
  'Harvard University',
  'MIT',
  'Columbia University',
];

export default function UniversityScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const filteredUniversities = universities.filter((u) =>
    u.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your University</Text>

      <TextInput
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <FlatList
        data={filteredUniversities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.universityItem,
              selectedUniversity === item && styles.selectedItem,
            ]}
            onPress={() => setSelectedUniversity(item)}
          >
            <Text
              style={[
                styles.universityText,
                selectedUniversity === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      {selectedUniversity !== '' && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            console.log('Continue button pressed in UniversityScreen'); // ✅ Debug log
            navigation.navigate('StudentInfo'); // ✅ Correct navigation to StudentInfo
          }}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  list: {
    flexGrow: 0,
    maxHeight: 300,
  },
  universityItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#4F46E5',
  },
  universityText: {
    fontSize: 16,
    color: '#333',
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
