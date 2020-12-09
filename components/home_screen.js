import React, { useCallback, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Person } from '../models/person';
import * as SQLite from 'expo-sqlite'

export function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([])

  // const loadPeople = useCallback(async () => {
  //   console.log(JSON.stringify(await Person.query()))
  //   setPeople(await Person.query())
  // }, [])

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     loadPeople();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <ScrollView style={{ flex: 1 }}>
    {
      people.map(person => <Text key={person.id}>{person.name}</Text>)
    }
  </ScrollView>
  );
}
