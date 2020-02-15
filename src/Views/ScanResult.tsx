import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text, Image} from 'react-native-animatable';
import {NavigationScreenProp} from 'react-navigation';

import Colors from '../Utils/Colors';
import {Images} from '../Utils/Images';
import {SCREEN_WIDTH} from '../Utils/Utility';
import List from '../Components/List';
import BugIndicator from '../Components/BugIndicator';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IData {
  id: number;
  text: string;
}

interface IState {
  dataReady: boolean;
}

export default class ScanResult extends Component<IProps, IState> {
  insectId: number;
  predictionLabel: string;
  API_URL: string = 'https://safe-anchorage-52970.herokuapp.com';
  labels = [1, 2, 3, 4, 5, 0];
  symptoms: IData[] = [];
  treatments: IData[] = [];
  avoids: IData[] = [];

  constructor(props: IProps) {
    super(props);

    this.insectId = this.labels[
      this.props.navigation.state.params.response.insectId
    ];
    this.predictionLabel = this.props.navigation.state.params.response.predictionLabel;

    this.state = {
      dataReady: false,
    };
  }

  componentDidMount() {
    this.setState({dataReady: false});
    fetch(`${this.API_URL}/api/insectAll/${this.insectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => this._handleResponse(response));
  }

  _handleResponse = (response: Response) => {
    response.json().then(responseJson => {
      this.symptoms = this._normalizeData(responseJson.symptoms, 'symptom');
      this.treatments = this._normalizeData(
        responseJson.treatments,
        'treatment',
      );
      this.avoids = this._normalizeData(responseJson.avoids, 'avoid');
      this.setState({dataReady: true});
    });
  };

  _normalizeData(data: any[], type: string) {
    return data.map((item: {id: number; text: string}, index) => {
      return {id: index, text: item[type]};
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>It's a {this.predictionLabel} sting</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="center"
            source={Images[this.predictionLabel]}
          />
        </View>
        {this.state.dataReady && (
          <ScrollView style={styles.lists}>
            <List title="Symptoms" data={this.symptoms} />
            <List title="Treatments" data={this.treatments} />
            <List title="How to avoid" data={this.avoids} />
          </ScrollView>
        )}
        {!this.state.dataReady && <BugIndicator style={styles.icon} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 15,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    height: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.pink,
  },
  image: {
    width: SCREEN_WIDTH * 0.2,
  },
  lists: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '30%',
  },
});