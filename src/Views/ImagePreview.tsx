import React from 'react';
import {StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import ProgressCircle from '../Components/ProgressCircle';
import Colors from '../Utils/Colors';
import {SCREEN_HEIGHT} from '../Utils/Utility';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  loading: boolean;
  dataSource: any;
}

export default class ImagePreview extends React.Component<IProps, IState> {
  uri: string = '';
  base64: string = '';
  API_URL: string = 'https://safe-anchorage-52970.herokuapp.com';

  constructor(props: IProps) {
    super(props);

    this.uri = this.props.navigation.state.params.uri;
    this.base64 = this.props.navigation.state.params.base64;
    this.state = {
      loading: false,
      dataSource: {},
    };
  }

  _handleResponse = (response: Response) => {
    response
      .json()
      .then(responseJson => {
        this.setState({loading: false, dataSource: {responseJson}});
        this.props.navigation.navigate('ScanResult', {
          response: responseJson,
          base64: this.base64,
          timestamp: this.props.navigation.state.params.timestamp,
        });
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      });
  };

  _scanPicture = async () => {
    this.setState({loading: true});
    fetch(this.API_URL + '/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64: this.base64,
      }),
    }).then(response => this._handleResponse(response));
  };

  render() {
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

    return (
      <ImageBackground style={styles.container} source={{uri: this.uri}}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="md-arrow-back" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <ProgressCircle animating={this.state.loading} />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => this._scanPicture()}>
          <AnimatedIcon
            animation={this.state.loading ? 'tada' : ''}
            iterationDelay={100}
            iterationCount="infinite"
            name="md-bug"
            size={23}
            color={Colors.secondaryLight}
          />
        </TouchableOpacity>
        {this.state.loading && (
          <Animatable.Text
            style={styles.middleText}
            animation="pulse"
            iterationDelay={1000}
            iterationCount="infinite">
            Analyzing...
          </Animatable.Text>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  scanButton: {
    backgroundColor: '#fefffa',
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    color: Colors.white,
  },
});
