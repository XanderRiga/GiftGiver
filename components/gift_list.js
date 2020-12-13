import React, {useCallback, useState} from 'react';
import {Container, Content, List, ListItem, Text, Right, Icon, Left} from 'native-base';
import Gift from '../models/gift';

export function GiftList({navigation}) {
  const [gifts, setGifts] = useState([]);

  const loadGifts = useCallback(async () => {
    setGifts(await Gift.query());
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadGifts()
    });
  }, [navigation]);

  return (
    <Container>
      <Content>
        <List>
          {
            gifts.map(gift =>
                <ListItem key={gift.id} >
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
