import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  Animated,
} from 'react-native';
import {Text, Image} from 'react-native-animatable';
import {NavigationScreenProp} from 'react-navigation';

import Colors from '../Utils/Colors';
import {Images} from '../Utils/Images';
import {SCREEN_WIDTH} from '../Utils/Utility';
import InfoCard from '../Components/Preview/InfoCard';
import BugIndicator from '../Components/BugIndicator';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IData {
  id: number;
  text: string;
}

interface IState {
  dataReady: boolean;
  valueX: number;
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
    const grantResponder = this._grantResponder.bind(this);
    this._panResponder = PanResponder.create({
      onPanResponderGrant: grantResponder,
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
      valueX: 15,
    };
  }

  private _grantResponder = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ): void => {
    gestureState.dx = this.state.valueX;
  };

  private _handleResponderMove = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ): void => {
    let valueX;
    if (gestureState.dx > 15) {
      valueX = 15;
    } else if (gestureState.dx < -(SCREEN_WIDTH * 2)) {
      valueX = -(SCREEN_WIDTH * 2);
    } else {
      valueX = gestureState.dx;
    }
    this.setState({valueX});
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
            <InfoCard
              valueX={this.state.valueX}
              title="Symptoms"
              data={this.symptoms}
            />
            <InfoCard
              valueX={this.state.valueX + 335}
              title="Treatments"
              data={this.treatments}
            />
            <InfoCard
              valueX={this.state.valueX + 700}
              title="How to avoid"
              data={this.avoids}
            />
          </View>
        )}
        {!this.state.dataReady && <BugIndicator style={styles.icon} />}
        <View
          style={[
            styles.dot,
            {
              left: SCREEN_WIDTH / 2 - 15,
              backgroundColor:
                this.state.valueX > -300 ? Colors.pink : Colors.white,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              left: SCREEN_WIDTH / 2 - 5,
              backgroundColor:
                this.state.valueX < -300 && this.state.valueX > -600
                  ? Colors.pink
                  : Colors.white,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              left: SCREEN_WIDTH / 2 + 5,
              backgroundColor:
                this.state.valueX < -600 ? Colors.pink : Colors.white,
            },
          ]}
        />
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
  dot: {
    backgroundColor: Colors.white,
    height: 6,
    width: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.pink,
    position: 'absolute',
    bottom: 15,
  },
});
