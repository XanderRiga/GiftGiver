import React, {useCallback, useState} from 'react';
import {Body, CheckBox, Container, Content, Fab, List, ListItem, Separator, Right, Icon, Text, Button} from 'native-base';
import Gift from '../models/gift';
import {Alert, StyleSheet} from "react-native";
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

  const deleteClicked = () => {
    Alert.alert(
      "Are you sure?",
      "This will delete all checked gifts in the current list",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteCheckedGifts() }
      ],
      { cancelable: false }
    );
  };

  const deleteCheckedGifts = async () => {
    for (const gift of gifts) {
      if (gift.checked) {
        await Gift.destroy(gift.id)
      }
    }

    await loadGifts();
  };

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
                  <Icon active name="arrow-forward" />
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
                    <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
                  : undefined
            )
          }
        </List>
      </Content>
      {
        containsCheckedGifts() ? <Fab
            active={true}
            style={{ backgroundColor: 'red' }}
            position="bottomRight"
            onPress={deleteClicked}>
          <Icon name="trash" />
        </Fab> : undefined
      }
    </Container>
  );
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 13
  }
})
