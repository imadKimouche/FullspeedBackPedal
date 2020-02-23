import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';

interface IData {
  id: number;
  text: string;
}

interface IProps {
  title: string;
  index: number;
  animation?: string;
  duration?: number;
  list: IData[];
}

const BugDetails = (props: IProps) => {
  const { title, list } = props;
  return (
      <Animatable.View animation="bounceInRight" duration={2000} style={styles.container}>
        <View style={styles.title}>
          <Text>
            {title}
          </Text>
        </View>
        <View style={styles.content} >
          {list && list.map((element: IData)=>(
          <View key={element.id}>
            <Text>
              {element.text}
            </Text>
          </View>
          ))}
        </View>
      </Animatable.View>
  );
};

export default BugDetails;

const styles = StyleSheet.create({
  container: {
      height: 200,
      marginHorizontal: 10,
      marginTop: 10,
      backgroundColor: Colors.secondary,
      borderWidth: 1,
      borderColor: Colors.secondaryText,
      borderRadius: 5,
      alignItems: 'center',
  },
  title: {
    fontFamily: 'regular',
    fontSize: 15,
    marginLeft: 10,
    color: Colors.secondaryText,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});