import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Item, Icon, Input, Text, Textarea, Toast} from 'native-base';
import Gift from "../models/gift";

export function GiftForm({navigation, route}) {
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [price, setPrice] = useState('0')

  const submitGift = async () => {
    if (!name) {
      Toast.show({
        text: "Name must be filled",
        buttonText: 'Ok'
      });
      return;
    }

    const price_cents = buildPrice(price)
    if (isNaN(price_cents)) {
      Toast.show({
        text: "Price must be a number",
        buttonText: 'Ok'
      });
      return;
    }

    const gift = new Gift({
      name: name,
      person_id: route.params.person.id,
      notes: notes,
      price_cents: price_cents
    })
    await gift.save();
    navigation.goBack();
  }

  const buildPrice = () => {
    const priceFloat = parseFloat(price)
    return Math.round( priceFloat * 100);
  }

  return (
    <Container>
      <Content padder>
        <Form style={styles.form}>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setName(val)}
              placeholder="Name" />
          </Item>
          <Item style={styles.input}>
            <Icon active name='dollar-sign' type={'FontAwesome5'} />
            <Input
                onChangeText={val => setPrice(val)}
                placeholder="Price" />
          </Item>
          <Textarea
              rowSpan={5}
              bordered
              placeholder="Notes"
              style={styles.textArea}
              onChangeText={val => setNotes(val)}/>
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
  },
  input: {
    marginTop: 15,
    marginBottom: 15
  },
  textArea: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    marginBottom: 25,
  }
});
