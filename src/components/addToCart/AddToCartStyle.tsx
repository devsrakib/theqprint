import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../constants/GlobalStyle';

export const addToCartStyle = StyleSheet.create({
  cartContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    padding: 12,
    backgroundColor: Color.C_white,
    marginVertical: 10,
    width: '90%',
    shadowOffset: {
      width: shadows.offsetHeight_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
  },
  discountCon: {
    height: 30,
    width: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountParcent: {
    color: Color.C_main,
  },
  productDescAndOthers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  imgCon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.C_second,
    width: 90,
    height: 90,
    marginRight: 10,
  },
  img: { width: '100%', height: '100%' },
  currencyCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  close: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  titleCon: {
    flex: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.9)',
  },
  storeNameAndColorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  storeName: {
    fontSize: Font.Font_S,
    color: Color.C_H_black,
    fontWeight: '500',
    marginLeft: 10,
  },
  stick: {
    color: 'lightgray',
  },
  colorCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  priceAndCurrency: {
    fontSize: Font.Font_L,
    fontWeight: '700',
    color: Color.C_main,
    marginRight: 10,
  },
  plusAndMinus: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 25,
  },
  quantity: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.7)',
    marginHorizontal: 12,
  },
  divider: {
    marginTop: 10,
  },
  progressBarConStyle: {},
});
