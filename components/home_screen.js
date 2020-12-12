import React, {useCallback, useState} from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';
import Person from '../models/person';

export function HomeScreen({navigation}) {
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
    <Container>
      <Content>
        <List>
          {
            people.map(person => <ListItem key={person.id}><Text>{person.name}</Text></ListItem>)
          }
        </List>
      </Content>
    </Container>
  );
}
