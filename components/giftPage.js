import React from 'react';
import {Body, Card, CardItem, Container, Content, Icon, Item, Text} from 'native-base';

export function GiftPage({navigation, route}) {

  return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>{route.params.gift.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item>
                  <Icon active name='dollar-sign' type={'FontAwesome5'} />
                  <Text>{(route.params.gift.price_cents * 1.0) / 100}</Text>
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{route.params.gift.notes}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
  );
}
