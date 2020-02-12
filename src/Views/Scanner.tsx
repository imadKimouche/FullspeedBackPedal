import React, {Component} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {RNCamera} from 'react-native-camera';
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
      isCameraAvailable: true,
      isTakingPicture: false,
    };
  }

  componentDidMount() {
    const cameraPermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    check(cameraPermission)
      .then((result: string) => {
        switch (result) {
          case RESULTS.DENIED:
            request(cameraPermission).then((res: string) => {
              if (res === RESULTS.GRANTED) {
                this.setState({isCameraAvailable: true});
              } else if (res === RESULTS.DENIED) {
                this.setState({isCameraAvailable: false});
              }
            });
            break;
          case RESULTS.GRANTED:
            this.setState({isCameraAvailable: true});
            break;
          case RESULTS.BLOCKED:
            this.setState({isCameraAvailable: false});
            break;
        }
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  _closeModal = () => {
    this.setState({isCameraAvailable: true});
  };

  _takePicture = async () => {
    if (this.camera) {
      this.setState({isTakingPicture: true});
      const options = {quality: 1};
      const data = await this.camera.takePictureAsync(options);
      return data.uri;
    } else {
      console.log('there was an error');
    }
  };

  _handleCapturedImage = (uri: string) => {
    this.setState({isTakingPicture: false});
    this.props.navigation.navigate('ImagePreview', {uri: uri});
  };

  _handleCaptureError = (error: string) => {
    console.log(error);
    this.setState({isTakingPicture: false});
    Alert.alert(
      'An Error Ocurred',
      'There was a problem with the camera. Could not take the picture',
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
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              captureAudio={false}>
              <ProgressCircle animating={this.state.isTakingPicture} />
              <TouchableOpacity
                style={styles.snapButton}
                onPress={() => {
                  this._takePicture()
                    .then(uri => this._handleCapturedImage(uri))
                    .catch(err => this._handleCaptureError(err));
                }}>
                <Icon name="md-camera" size={23} />
              </TouchableOpacity>
            </RNCamera>
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
    backgroundColor: Colors.black,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black,
  },
  preview: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },
  snapButton: {
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

export default withNavigationFocus(Scanner);
