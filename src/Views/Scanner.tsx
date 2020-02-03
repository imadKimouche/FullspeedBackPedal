import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import PermissionModal from '../Components/Scanner/PermissionModal';

interface IProps {}
interface IState {
  isCameraAvailable: boolean;
}

export default class Glossary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this._closeModal = this._closeModal.bind(this);

    this.state = {
      isCameraAvailable: true,
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

  render() {
    return (
      <View>
        <PermissionModal
          isVisible={!this.state.isCameraAvailable}
          closeModal={this._closeModal}
        />
        {this.state.isCameraAvailable && (
          <View>
            <Text>Scanner</Text>
          </View>
        )}
      </View>
    );
  }
}
