import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Item, Text, Toast} from 'native-base';
import Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

export function GiftPage({navigation, route}) {

  const copyTrackingToClipboard = (string) => {
    Clipboard.setString(string);
    Toast.show({
      text: 'Copied to Clipboard',
      buttonText: 'Ok',
      duration: 2000
    });
  }

  const openTrackingLink = (link) => {
    Linking.openURL(link);
  }

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

        {(route.params.gift.tracking_link || route.params.gift.tracking_number) ? <Card>
          <CardItem header>
            <Text>Tracking</Text>
          </CardItem>
          {route.params.gift.tracking_number ? <CardItem>
            <Body>
              <Item>
                <Button
                  icon
                  transparent
                  onPress={() => copyTrackingToClipboard(route.params.gift.tracking_number)}>
                  <Icon name={"clipboard"} style={{color: 'black'}} />
                  <Text style={{color: 'black'}}>{route.params.gift.tracking_number}</Text>
                </Button>
              </Item>
            </Body>
          </CardItem> : undefined}
          {route.params.gift.tracking_link ? <CardItem>
            <Body>
              <Button
                transparent
                onPress={() => openTrackingLink(route.params.gift.tracking_link)}>
                <Text>{route.params.gift.tracking_link}</Text>
              </Button>
            </Body>
          </CardItem> : undefined}
        </Card>: undefined}
      </Content>
    </Container>
  );
}
