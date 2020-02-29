import {Dimensions, AsyncStorage} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_DEBUG = false;

const getAsyncItem = async (key: string): Promise<any | null> => {
  try {
    const item: string | null = await AsyncStorage.getItem(key);
    return item;
  } catch (error) {
    console.log('Utility::getAsyncItem ' + error);
  }
  return null;
};

const setAsyncItem = async (key: string, item: any) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log('Utility:setAsyncItem' + error);
  }
};

export {SCREEN_HEIGHT, SCREEN_WIDTH, IS_DEBUG, getAsyncItem, setAsyncItem};
