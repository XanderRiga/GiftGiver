import React, {useCallback, useState} from 'react';
import {Body, CheckBox, Container, Content, List, ListItem, Text} from 'native-base';
import Gift from '../models/gift';
import {StyleSheet} from "react-native";
import {truncate} from "../helpers/truncate";

export function GiftList({navigation, route}) {
  const [gifts, setGifts] = useState([]);

  const loadGifts = useCallback(async () => {
    setGifts(await Gift.query({where: {person_id_eq: route.params.person.id}}));
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadGifts().then();
    });
  }, [navigation]);

  const clickGift = (gift) => {
    navigation.navigate('GiftPage', {name: gift.name, gift: gift});
  };

  const toggleGiftChecked = async (gift) => {
    await Gift.update({id: gift.id, checked: !gift.checked});
    await loadGifts();
  }

  return (
    <Container>
      <Content>
        <List>
          {
            gifts.map(gift =>
              <ListItem key={gift.id} onPress={() => clickGift(gift)}>
                <CheckBox checked={gift.checked} onPress={() => toggleGiftChecked(gift)} />
                <Body>
                  <Text>{gift.name}</Text>
                  {gift.notes? <Text style={styles.subText}>{truncate(gift.notes, 60)}</Text> : null}
                </Body>
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
  }
})
