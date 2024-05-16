import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const contactUsStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    // paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: Color.C_white,
  },
  title: {
    fontSize: Font.Font_X,
    fontWeight: '700',
    marginBottom: 20,
  },
  subText: {
    textAlign: 'center',
    color: 'rgba(95, 108, 114, 1)',
    fontSize: Font.Font_M,
    lineHeight: 20,
    width: '90%',
  },
  buttons: {
    width: '90%',
    alignSelf: 'center',
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    // marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonTexts: {
    fontSize: Font.Font_M,
    color: Color.C_white,
    marginLeft: 10,
  },
});
