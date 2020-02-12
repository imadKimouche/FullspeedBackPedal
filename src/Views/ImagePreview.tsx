import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import Colors from '../Utils/Colors';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  scanButtonAnimation: boolean;
}

export default class ImagePreview extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      scanButtonAnimation: false,
    };
  }

  _scanPicture = () => {
    this.setState({scanButtonAnimation: true});
  };

  render() {
    const {uri} = this.props.navigation.state.params;
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

    return (
      <ImageBackground style={styles.container} source={{uri: uri}}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="md-arrow-back" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => this._scanPicture()}>
          <AnimatedIcon
            animation={this.state.scanButtonAnimation ? 'tada' : ''}
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
