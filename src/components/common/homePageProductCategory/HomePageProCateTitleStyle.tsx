import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const homePageCateTitleStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    // marginHorizontal: 20,
    alignSelf: 'center',
  },
  title: { fontSize: Font.Font_X, fontWeight: '500' },
  subTitle: { fontSize: 14, color: Color.C_H_black },
});
