import React, {useCallback, useState} from 'react';
import {Body, Container, Content, List, ListItem, Text, Right, Icon, Button, Fab, ActionSheet} from 'native-base';
import Person from '../models/person';
import {Alert} from "react-native";
import Gift from "../models/gift";
import {SUCCESS} from '../helpers/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home({navigation}) {
  const [people, setPeople] = useState([]);

  const loadPeople = useCallback(async () => {
    setPeople(await Person.query());
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadPeople().then()

      // If we back up this far, we want to reset filters
      // In case they click a new person
      AsyncStorage.removeItem('minPriceFilter');
      AsyncStorage.removeItem('maxPriceFilter');
      AsyncStorage.removeItem('stringQueryFilter');
    });
  }, [navigation]);

  const clickPerson = (person) => {
    navigation.navigate('Gifts',
        {name: person.name, person: person, title: person.name + "'s Gifts"});
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
                  <Button
                    icon
                    transparent
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: ['Delete', 'Edit', 'Cancel'],
                          cancelButtonIndex: 2,
                          destructiveButtonIndex: 0,
                          title: person.name
                        },
                        buttonIndex => {
                          if (buttonIndex === 0) {
                            deletePerson(person).then()
                          } else if (buttonIndex === 1) {
                            navigation.navigate('PersonForm', {person: person, title: 'Edit ' + person.name})
                          }
                        }
                      )}>
                    <Icon type={'FontAwesome'} name="ellipsis-h" style={{color: 'black'}} />
                  </Button>
                </Right>
              </ListItem>)
          }
        </List>
      </Content>
      <Fab
        active={true}
        style={{ backgroundColor: SUCCESS }}
        position="bottomRight"
        onPress={() => navigation.navigate('PersonForm', {title: 'Add a Person'})}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
}
