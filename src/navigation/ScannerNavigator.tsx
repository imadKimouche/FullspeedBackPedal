
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Glossary from '../Views/Glossary';
import Scanner from '../Views/Scanner';

const ScannerNavigatorContent = createStackNavigator({
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      header: () => null,
    },
  },
  ImagePreview: {
    screen: Glossary,
    navigationOptions: {
      header: () => null,
    },
  },
});

const ScannerNavigator = createAppContainer(ScannerNavigatorContent);

export default ScannerNavigator;