import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Scanner from '../Views/Scanner';
import ImagePreview from '../Views/ImagePreview';
import ScanResult from '../Views/ScanResult';

const ScannerNavigatorContent = createStackNavigator({
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      header: () => null,
    },
  },
  ImagePreview: {
    screen: ImagePreview,
    navigationOptions: {
      header: () => null,
    },
  },
  ScanResult: {
    screen: ScanResult,
    navigationOptions: {
      header: () => null,
    },
  },
});

const ScannerNavigator = createAppContainer(ScannerNavigatorContent);

export default ScannerNavigator;
