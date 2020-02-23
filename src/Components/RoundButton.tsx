import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  name: string;
  size: number;
  color: string;
  pressHandler: () => void;
}

const RoundButton: FC<IProps> = ({name, size, color, pressHandler}) => {
  const styles = (size: number) => {
    return {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: '#fefffa',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10
    };
  };

  return (
    <TouchableOpacity style={styles(size)} onPress={() => pressHandler()}>
      <Icon name={name} size={size * 0.45} color={color} />
    </TouchableOpacity>
  );
};

export default RoundButton;
