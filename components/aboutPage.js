import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Row, Text, Grid} from 'native-base';
import * as Linking from 'expo-linking';
import {PRIMARY} from "../helpers/colors";
import {StyleSheet} from "react-native";

export function AboutPage({navigation, route}) {
  const WEBSITE_URL = 'http://xanderriga.com'
  const GITHUB_URL = 'https://github.com/XanderRiga'
  const LINKEDIN_URL = 'https://www.linkedin.com/in/xander-riga/'
  const DONATE_LINK = 'https://www.buymeacoffee.com/xanderriga'

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header>
            <Text>Thanks for using GiftGiver!</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                GiftGiver is a solo effort from Xander Riga.
                If you are enjoying the app and would like to support me,
                you can donate using the button below.
              </Text>
              <Button
                color={PRIMARY}
                full
                style={styles.donateButton}
                onPress={() => {Linking.openURL(DONATE_LINK)}}>
                <Text>Donate</Text>
              </Button>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Otherwise check me out on these various social media platforms or visit
                my website that details some of my other projects.
              </Text>
              <Grid style={{margin: 10}}>
                <Row>
                  <Button icon transparent onPress={() => {Linking.openURL(GITHUB_URL)}}>
                    <Icon name={'logo-github'} style={styles.socialIcon}/>
                  </Button>
                  <Button icon transparent onPress={() => {Linking.openURL(LINKEDIN_URL)}}>
                    <Icon name={'logo-linkedin'} style={styles.socialIcon}/>
                  </Button>
                  <Button icon transparent onPress={() => {Linking.openURL(WEBSITE_URL)}}>
                    <Icon name={'globe'} style={styles.socialIcon}/>
                  </Button>
                </Row>
              </Grid>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  donateButton: {
    marginTop: 25,
  },
  socialIcon: {
    color: 'black',
    fontSize: 40,
    marginRight: 10
  }
});