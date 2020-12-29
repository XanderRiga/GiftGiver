import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Container, Content, Form, Label, Item, Icon, Input, Text, Textarea, Toast} from 'native-base';
import Gift from "../models/gift";
import {urlValidator} from "../helpers/urlValidator";

export function GiftForm({navigation, route}) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [link, setLink] = useState('');

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      if (route.params.currentGift) {
        const gift = route.params.currentGift
        setName(gift.name)
        setLink(gift.link)
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

    if (trackingLink && !urlValidator(trackingLink)) {
      Toast.show({
        text: "Tracking link must be a valid URL",
        buttonText: 'Ok'
      });
      return;
    }

    if (link && !urlValidator(link)) {
      Toast.show({
        text: "Purchase link must be a valid URL",
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
        link: link,
        notes: notes,
        tracking_number: trackingNumber,
        tracking_link: trackingLink,
        price_cents: price_cents
      });
    } else {
      const gift = new Gift({
        name: name,
        link: link,
        person_id: route.params.person.id,
        notes: notes,
        tracking_number: trackingNumber,
        tracking_link: trackingLink,
        price_cents: price_cents
      });
      await gift.save();
    }

    navigation.goBack();
  }

  const buildPriceCents = () => {
    if (price === '') {
      return ''
    }
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
          <Item style={styles.input} floatingLabel>
            <Label>Name</Label>
            <Input
              onChangeText={val => setName(val)}
              value={name} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Purchase URL</Label>
            <Input
              onChangeText={val => setLink(val)}
              value={link} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Icon active name='dollar-sign' type={'FontAwesome5'} />
            <Label>Price</Label>
            <Input
              onChangeText={val => setPrice(val)}
              value={price} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Tracking Number</Label>
            <Input
              onChangeText={val => setTrackingNumber(val)}
              value={trackingNumber} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Tracking Link</Label>
            <Input
              onChangeText={val => setTrackingLink(val)}
              value={trackingLink} />
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
