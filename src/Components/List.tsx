import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Colors from '../Utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface IData {
  id: number;
  text: string;
}

interface IProps {
  title: string;
  data: IData[];
}

const Item = (text: string) => {
  return (
    <View style={styles.line}>
      <Icon name="md-aperture" size={10} color={Colors.black} />
      <Text style={styles.lineText}> {text} </Text>
    </View>
  );
};

const List = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={props.data}
        keyExtractor={(item: IData) => item.id.toString()}
        renderItem={({item}: {item: IData}) => Item(item.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colors.pink,
    fontSize: 15,
    padding: 5,
  },
  list: {
    paddingLeft: 10,
  },
  line: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineText: {
    marginLeft: 5,
    paddingRight: 15,
  },
});

export default List;