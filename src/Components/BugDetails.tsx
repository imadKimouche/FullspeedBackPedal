import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../Utils/Colors';
import {SCREEN_WIDTH} from '../Utils/Utility';
import * as Animatable from 'react-native-animatable';

interface IData {
  id: number;
  text: string;
}

interface IProps {
  title: string;
  index: number;
  animation: string;
  list: IData[];
}

const BugDetails = ({title, index, list, animation}: IProps) => {
  return (
    <View>
      <Animatable.View
        delay={index * 200}
        animation={animation}
        duration={2000}>
        <View style={styles.container}>
          <Text style={styles.title}>{title} :</Text>
          <View style={styles.content}>
            {list &&
              list.map((element: IData) => (
                <View key={element.id} style={styles.line}>
                  <View style={styles.icon}>
                    <Icon
                      color={Colors.primary}
                      name="bug"
                      type="font-awesome"
                      size={12}
                    />
                  </View>
                  <Text style={{textAlign: 'justify'}}> {element.text} </Text>
                </View>
              ))}
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default BugDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondaryText,
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: Colors.secondaryText,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  content: {
    flex: 1,
    alignItems: 'flex-start'
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH * 0.87
  },
  icon: {
    margin: 3
  }
});
