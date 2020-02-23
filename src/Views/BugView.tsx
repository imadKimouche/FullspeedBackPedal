import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Images } from '../Utils/Images';
import { IData } from '../Utils/API';
import BugDetails from '../Components/BugDetails';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';
import { withNavigationFocus, NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

interface BugInfo {
  id: number;
  name: string;
  picture: string;
  symptoms: IData[];
  treatments: IData[];
  avoids: IData[];
}

interface IProps {
  isFocused: boolean;
  navigation: NavigationScreenProp<any, any>;
}

const BugView = (props : IProps) => {
  let info : BugInfo = props.navigation.state.params.info;
  return (
      <ScrollView style={styles.container}>
          <Animatable.View
            animation="fadeInDown" 
            style={styles.headerContainer}>
            <ImageBackground
              imageStyle={{ bottom: 400}}
              source={Images[info.name.replace(/\s/g,'',)]}
              style={styles.headingImage} >
              <Text style={styles.heading}>{info.name.charAt(0).toUpperCase() + info.name.slice(1)}</Text>
            </ImageBackground>
          </Animatable.View>
        <View style={styles.content}>
          <BugDetails title="Symptoms" list={info.symptoms} index={0} animation="bounceInRight"/>
          <BugDetails title="Treatments" list={info.treatments} index={1} animation="bounceInRight"/>
          <BugDetails title="How to avoid" list={info.avoids} index={2} animation="bounceInRight"/>
        </View>
      </ScrollView>);
}

export default withNavigationFocus(BugView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryLight,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.black,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 37,
    fontWeight: 'bold',
  },
  headingImage: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  },
});
