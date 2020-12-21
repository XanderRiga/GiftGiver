import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './components/home';
import Gift from './models/gift';
import Person from './models/person';
import Event from './models/event';
import {Root} from 'native-base';
import {PersonForm} from "./components/personForm";
import * as Font from 'expo-font';
import {GiftList} from "./components/giftList";
import {GiftForm} from "./components/giftForm";
import {GiftPage} from "./components/giftPage";

export default function App() {
  const [ready, setReady] = useState(false);
  const Stack = createStackNavigator();

  const createTables = useCallback(async () => {
    await Person.createTable();
    await Gift.createTable();
    await Event.createTable();
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
            component={Home} options={{title: 'People'}} />
          <Stack.Screen
              name="PersonForm"
              component={PersonForm}
              options={({ route }) =>
                  ({title: route.params.title})} />
          <Stack.Screen
            name="Gifts"
            component={GiftList}
            options={({ route }) =>
              ({title: route.params.title})} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
