import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

import Colors from '../Utils/Colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../Utils/Utility';
import {Images} from '../Utils/Images';
import {Text} from 'react-native-animatable';

interface IProps {
  isVisible: boolean;
  setProfilePicture: (picture: any) => void;
  closeModal: () => void;
}

const dataPictures = [0, 1, 2];
const pictures = [Images.poro_1, Images.poro_2, Images.poro_3];

const ProfilePicturesModal = (props: IProps) => {
  const RoundPicture = (id: string) => {
    const picture = pictures[parseInt(id, 10)];
    return (
      <TouchableOpacity
        style={styles.profilePicture}
        onPress={() => props.setProfilePicture(picture)}>
        <Image style={styles.image} resizeMode="center" source={picture} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={props.isVisible} animationIn="zoomIn">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            props.closeModal();
          }}>
          <Text style={{color: 'grey'}}>x</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select a picture</Text>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          data={dataPictures}
          keyExtractor={(item: number) => item.toString()}
          renderItem={({item}) => RoundPicture(item.toString())}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: SCREEN_WIDTH * 0.8,
    minHeight: SCREEN_HEIGHT * 0.3,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  profilePicture: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  image: {
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_WIDTH * 0.22,
    borderRadius: Math.round(SCREEN_WIDTH * 0.22) / 2,
    alignSelf: 'center'
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15
  }
});

export default ProfilePicturesModal;
