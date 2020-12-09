import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Person from './models/person';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/home_screen';

export default function App() {
  const [people, setPeople] = useState([])

  const loadPeople = useCallback(async () => {
    setPeople(await Person.query())
  })

  const Stack = createStackNavigator();

  React.useEffect(() => {
    loadPeople();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
