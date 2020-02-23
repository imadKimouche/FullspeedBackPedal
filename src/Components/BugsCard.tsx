import React from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  picture: string;
  title: string;
  index: number;
  animation: string;
  duration?: number;
  onClick: (name: string) => void;
}

const BugsCard = ({
  picture,
  title,
  index,
  onClick,
  animation,
  duration = 2000
}: IProps) => {
  return (
    <TouchableOpacity
      key={title}
      onPress={() => {
        onClick(title);
      }}>
      <Animatable.View
        key={title}
        delay={index * 200}
        animation={animation}
        duration={duration}
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
    </TouchableOpacity>
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.black
  },
  leftPart: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPartButton: {
    backgroundColor: Colors.white,
    height: 28,
    width: 28,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  }
});
