import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Item, Input, Text, Toast} from 'native-base';
import Person from '../models/person';

export function AddPerson({navigation}) {
  const [name, setName] = useState('')

  const submitPerson = async () => {
    if (!name) {
      Toast.show({
        text: "Name must be filled",
        buttonText: 'Ok'
      });
      return;
    }

    const person = new Person({name: name})
    await person.save();
    navigation.navigate('Home')
  }

  return (
    <Container>
      <Content padder>
        <Form>
          <Item>
            <Input
                onChangeText={val => setName(val)}
                placeholder="Name" />
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
