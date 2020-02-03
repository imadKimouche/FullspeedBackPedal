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

    this.state = {
      isCameraAvailable: false,
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
          case RESULTS.UNAVAILABLE:
            this.setState({isCameraAvailable: false});
            break;
          case RESULTS.DENIED:
            request(cameraPermission).then((res: string) => {
              if (res === RESULTS.GRANTED) {
                this.setState({isCameraAvailable: true});
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

  render() {
    return (
      <View>
        <PermissionModal isVisible={this.state.isCameraAvailable} />
        {this.state.isCameraAvailable && (
          <View>
            <Text>Scanner</Text>
          </View>
        )}
      </View>
    );
  }
}
