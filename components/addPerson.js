import React, {useState} from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';
import Person from '../models/person';

export function AddPersonComponent({navigation}) {
  return (
    <Container>
      <Content>
        <Text>This is the Add Person Page</Text>
      </Content>
    </Container>
  );
}
