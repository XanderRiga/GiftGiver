import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Person from './models/person';
import Gift from './models/gift';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [people, setPeople] = useState([])
  const [gifts, setGifts] = useState([])

  const createTables = useCallback(async () => {
    await Person.createTable()
    await Gift.createTable()
  }, [])

  const createPeople = useCallback(async () => {
    const kendra = new Person({ name: 'Kendra' });
    const collin = new Person({ name: 'Collin' });

    await kendra.save();
    await collin.save();
    setPeople(await Person.query())
  }, [])

  const createGifts = useCallback(async () => {
    const gift = new Gift({ name: 'socks', person_id: 1 });

    await gift.save();

    setGifts(await Gift.query());
  })

  React.useEffect(() => {
    createTables();
    createPeople();
    createGifts();
  }, [])

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {
            people.map(person => <Text key={person.id}>{person.name}</Text>)
          }
        </ScrollView>

        <ScrollView style={{ flex: 1 }}>
          {
            gifts.map(gift => <Text key={gift.id}>{gift.name}</Text>)
          }
        </ScrollView>
        <StatusBar style="auto" />
      </View>
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
