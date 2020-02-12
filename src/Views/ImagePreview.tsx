import React from 'react';
import {StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import Colors from '../Utils/Colors';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  loading: boolean;
  dataSource: any;
}

export default class ImagePreview extends React.Component<IProps, IState> {
  uri: string = '';
  API_URL: string = 'https://safe-anchorage-52970.herokuapp.com';

  constructor(props: IProps) {
    super(props);

    this.uri = this.props.navigation.state.params.uri;
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
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      });
  };

  _scanPicture = async () => {
    this.setState({loading: true});
    let RNFS = require('react-native-fs');
    const base64 = await RNFS.readFile(this.uri, 'base64');

    fetch(this.API_URL + '/api/predict', {
      method: 'POST',
      body: JSON.stringify({
        base64: base64,
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
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => this._scanPicture()}>
          <AnimatedIcon
            animation={this.state.loading ? 'tada' : ''}
            iterationDelay={100}
            iterationCount="infinite"
            name="md-bug"
            size={23}
            color={Colors.pink}
          />
        </TouchableOpacity>
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
    marginBottom: 10,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
