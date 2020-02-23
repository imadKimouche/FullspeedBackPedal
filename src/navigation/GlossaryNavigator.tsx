import React from 'react';
import {
  createStackNavigator,
  NavigationStackProp
} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Glossary from '../Views/Glossary';
import BugView from '../Views/BugView';
import {Text} from 'react-native-animatable';
import Colors from '../Utils/Colors';

const CustomHeader = ({navigation}: {navigation: NavigationStackProp}) => {
  const title = navigation.state.params?.info.name;
  return (
    <View style={styles.header}>
      <View style={styles.button}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon
            color={Colors.white}
            name="angle-left"
            type="font-awesome"
            size={30}
          />
        </TouchableWithoutFeedback>
      </View>
      <View>
        <Text style={styles.text}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </Text>
      </View>
    </View>
  );
};

const GlossaryNavigatorContent = createStackNavigator({
  Glossary: {
    screen: Glossary,
    navigationOptions: {
      header: () => null
    }
  },
  BugView: {
    screen: BugView,
    navigationOptions: ({navigation}) => ({
      header: () => <CustomHeader navigation={navigation} />
    })
  }
});

const GlossaryNavigator = createAppContainer(GlossaryNavigatorContent);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.secondaryLight,
    padding: 15,
    paddingBottom: 40,
    minHeight: 40,
    borderBottomColor: Colors.white,
    borderBottomWidth: 3,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  button: {
    width: 40,
    height: 40,
    marginLeft: 15
  },
  text: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 15
  }
});

export default GlossaryNavigator;
