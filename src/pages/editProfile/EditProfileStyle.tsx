import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const editProfileStyle = StyleSheet.create({
  userImgCon: {
    borderWidth: 1,
    borderColor: Color.C_white,
    borderRadius: 100,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 5,
    width: 26,
    height: 26,
    borderRadius: 12,
    backgroundColor: Color.C_white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCon: {
    flex: 1,
    backgroundColor: Color.C_white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 35,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
