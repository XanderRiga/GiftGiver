import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Label, Item, Input, Text, Toast} from 'native-base';
import Person from '../models/person';

export function PersonForm({navigation, route}) {
  const [name, setName] = useState('')

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params.person) {
        const person = route.params.person
        setName(person.name)
      }
    });
  });

  const submitPerson = async () => {
    if (!name) {
      Toast.show({
        text: "Name must be filled",
        buttonText: 'Ok'
      });
      return;
    }

    if (route.params.person) {
      await Person.update({
        id: route.params.person.id,
        name: name
      })
    } else {
      const person = new Person({name: name})
      await person.save();
    }

    navigation.goBack();
  }

  return (
    <Container>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              onChangeText={val => setName(val)}
              value={name} />
          </Item>
          <Button
            onPress={submitPerson}
            success
            full
            style={styles.saveButton}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  saveButton: {
    marginTop: 25
  }
});
