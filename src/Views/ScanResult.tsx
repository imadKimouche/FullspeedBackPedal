import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {Text, Image} from 'react-native-animatable';
import {NavigationScreenProp} from 'react-navigation';

import Colors from '../Utils/Colors';
import {Images} from '../Utils/Images';
import {SCREEN_WIDTH} from '../Utils/Utility';
import InfoCard from '../Components/Preview/InfoCard';
import BugIndicator from '../Components/BugIndicator';
import {API} from '../Utils/API';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootState} from '../store/rootReducer';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  token: string;
  userId: string;
}

interface IData {
  id: number;
  text: string;
}

interface IState {
  dataReady: boolean;
  valueX: number;
}
class ScanResult extends Component<IProps, IState> {
  insectId: number;
  predictionLabel: string;
  labels = [1, 2, 3, 4, 5, 0];
  symptoms: IData[] = [];
  treatments: IData[] = [];
  avoids: IData[] = [];
  base64: string = this.props.navigation.state.params.base64;
  timestamp: string = this.props.navigation.state.params.timestamp;

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
    this.predictionLabel = this.props.navigation.state.params.response.predictionLabel.replace(
      /\s/g,
      '',
    );

    this.state = {
      dataReady: false,
      valueX: 5,
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
    API.get(API.url_insectAll + this.insectId).then(response => {
      this._handleResponse(response);
    });
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

  _handleValidate = () => {
    API.post(
      API.url_addImage,
      {
        userId: this.props.userId,
        data: this.base64,
        timestamp: this.timestamp,
      },
      this.props.token,
    ).then(response => {
      if (response.status == 200) {
        this.props.navigation.navigate('Scanner');
      } else if (response.status == 400) {
        Alert.alert('Oops!', 'Picture could not be added');
      }
    });
  };

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
              valueX={this.state.valueX + 350}
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
                this.state.valueX > -300 ? Colors.secondaryLight : Colors.white,
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
                  ? Colors.secondaryLight
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
                this.state.valueX < -600 ? Colors.secondaryLight : Colors.white,
            },
          ]}
        />
        <TouchableOpacity
          style={styles.validateButton}
          onPress={() => {
            this._handleValidate();
          }}>
          <Icon name="md-checkmark" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = function(state: RootState) {
  return {
    token: state.userReducer.userInfo.token,
    userId: state.userReducer.userInfo.id,
  };
};

const ScanResultConnected = connect(mapStateToProps)(ScanResult);

export default ScanResultConnected;

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
    borderColor: Colors.secondaryLight,
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
    borderColor: Colors.secondaryLight,
    position: 'absolute',
    bottom: 15,
  },
  validateButton: {
    width: SCREEN_WIDTH * 0.14,
    height: SCREEN_WIDTH * 0.14,
    borderRadius: (SCREEN_WIDTH * 0.14) / 2,
    backgroundColor: Colors.secondaryLight,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
  },
});
