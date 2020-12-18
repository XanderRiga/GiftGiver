import React, {useCallback, useState} from 'react';
import {Container, Content, Fab, List, Separator, Icon} from 'native-base';
import Gift from '../models/gift';
import {GiftSubList} from "./gitSubList";

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
      <Fab
          active={true}
          style={{ backgroundColor: 'blue' }}
          position="bottomRight"
          onPress={() => {navigation.navigate('GiftForm', {person: route.params.person, title: 'Add a Gift'})}}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
}
