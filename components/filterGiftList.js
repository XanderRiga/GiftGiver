import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import {Button, Form, Input, Item, Text, Toast, Container, Content} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FilterGiftList = ({navigation, route}) => {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [stringQuery, setStringQuery] = useState(null);

  const saveFilters = async () => {
    if (isNaN(minPrice) && minPrice) {
      Toast.show({
        text: "Minimum Price must be a number or empty",
        buttonText: 'Ok'
      });
      return;
    }

    if (isNaN(maxPrice) && maxPrice) {
      Toast.show({
        text: "Maximum Price must be a number or empty",
        buttonText: 'Ok'
      });
      return;
    }

    if (minPrice === undefined || minPrice === null || minPrice === '') {
      await AsyncStorage.removeItem('minPriceFilter');
    } else {
      await AsyncStorage.setItem('minPriceFilter', minPrice);
    }

    if (maxPrice === undefined || maxPrice === null || maxPrice === '') {
      await AsyncStorage.removeItem('maxPriceFilter');
    } else {
      await AsyncStorage.setItem('maxPriceFilter', maxPrice);
    }

    if (!stringQuery || stringQuery === '') {
      await AsyncStorage.removeItem('stringQueryFilter');
    } else {
      await AsyncStorage.setItem('stringQueryFilter', stringQuery);
    }

    navigation.goBack();
  }

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      const minPriceFilter = await AsyncStorage.getItem('minPriceFilter');
      const maxPriceFilter = await AsyncStorage.getItem('maxPriceFilter');
      const stringQueryFilter = await AsyncStorage.getItem('stringQueryFilter');

      if (minPriceFilter) {
        setMinPrice(minPriceFilter)
      }

      if (maxPriceFilter) {
        setMaxPrice(maxPriceFilter)
      }

      if (stringQueryFilter) {
        setStringQuery(stringQueryFilter)
      }
    });
  });

  return (
    <Container>
      <Content padder>
        <Form>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setMinPrice(val)}
              value={minPrice}
              placeholder="Minimum Price" />
          </Item>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setMaxPrice(val)}
              value={maxPrice}
              placeholder="Maximum Price" />
          </Item>
          <Item style={styles.input}>
            <Input
              onChangeText={val => setStringQuery(val)}
              value={stringQuery}
              placeholder="Search" />
          </Item>
          <Button
            onPress={saveFilters}
            success
            full
            style={styles.saveButton}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 25
  },
  input: {
    marginTop: 15,
    marginBottom: 15
  }
});
