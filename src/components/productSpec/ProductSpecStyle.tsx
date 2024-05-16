import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const productSpecStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  specBox: {
    backgroundColor: Color.C_white,
    justifyContent: 'center',
    paddingLeft: 10,
    height: 40,
    marginBottom: 10,
    // borderBottomColor: 'rgba(0,0,0,0.2)',
    // borderBottomWidth: 1,
    paddingBottom: 10,
  },
  specTitle: {
    fontSize: Font.Font_X,
    color: Color.C_black,
    fontWeight: '700',
    opacity: 0.5,
  },
  specDescTitle: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    marginVertical: 5,
  },
  specDestText: {
    fontSize: Font.Font_M,
    color: Color.C_black_eight,
  },
});
