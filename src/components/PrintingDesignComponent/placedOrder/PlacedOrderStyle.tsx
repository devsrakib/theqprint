import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const placedOrderStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.C_border,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    // height: 350,
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    marginLeft: 10,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 30,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Font.Font_L,
    color: Color.C_white,
    fontWeight: '500',
  },
  divider: {
    marginTop: 10,
  },

  totalOrderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  itemText: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    color: Color.C_H_black,
  },
  totalOrderItemPlusMinus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  minus: {
    marginRight: 15,
  },
  priceQuantity: { width: 40, alignItems: 'center' },
  plus: {
    marginLeft: 15,
  },
  totalPriceCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  totalPrice: {
    fontSize: Font.Font_L,
    fontWeight: '700',
    color: Color.C_black_eight,
  },
  price: {
    fontSize: Font.Font_XL,
    fontWeight: '700',
    color: Color.C_main,
  },
  currency: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    color: Color.C_main,
  },
  printingPrice: {
    fontSize: Font.Font_M,
    fontWeight: '600',
    color: Color.C_black_eight,
  },
});
