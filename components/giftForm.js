import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Item, Icon, Input, Text, Textarea, Toast} from 'native-base';
import Gift from "../models/gift";

export function GiftForm({navigation, route}) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('0');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingLink, setTrackingLink] = useState('');

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params.currentGift) {
        const gift = route.params.currentGift
        setName(gift.name)
        setNotes(gift.notes)
        setTrackingNumber(gift.tracking_number)
        setTrackingLink(gift.tracking_link)
        setPrice(buildPriceDollars(gift.price_cents))
      }
    });
  });

  const submitGift = async () => {
    if (!name) {
      Toast.show({
        text: "Name must be filled",
        buttonText: 'Ok'
      });
      return;
    }

    const price_cents = buildPriceCents(price)
    if (isNaN(price_cents)) {
      Toast.show({
        text: "Price must be a number",
        buttonText: 'Ok'
      });
      return;
    }

    if (route.params.currentGift) {
      await Gift.update({
        id: route.params.currentGift.id,
        name: name,
        notes: notes,
        tracking_number: trackingNumber,
        tracking_link: trackingLink,
        price_cents: price_cents
      });
    } else {
      const gift = new Gift({
        name: name,
        person_id: route.params.person.id,
        notes: notes,
        price_cents: price_cents
      })
      await gift.save();
    }

    navigation.goBack();
  }

  const buildPriceCents = () => {
    const priceFloat = parseFloat(price)
    return Math.round( priceFloat * 100);
  }

  const buildPriceDollars = (price_cents) => {
    return (price_cents / 100.0).toString()
  }

  return (
    <Container>
      <Content padder>
        <Form style={styles.form}>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setName(val)}
              value={name}
              placeholder="Name" />
          </Item>
          <Item style={styles.input}>
            <Icon active name='dollar-sign' type={'FontAwesome5'} />
            <Input
              onChangeText={val => setPrice(val)}
              value={price}
              placeholder="Price" />
          </Item>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setTrackingNumber(val)}
              value={trackingNumber}
              placeholder="Tracking Number" />
          </Item>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setTrackingLink(val)}
              value={trackingLink}
              placeholder="Tracking Link" />
          </Item>
          <Textarea
              rowSpan={5}
              bordered
              placeholder="Notes"
              style={styles.textArea}
              value={notes}
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
