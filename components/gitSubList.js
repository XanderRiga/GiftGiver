import {ActionSheet, Body, Button, CheckBox, Icon, ListItem, Right, Text} from "native-base";
import {truncate} from "../helpers/truncate";
import React from "react";
import Gift from "../models/gift";
import {StyleSheet} from "react-native";
import {PRIMARY} from '../helpers/colors';

export const GiftSubList = (props) => {
  const deleteSpecificGift = async (gift) => {
    await Gift.destroy(gift.id);
    await props.loadGifts();
  }

  const clickGift = (gift) => {
    props.navigation.navigate('GiftPage', {name: gift.name, gift: gift});
  };

  const toggleGiftChecked = async (gift) => {
    await Gift.update({id: gift.id, checked: !gift.checked});
    await props.loadGifts();
  };

  return (
    props.gifts.map(gift =>
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
                  options: ['Delete', 'Edit', 'Cancel'],
                  cancelButtonIndex: 2,
                  destructiveButtonIndex: 0,
                  title: gift.name
                },
                buttonIndex => {
                  if (buttonIndex === 0) {
                    deleteSpecificGift(gift).then()
                  } else if (buttonIndex === 1) {
                    props.navigation.navigate('GiftForm', {currentGift: gift, person: props.person, title: 'Edit ' + gift.name})
                  }
                }
              )}>
            <Icon type={'FontAwesome'} name="ellipsis-h" style={{color: 'black'}} />
          </Button>
        </Right>
      </ListItem>
    )
  )
}

const styles = StyleSheet.create({
  subText: {
    fontSize: 13,
    color: PRIMARY
  }
})