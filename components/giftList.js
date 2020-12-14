import React, {useCallback, useState} from 'react';
import {Container, Content, List, ListItem, Text, Right, Icon, Left} from 'native-base';
import Gift from '../models/gift';

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
                <Left>
                  <Text>{gift.name}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>)
          }
        </List>
      </Content>
    </Container>
  );
}
