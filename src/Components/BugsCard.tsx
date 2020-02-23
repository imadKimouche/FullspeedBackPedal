import React from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';

interface IProps {
  picture: string;
  title: string;
  index: number;
  onClick: (index: number) => void;
}

const BugsCard = (props: IProps) => {
  const {picture, title, index, onClick} = props;
  return (
    <TouchableNativeFeedback
      key={title}
      onPress={() => {
        onClick(index);
      }}>
      <Animatable.View
        animation="bounceInLeft"
        duration={2000}
        style={styles.container}>
        <View style={styles.leftPart}>
          <View style={{marginLeft: 15}}>
            <Avatar rounded source={{uri: picture}} activeOpacity={0.7} />
          </View>
          <Text style={styles.title}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Text>
        </View>
        <View style={styles.rightPartButton}>
          <Icon
            name="angle-right"
            type="font-awesome"
            color={Colors.pink}
            size={20}
          />
        </View>
      </Animatable.View>
    </TouchableNativeFeedback>
  );
};

export default BugsCard;

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 0.4,
    borderColor: Colors.secondaryLight,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'regular',
    fontSize: 15,
    marginLeft: 10,
    color: Colors.black,
  },
  leftPart: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightPartButton: {
    backgroundColor: Colors.white,
    height: 28,
    width: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
