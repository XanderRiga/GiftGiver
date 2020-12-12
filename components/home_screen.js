import React, {useCallback, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import Person from '../models/person';

export function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([]);

  const loadPeople = useCallback(async () => {
    setPeople(await Person.query());
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadPeople()
    });
  }, [navigation]);

  return (
    <ScrollView style={{ flex: 1 }}>
    {
      people.map(person => <Text key={person.id}>{person.name}</Text>)
    }
    </ScrollView>
  );
}
