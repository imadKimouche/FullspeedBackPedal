import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

import PermissionModal from '../Components/Scanner/PermissionModal';
import Colors from '../Utils/Colors';
import ProgressCircle from '../Components/ProgressCircle';

interface IProps {}
interface IState {
  isCameraAvailable: boolean;
  isTakingPicture: boolean;
}

export default class Scanner extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this._closeModal = this._closeModal.bind(this);
    this._takePicture = this._takePicture.bind(this);

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
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <PermissionModal
          isVisible={!this.state.isCameraAvailable}
          closeModal={this._closeModal}
        />
        {this.state.isCameraAvailable && (
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
                  this._takePicture().then(() =>
                    this.setState({isTakingPicture: false}),
                  );
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
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    backgroundColor: 'black',
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
