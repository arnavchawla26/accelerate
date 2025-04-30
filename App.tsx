import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import WelcomeScreen from './screens/WelcomeScreen';
import UniversityScreen from './screens/UniversityScreen';
import StudentInfoScreen from './screens/StudentInfoScreen';
import InterestScreen from './screens/InterestScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MyEventsScreen from './screens/MyEventsScreen';
import SubmitEventScreen from './screens/SubmitEventScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setInitialRoute(user ? 'Home' : 'Login');
      } catch (err) {
        console.error('Error checking user session:', err);
        setInitialRoute('Login');
      }
    };
    checkSession();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="University" component={UniversityScreen} />
        <Stack.Screen name="StudentInfo" component={StudentInfoScreen} />
        <Stack.Screen name="Interests" component={InterestScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyEvents" component={MyEventsScreen} />
        <Stack.Screen name="SubmitEvent" component={SubmitEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
