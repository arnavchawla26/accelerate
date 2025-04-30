import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { db, auth } from '../config/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

export default function MyEventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const savedEventIds = userSnap.data()?.savedEvents || [];

        if (savedEventIds.length === 0) {
          setEvents([]);
          return;
        }

        const allEventsSnap = await getDocs(collection(db, 'events'));
        const savedEvents = allEventsSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(event => savedEventIds.includes(event.id));

        setEvents(savedEvents);
      } catch (error) {
        console.error('Error loading saved events:', error);
      }
    };

    fetchSavedEvents();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.meta}>{item.location}</Text>
      <Text style={styles.meta}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Saved Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No events saved yet.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    marginTop: 6,
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});
