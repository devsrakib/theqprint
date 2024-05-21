import { Dimensions, StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../constants/GlobalStyle';

const { width, height } = Dimensions.get('window');

export const myCartStyle = StyleSheet.create({
  arrowAndTitleCon: {
    height: 70,
    backgroundColor: Color.C_white,
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: Color.C_H_black,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: Font.Font_M,
    fontWeight: '600',
    marginLeft: 20,
  },
  totalPriceAndProgressCon: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Color.C_white,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    // overflow: "hidden",
    padding: 20,
    position: 'relative',
  },
  grandTotalCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  freeShippingText: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'center',
    marginTop: 10,
  },
  linearContainer: {
    width: '100%',
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 'auto',
  },
  proceedButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedText: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.C_white,
  },
  percentageValueCon: {
    position: 'absolute',
    right: -10,
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    top: -10,
    borderColor: Color.C_main,
    backgroundColor: Color.C_white,
  },
  congratsMessageCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  congratsText: {
    fontSize: Font.Font_M,
    color: Color.C_shadow,
    marginLeft: 10,
  },
  customProgressBG: {
    width: '100%',
    height: 5,
    borderRadius: 10,
    backgroundColor: Color.C_border,
  },

  // ==================================
  // lottie style
  // ==================================

  lottieConStyle: {
    position: 'absolute',
    top: 80,
  },
  lottieStyle: {
    width: width,
    height: width * 2,
    // zIndex: 100,
  },
});
