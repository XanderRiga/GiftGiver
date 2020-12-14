import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Item, Input, Text, Toast} from 'native-base';
import Gift from "../models/gift";

export function GiftForm({navigation}) {
  const [name, setName] = useState('')

  const submitGift = async () => {
    if (!name) {
      Toast.show({
        text: "Name must be filled",
        buttonText: 'Ok'
      });
      return;
    }

    const gift = new Gift({name: name})
    await gift.save();
    navigation.goBack();
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
              onPress={submitGift}
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
