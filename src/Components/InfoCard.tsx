import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';

interface IProps {
  picture: string;
  title: string;
}

const InfoCard = (props: IProps) => {
  const { picture, title } = props;
  return (
      <Animatable.View animation="bounceInLeft" duration={2000} style={styles.container}>
        <View style={styles.leftPart}>
          <View style={{ marginLeft: 15 }}>
            <Avatar rounded
              source={{ uri: picture }}
              activeOpacity={0.7} />
          </View>
          <Text style={styles.title} >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Text>
        </View>
        <View style={styles.rightPart} >
          <Text style={styles.rightPartText} >
              Learn more
          </Text>
          <View style={styles.rightPartButton} >
            <Icon name="angle-right" type="font-awesome" color={Colors.white} size={20} />
          </View>
        </View>
      </Animatable.View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
      height: 60,
      marginHorizontal: 10,
      marginTop: 10,
      backgroundColor: Colors.secondary,
      borderWidth: 1,
      borderColor: Colors.secondaryText,
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
  },
  title: {
    fontFamily: 'regular',
    fontSize: 15,
    marginLeft: 10,
    color: Colors.secondaryText,
  },
  leftPart: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightPart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rightPartButton: {
    backgroundColor: Colors.link,
    height: 28,
    width: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  rightPartText: {
    fontFamily: 'regular',
    fontSize: 15,
    marginLeft: 10,
    color: Colors.link,
  }
});