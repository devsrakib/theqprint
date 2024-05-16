import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const customerContainerStyle = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 12,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    backgroundColor: Color.C_white,
    marginVertical: 12,
  },
  orderID: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    fontWeight: '500',
  },
  ID: {
    fontSize: Font.Font_L,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.7)',
  },
  deliveryDateAndCarCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  deliveryDate: {
    fontSize: Font.Font_M,
    color: '#12b76a',
    marginLeft: 10,
  },
  dividerStyle: {
    marginVertical: 15,
  },
  shipToText: {
    fontSize: Font.Font_M,
    fontWeight: '500',
    color: Color.C_H_black,
  },
  infoCon: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  imgCon: {
    width: 30,
    height: 30,
    // borderRadius: 50,
    // borderWidth: 1,
    // borderColor: Color.C_border,
    marginRight: 10,
  },
  name: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.8)',
  },
  infoText: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.6)',
    marginLeft: 10,
  },
  paidBy: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
  },
  cardText: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.7)',
    marginLeft: 10,
  },
});
