import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {Text, Image} from 'react-native-animatable';
import {NavigationScreenProp} from 'react-navigation';

import Colors from '../Utils/Colors';
import {Images} from '../Utils/Images';
import {SCREEN_WIDTH} from '../Utils/Utility';
import InfoCard from '../Components/Preview/InfoCard';
import BugIndicator from '../Components/BugIndicator';

import SwipeHandler, {swipeDirections} from '../Utils/SwipeHandler';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IData {
  id: number;
  text: string;
}

interface IState {
  dataReady: boolean;
  dragValue: number;
}

export default class ScanResult extends Component<IProps, IState> {
  insectId: number;
  predictionLabel: string;
  API_URL: string = 'https://safe-anchorage-52970.herokuapp.com';
  labels = [1, 2, 3, 4, 5, 0];
  symptoms: IData[] = [];
  treatments: IData[] = [];
  avoids: IData[] = [];

  private _panResponder: PanResponderInstance;

  constructor(props: IProps) {
    super(props);

    const responderMove = this._handleResponderMove.bind(this);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: responderMove,
    });

    this.insectId = this.labels[
      this.props.navigation.state.params.response.insectId
    ];
    this.predictionLabel = this.props.navigation.state.params.response.predictionLabel;

    this.state = {
      dataReady: false,
      dragValue: 0,
    };
  }

  private _handleResponderMove = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ): void => {
    console.log('#####');
    console.log(gestureState.dx);
    this.setState({dragValue: gestureState.dx});
  };

  componentDidMount() {
    this.setState({dataReady: false});
    fetch(`${this.API_URL}/api/insectAll/${this.insectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => this._handleResponse(response));
  }

  _onSwipe(gestureName: swipeDirections): void {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        console.log('Swiping left');
        break;
      case SWIPE_RIGHT:
        console.log('Swiping right');
        break;
      default:
        break;
    }
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

  _normalizeData(data: {id: number; text: string}[], type: string) {
    return data.map((item: {id: number; text: string}, index: number) => {
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
          <View style={styles.lists} {...this._panResponder.panHandlers}>
            <InfoCard right={0} title="Symptoms" data={this.symptoms} />
            <InfoCard right={0} title="Treatments" data={this.treatments} />
            <InfoCard
              right={this.state.dragValue}
              title="How to avoid"
              data={this.avoids}
            />
          </View>
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
