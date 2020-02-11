import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Colors from '../Utils/Colors';

const USERS = [
  {
    name: 'Moustique',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: 0,
  },
  {
    name: 'Pokémon',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: 1,
  },
  {
    name: 'Imad Kimouche',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    value: 2,
  },
]

export default class Glossary extends Component {

  renderCard(user : {name: string, avatar: string, value: number}, index : number) {
    const { name, avatar, value } = user;

    return (
      <View
        key={index}
        style={{
          height: 60,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderBottomColor: (value >= 1 ) ? (value >= 2 ) ? 'rgba(222,100,100,0.7)' : 'rgba(222,222,100,0.7)' : 'rgba(100,222,100,0.7)',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 15 }}>
            <Avatar
              rounded
              source={{
                uri: avatar,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(222,222,222,1)',
              width: 35,
              height: 28,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}
          >
            <Icon name="angle-right" type="font-awesome" color="gray" size={20} />
          </View>
        </View>
      </View>
    );
  }

  renderListCards() {
    return USERS.map((user: {name: string, avatar: string, value: number}, index : number) => {
      return this.renderCard(user, index);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon color="white" name="bug" type="font-awesome" size={62} />
          <Text style={styles.heading}>Insectes</Text>
        </View>
        <ScrollView pagingEnabled decelerationRate={0.993}>
        { this.renderListCards()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(70,130,200,0.7)',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});
