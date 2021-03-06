import React, {useCallback, useState, useEffect} from 'react';
import {Container, Content, Fab, List, Separator, Icon, Button, ListItem, Text} from 'native-base';
import Gift from '../models/gift';
import {GiftSubList} from "./gitSubList";
import { Alert } from "react-native";
import {ERROR, SUCCESS} from "../helpers/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {giftPriceExists} from "../helpers/gift_price_exists"

export function GiftList({navigation, route}) {
  const [gifts, setGifts] = useState([]);
  const [hasFilters, setHasFilters] = useState(false);

  const loadGifts = useCallback(async () => {
    const loadedGifts = await Gift.query({ where: {
      person_id_eq: route.params.person.id
    }});

    const filteredGifts = await filterGifts(loadedGifts)

    setGifts(filteredGifts);
  }, []);

  const filterGifts = async (giftList) => {
    const minPrice = await AsyncStorage.getItem('minPriceFilter');
    const maxPrice = await AsyncStorage.getItem('maxPriceFilter');
    const stringQuery = await AsyncStorage.getItem('stringQueryFilter');

    if (minPrice) {
      giftList = giftList.filter(gift => !giftPriceExists(gift) || (gift.price_cents / 100) >= minPrice)
    }

    if (maxPrice) {
      giftList = giftList.filter(gift => !giftPriceExists(gift) || (gift.price_cents / 100) <= maxPrice)
    }

    if (stringQuery) {
      giftList = giftList.filter(gift => {
        return (gift.name.toLowerCase().includes(stringQuery.toLowerCase()) ||
                gift.notes.toLowerCase().includes(stringQuery.toLowerCase()))
      })
    }

    if (!!(minPrice || maxPrice || stringQuery)) {
      setHasFilters(true);
    } else {
      setHasFilters(false);
    }

    return giftList;
  }

  const clearFilters = async () => {
    await AsyncStorage.removeItem('minPriceFilter');
    await AsyncStorage.removeItem('maxPriceFilter');
    await AsyncStorage.removeItem('stringQueryFilter');

    await loadGifts();
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('FilterGiftList')}
          icon
          transparent
        >
          <Icon style={{color: 'black'}} type="FontAwesome" name={'filter'}/>
        </Button>
      )
    });

    return navigation.addListener('focus', () => {
      loadGifts().then()
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
    return gifts.filter(gift => gift.checked);
  }

  function unCheckedGifts() {
    return gifts.filter(gift => !gift.checked)
  }

  const deleteChecked = async () => {
    for (const gift of checkedGifts()) {
      await deleteGift(gift);
    }
    loadGifts().then();
  }

  const deleteAll = async () => {
    for (const gift of gifts) {
      await deleteGift(gift)
    }
    loadGifts().then();
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
          {hasFilters ?
            <ListItem onPress={clearFilters}>
              <Icon type={'FontAwesome'} name="times-circle" style={{color: 'red'}} />
              <Text style={{paddingLeft: 10}}>Clear All Filters</Text>
            </ListItem>
            : undefined}
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
