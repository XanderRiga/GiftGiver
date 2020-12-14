import React, {useCallback, useState} from 'react';
import {Body, Button, Container, Content, List, ListItem, Text, Right, Icon} from 'native-base';
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
      loadGifts()
    });
  }, [navigation]);

  const clickGift = (gift) => {
    navigation.navigate('GiftPage', {name: gift.name, gift: gift})
  };

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
                  <Button icon transparent>
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
