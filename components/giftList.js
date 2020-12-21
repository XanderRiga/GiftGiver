import React, {useCallback, useState} from 'react';
import {Container, Content, Fab, List, Separator, Icon} from 'native-base';
import Gift from '../models/gift';
import {GiftSubList} from "./gitSubList";
import { Alert } from "react-native";
import {ERROR, SUCCESS} from "../helpers/colors";

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

  function containsCheckedGifts() {
    let checked = false
    gifts.forEach(gift => {
      if (gift.checked) {
        checked = true;
      }
    })

    return checked;
  }

  function checkedGifts() {
    return gifts.filter(gift => gift.checked)
  }

  function unCheckedGifts() {
    return gifts.filter(gift => !gift.checked)
  }

  const deleteChecked = async () => {
    for (const gift of checkedGifts()) {
      await deleteGift(gift);
    }
    loadGifts();
  }

  const deleteAll = async () => {
    for (const gift of gifts) {
      await deleteGift(gift)
    }
    loadGifts();
  }

  const deleteGift = async (gift) => {
    await Gift.destroy(gift.id);
  }

  function trashFabClicked() {
    Alert.alert(
      'Delete Gifts?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete All Checked',
          onPress: () => deleteChecked()
        },
        {
          text: 'Delete All Gifts',
          onPress: () => deleteAll(),
          style: 'destructive'
        }
      ]
    );
  }

  return (
    <Container>
      <Content>
        <List>
          <GiftSubList
            gifts={unCheckedGifts()}
            navigation={navigation}
            loadGifts={loadGifts}
            person={route.params.person}/>

          {containsCheckedGifts() ? <Separator /> : undefined}

          <GiftSubList
            gifts={checkedGifts()}
            navigation={navigation}
            loadGifts={loadGifts}
            person={route.params.person}/>
        </List>
      </Content>
      {gifts.length !== 0 ? <Fab
        active={true}
        style={{ backgroundColor: ERROR }}
        position="bottomLeft"
        onPress={trashFabClicked}>
        <Icon name="trash" />
      </Fab> : undefined}
      <Fab
        active={true}
        style={{ backgroundColor: SUCCESS }}
        position="bottomRight"
        onPress={() => {navigation.navigate('GiftForm', {person: route.params.person, title: 'Add a Gift'})}}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
}
