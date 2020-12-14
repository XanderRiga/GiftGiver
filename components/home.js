import React, {useCallback, useState} from 'react';
import {Container, Content, List, ListItem, Text, Right, Icon, Left} from 'native-base';
import Person from '../models/person';

export function Home({navigation}) {
  const [people, setPeople] = useState([]);

  const loadPeople = useCallback(async () => {
    setPeople(await Person.query());
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadPeople()
    });
  }, [navigation]);

  const clickPerson = (person) => {
    navigation.navigate('Gifts', {name: person.name});
  }

  return (
    <Container>
      <Content>
        <List>
          {
            people.map(person =>
              <ListItem
                key={person.id}
                button={true}
                onPress={() => clickPerson(person)}>
                <Left>
                  <Text>{person.name}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>)
          }
        </List>
      </Content>
    </Container>
  );
}
