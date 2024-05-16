import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const orderAndPrinterDesignStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    // paddingBottom: 50,
  },
  dummyTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  text_one: {
    fontSize: Font.Font_X,
    color: Color.C_main,
    marginVertical: 20,
    fontWeight: '700',
  },
  text_Two: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    textAlign: 'center',
    lineHeight: 20,
    width: '60%',
  },
});
