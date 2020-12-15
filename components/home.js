import React, {useCallback, useState} from 'react';
import {Body, Container, Content, List, ListItem, Text, Right, Icon, Button, Fab} from 'native-base';
import Person from '../models/person';
import {Alert} from "react-native";
import Gift from "../models/gift";

export function Home({navigation}) {
  const [people, setPeople] = useState([]);

  const loadPeople = useCallback(async () => {
    setPeople(await Person.query());
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadPeople().then()
    });
  }, [navigation]);

  const clickPerson = (person) => {
    navigation.navigate('Gifts', {name: person.name, person: person});
  }

  const trashPersonButtonPress = (person) => {
    Alert.alert(
        "Delete " + person.name + '?',
        "Are you sure you want to delete " + person.name + "? " +
        "This will delete all of their associated gifts.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => deletePerson(person) }
        ],
        { cancelable: false }
    );
  }

  const deletePerson = async (person) => {
    const associatedGifts = await Gift.query({where: {person_id_eq: person.id}})
    associatedGifts.forEach(gift => Gift.destroy(gift.id))
    await Person.destroy(person.id)
    await loadPeople()
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
                <Body>
                  <Text>{person.name}</Text>
                </Body>
                <Right>
                  <Button icon transparent small onPress={() => trashPersonButtonPress(person)}>
                    <Icon name="trash" style={{color: 'red'}} />
                  </Button>
                </Right>
              </ListItem>)
          }
        </List>
      </Content>
      <Fab
        active={true}
        style={{ backgroundColor: 'blue' }}
        position="bottomRight"
        onPress={() => navigation.navigate('PersonForm')}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
}
