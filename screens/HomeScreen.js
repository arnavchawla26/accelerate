import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { db, auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventsForUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        const interests = userData?.interests || [];

        const eventSnapshot = await getDocs(collection(db, 'events'));
        const allEvents = eventSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = allEvents.filter(event =>
          event.tags?.some(tag => interests.includes(tag))
        );

        setEvents(filtered);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    fetchEventsForUser();
  }, []);

  const handleRSVP = async (eventId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        savedEvents: arrayUnion(eventId),
      });

      Alert.alert('Success', 'Event saved to your RSVPs');
      console.log('RSVP saved:', eventId);
    } catch (error) {
      console.error('Error saving RSVP:', error);
      Alert.alert('Error', 'Could not save RSVP. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      navigation.replace('Login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const renderEvent = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      {item.tags && (
        <Text style={styles.tags}>Tags: {item.tags.join(', ')}</Text>
      )}

      <TouchableOpacity
        onPress={() => handleRSVP(item.id)}
        style={styles.rsvpButton}
      >
        <Text style={styles.rsvpButtonText}>RSVP / Save</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Events For You</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No matching events found.
          </Text>
        }
      />
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
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  eventLocation: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  tags: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  rsvpButton: {
    backgroundColor: '#4F46E5',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  rsvpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
