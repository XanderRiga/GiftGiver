import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './components/home_screen';
import Gift from './models/gift';
import Person from './models/person';
import {Button, Icon, Root} from 'native-base';
import {AddPersonComponent} from "./components/addPerson";
import * as Font from 'expo-font';
import {GiftList} from "./components/gift_list";

export default function App() {
  const [ready, setReady] = useState(false);
  const Stack = createStackNavigator();

  const createTables = useCallback(async () => {
    await Person.createTable();
    await Gift.createTable();
    setReady(true);
  }, []);

  React.useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();

    createTables();
  });

  if (!ready) {
    return (<View />)
  }

  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="People"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Add A Person')}
                  icon
                  transparent
                ><Icon name='add' style={{color: 'black'}} /></Button>
              )})} />
          <Stack.Screen name="Add A Person" component={AddPersonComponent} />
          <Stack.Screen name="Gifts" component={GiftList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
