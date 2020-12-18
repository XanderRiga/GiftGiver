import React, {useCallback, useState} from 'react';
import {ActionSheet, Body, CheckBox, Container, Content, Fab, List, ListItem, Separator, Right, Icon, Text, Button} from 'native-base';
import Gift from '../models/gift';
import {StyleSheet} from "react-native";
import {truncate} from "../helpers/truncate";

export function GiftList({navigation, route}) {
  const [gifts, setGifts] = useState([]);

  const loadGifts = useCallback(async () => {
    const loadedGifts = await Gift.query({where: {person_id_eq: route.params.person.id}})
    setGifts(loadedGifts);
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
  };

  const deleteSpecificGift = async (gift) => {
    await Gift.destroy(gift.id);
    await loadGifts();
  }

  function containsCheckedGifts() {
    let checked = false
    gifts.forEach(gift => {
      if (gift.checked) {
        checked = true;
      }
    })

    return checked;
  }

  return (
    <Container>
      <Content>
        <List>
          {
            gifts.map(gift =>
              !gift.checked ? <ListItem key={gift.id} onPress={() => clickGift(gift)}>
                <CheckBox checked={gift.checked} onPress={() => toggleGiftChecked(gift)} />
                <Body>
                  <Text>{gift.name}</Text>
                  {gift.notes? <Text style={styles.subText}>{truncate(gift.notes, 50)}</Text> : null}
                </Body>
                <Right>
                  <Button
                    icon
                    transparent
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: ['Delete', 'Cancel', 'Edit'],
                          cancelButtonIndex: 1,
                          destructiveButtonIndex: 0,
                          title: gift.name
                        },
                        buttonIndex => {
                          if (buttonIndex === 0) {
                            deleteSpecificGift(gift).then()
                          } else if (buttonIndex === 2) {
                            navigation.navigate('GiftForm', {currentGift: gift, person: route.params.person})
                          }
                        }
                      )}>
                    <Icon type={'FontAwesome'} name="ellipsis-h" style={{color: 'black'}} />
                  </Button>
                </Right>
              </ListItem> : undefined)
          }

          {
            containsCheckedGifts() ?
                <Separator />
                : undefined
          }

          {
            gifts.map(gift =>
              gift.checked ?
                <ListItem key={gift.id} onPress={() => clickGift(gift)}>
                  <CheckBox checked={gift.checked} onPress={() => toggleGiftChecked(gift)} />
                  <Body>
                    <Text>{gift.name}</Text>
                    {gift.notes? <Text style={styles.subText}>{truncate(gift.notes, 50)}</Text> : null}
                  </Body>
                  <Right>
                    <Button
                      icon
                      transparent
                      onPress={() =>
                        ActionSheet.show(
                          {
                            options: ['Delete', 'Cancel', 'Edit'],
                            cancelButtonIndex: 1,
                            destructiveButtonIndex: 0,
                            title: gift.name
                          },
                          buttonIndex => {
                            if (buttonIndex === 0) {
                              deleteSpecificGift(gift).then()
                            } else if (buttonIndex === 2) {
                              navigation.navigate('GiftForm', {currentGift: gift, person: route.params.person})
                            }
                          }
                        )}>
                    <Icon type={'FontAwesome'} name="ellipsis-h" style={{color: 'black'}} />
                    </Button>
                  </Right>
                </ListItem>
                  : undefined
            )
          }
        </List>
      </Content>
      <Fab
          active={true}
          style={{ backgroundColor: 'blue' }}
          position="bottomRight"
          onPress={() => {navigation.navigate('GiftForm', {person: route.params.person})}}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 13
  }
})
