import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {API, InsectType} from '../Utils/API';
import BugsCard from '../Components/BugsCard';
import Colors from '../Utils/Colors';
import * as Animatable from 'react-native-animatable';

interface IState {
  isLoading: boolean;
  insectList: InsectType[];
}

export default class Glossary extends PureComponent<null, IState> {
  state: IState = {
    isLoading: true,
    insectList: [],
  };

  componentDidMount() {
    this._requestInsects();
  }

  _requestInsects = () => {
    API.get(`${API.url_insects}`)
      .then((response: Response) => {
        this.setState({isLoading: false});
        return this._apiResponse(response);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
        return err;
      });
  };

  _apiResponse = (response: Response) => {
    response.json().then((responseJSON: InsectType[]) => {
      this.setState({insectList: responseJSON});
    });
  };

  renderListCards() {
    const {insectList} = this.state;
    return insectList.map((insect: InsectType, index: number) => {
      return (
        <BugsCard
          picture={insect.picture}
          title={insect.name}
          index={index}
          onClick={this.onInsectClick}
        />
      );
    });
  }

  onInsectClick = (index: number) => {
    console.log('Click on' + index);
  };

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="bounceIn"
          duration={600}
          style={styles.headerContainer}>
          <Icon
            color={Colors.primaryText}
            name="bug"
            type="font-awesome"
            size={62}
          />
          <Text style={styles.heading}>Insectes</Text>
        </Animatable.View>
        <ScrollView pagingEnabled decelerationRate={0.993}>
          {this.renderListCards()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: Colors.secondaryLight,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.black,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});
