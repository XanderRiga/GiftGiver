import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './components/home_screen';
import Gift from './models/gift';
import Person from './models/person';

export default function App() {
  const [ready, setReady] = useState(false);
  const Stack = createStackNavigator();

  const createTables = useCallback(async () => {
    await Person.createTable();
    await Gift.createTable();
    setReady(true);
  }, []);

  React.useEffect(() => {
    createTables().then();
  });

  if (!ready) {
    return (<View />)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="People" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
