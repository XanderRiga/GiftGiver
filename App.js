import 'react-native-gesture-handler';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/home_screen';
import Gift from './models/gift';
import Person from './models/person';
import * as SQLite from 'expo-sqlite'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const Stack = createStackNavigator();

  const createTables = useCallback(async () => {
    await Person.createTable();
    await Gift.createTable();
    console.log(JSON.stringify(await Person.query()))
    setLoaded(true);
  }, [])

  React.useEffect(() => {
    createTables();
  })

  if (!loaded) {
    return (<View />)
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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
