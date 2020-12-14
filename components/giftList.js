import React, {useCallback, useState} from 'react';
import {Body, Button, Container, Content, List, ListItem, Text, Right, Icon} from 'native-base';
import Gift from '../models/gift';
import {StyleSheet, Alert} from "react-native";
import {truncate} from "../helpers/truncate";

export function GiftList({navigation, route}) {
  const [gifts, setGifts] = useState([]);

  const loadGifts = useCallback(async () => {
    setGifts(await Gift.query({where: {person_id_eq: route.params.person.id}}));
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadGifts()
    });
  }, [navigation]);

  const clickGift = (gift) => {
    navigation.navigate('GiftPage', {name: gift.name, gift: gift})
  };

  const trashGiftButtonPress = (gift) => {
    Alert.alert(
      "Delete " + gift.name + '?',
      "Are you sure you want to delete " + gift.name + " from " + route.params.person.name + "'s list?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteGift(gift) }
      ],
      { cancelable: false }
    );
  }

  const deleteGift = async (gift) => {
    await Gift.destroy(gift.id)
    loadGifts()
  }

  return (
    <Container>
      <Content>
        <List>
          {
            gifts.map(gift =>
              <ListItem key={gift.id} onPress={() => clickGift(gift)}>
                <Body>
                  <Text>{gift.name}</Text>
                  {gift.notes? <Text style={styles.subText}>{truncate(gift.notes, 60)}</Text> : null}
                </Body>
                <Right>
                  <Button icon transparent small onPress={() => trashGiftButtonPress(gift)}>
                    <Icon name="trash" style={{color: 'red'}} />
                  </Button>
                </Right>
              </ListItem>)
          }
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 13
  },
  swipeableRowFront: {
    alignItems: 'stretch',
    justifyContent: 'center'
  }
})
