import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const confirmOrderStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.C_white },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  orderPayment: {
    fontSize: Font.Font_XL,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  desc: {
    color: Color.C_H_black,
    fontSize: Font.Font_L,
    textAlign: 'center',
  },
  informationCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  amountTextAndother: {
    fontSize: Font.Font_L,
    color: Color.C_H_black,
    fontWeight: '500',
  },
  totalPriceAndother: {
    fontSize: Font.Font_L,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
  },
  viewOrderButton: {
    width: 120,
    height: 40,
    borderRadius: 8,
    borderColor: Color.C_main,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 50,
  },
  buttonText: {
    fontSize: Font.Font_M,
    color: Color.C_main,
  },
  buttonActionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  OkeyButtonText: {
    fontSize: Font.Font_X,
    color: Color.C_white,
    fontWeight: '500',
  },
  linearGradientStyle: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    height: 50,
    borderRadius: 25,
  },
});
