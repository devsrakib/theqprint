import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const notificationItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:Color.C_white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 1,
    width: '100%',
    height: 120,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.C_border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  specCon: {
    flex: 1,
  },
  title: {
    fontSize: Font.Font_M,
    fontWeight: '500',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: Font.Font_S,
    color: Color.C_H_black,
    marginBottom: 5,
  },
  currencyAndDayCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  currency: {
    fontSize: Font.Font_M,
    fontWeight: '600',
    color: Color.C_main,
  },
  days: {
    color: '#7D7878',
    fontSize: Font.Font_S,
  },
});
