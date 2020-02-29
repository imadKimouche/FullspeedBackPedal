import React, {Component} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import {Camera} from 'expo-camera';

import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigationFocus, NavigationScreenProp} from 'react-navigation';

import PermissionModal from '../Components/Scanner/PermissionModal';
import Colors from '../Utils/Colors';
import ProgressCircle from '../Components/ProgressCircle';

interface IProps {
  isFocused: boolean;
  navigation: NavigationScreenProp<any, any>;
}
interface IState {
  isCameraAvailable: boolean;
  isTakingPicture: boolean;
}

interface IResult {
  uri: string;
  base64: string;
}

class Scanner extends Component<IProps, IState> {
  private camera: any;

  constructor(props: IProps) {
    super(props);
    this._closeModal = this._closeModal.bind(this);
    this._takePicture = this._takePicture.bind(this);
    this._handleCapturedImage = this._handleCapturedImage.bind(this);
    this._handleCaptureError = this._handleCaptureError.bind(this);
    this.camera = null;

    this.state = {
      isCameraAvailable: false,
      isTakingPicture: false
    };
  }

  async componentDidMount() {
    const {status} = await Camera.requestPermissionsAsync();
    this.setState({isCameraAvailable: status === 'granted'});
  }

  _closeModal = () => {
    this.setState({isCameraAvailable: true});
  };

  _takePicture = async (): Promise<IResult> => {
    if (this.camera) {
      this.setState({isTakingPicture: true});
      const options = {quality: 0.1, base64: true};
      const data = await this.camera.takePictureAsync(options);
      return {uri: data.uri, base64: data.base64};
    } else {
      console.log('there was an error');
      return {uri: '', base64: ''};
    }
  };

  _handleCapturedImage = (uri: string, base64: string) => {
    this.setState({isTakingPicture: false});
    const timestamp = new Date();
    this.props.navigation.navigate('ImagePreview', {
      uri: uri,
      base64: base64,
      timestamp
    });
  };

  _handleCaptureError = (error: string) => {
    console.log(error);
    this.setState({isTakingPicture: false});
    Alert.alert(
      'An Error Ocurred',
      'There was a problem with the camera. Could not take the picture'
    );
  };

  render() {
    const {isFocused} = this.props;

    return (
      <View style={styles.container}>
        <PermissionModal
          isVisible={!this.state.isCameraAvailable}
          closeModal={this._closeModal}
        />
        {this.state.isCameraAvailable && isFocused && (
          <View style={styles.cameraContainer}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}>
              <ProgressCircle animating={this.state.isTakingPicture} />
            </Camera>
            <TouchableOpacity
              style={styles.snapButton}
              onPress={() => {
                this._takePicture()
                  .then((res: IResult) =>
                    this._handleCapturedImage(res.uri, res.base64)
                  )
                  .catch(err => this._handleCaptureError(err));
              }}>
              <Icon name="md-camera" size={23} color={Colors.secondaryLight} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black
  },
  preview: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center'
  },
  snapButton: {
    backgroundColor: '#fefffa',
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export default withNavigationFocus(Scanner);
