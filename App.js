import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/home';
import Gift from './models/gift';
import Person from './models/person';
import Event from './models/event';
import {Button, Icon, Root} from 'native-base';
import {PersonForm} from "./components/personForm";
import * as Font from 'expo-font';
import {GiftList} from "./components/giftList";
import {GiftForm} from "./components/giftForm";
import {GiftPage} from "./components/giftPage";
import {PRIMARY} from "./helpers/colors";
import {AboutPage} from "./components/aboutPage";
import {FilterGiftList} from "./components/filterGiftList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [ready, setReady] = useState(false);
  const Stack = createStackNavigator();

  const createTables = useCallback(async () => {
    await Person.createTable();
    await Gift.createTable();
    await Event.createTable();

    await AsyncStorage.removeItem('minPriceFilter');
    await AsyncStorage.removeItem('maxPriceFilter');
    await AsyncStorage.removeItem('stringQueryFilter');
    setReady(true);
  }, []);

  React.useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();

    createTables().then();
  });

  if (!ready) {
    return (<View />)
  }

  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home} options={({ navigation, route }) =>
              ({
                title: 'People',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('AboutPage')}
                    title="Info"
                    icon
                    transparent
                  >
                    <Icon color={PRIMARY} name={'information-circle-outline'}/>
                  </Button>
                ),
              })} />
          <Stack.Screen
              name="PersonForm"
              component={PersonForm}
              options={({ route }) =>
                  ({title: route.params.title})} />
          <Stack.Screen
            name="Gifts"
            component={GiftList}
            options={({ navigation, route }) =>
              ({
                title: route.params.title
              })} />
          <Stack.Screen
            name="GiftForm"
            component={GiftForm}
            options={({ route }) =>
              ({title: route.params.title})} />
          <Stack.Screen
            name="GiftPage"
            component={GiftPage}
            options={({ route }) =>
              ({ title: route.params.name })}/>
          <Stack.Screen
            name="AboutPage"
            component={AboutPage}
            options={({ route }) =>
              ({ title: 'About' })}/>
          <Stack.Screen
            name="FilterGiftList"
            component={FilterGiftList}
            options={({ route }) =>
              ({ title: 'Filters' })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
