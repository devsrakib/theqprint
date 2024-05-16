import { Dimensions, StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

const DimensionsWidth = Dimensions.get('window').width;

export const AllCartStyle = StyleSheet.create({
  container: {
    // width: '48%',
    width: DimensionsWidth / 2.3,
    paddingBottom: 10,
    backgroundColor: Color.C_white,
    borderRadius: 10,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginVertical: 10,
  },
  discountCon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.10)',
  },
  discountText: {
    fontSize: 10,
    color: Color.C_red,
  },
  imgCon: {
    width: '90%',
    height: 110,
    alignSelf: 'center',
    // padding: 10,
  },
  contentContainerStyle: {
    // width: '90%',
    // flex: 1,
    // height: 90,
    // marginHorizontal: 10,
    // flexDirection: 'row',
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  productImgCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 20,
    backgroundColor: 'red',
  },
  productImg: {
    // aspectRatio: 2,
    width: 120,
    alignSelf: 'center',
    height: '100%',
  },

  descCon: {
    marginHorizontal: 20,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.80)',
    fontSize: Font.Font_L,
    marginBottom: 5,
  },
  startRating: {
    fontSize: Font.Font_S,
    marginBottom: 5,
  },
  rating: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.5)',
  },
  priceCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: Font.Font_L,
    fontWeight: '700',
    color: Color.C_main,
    marginRight: 10,
  },
  currency: {
    fontSize: Font.Font_STen,
    fontWeight: '700',
    color: Color.C_main,
  },
  discountedPrice: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },

  paginationCon: {
    // position: "absolute",
    // bottom: 80,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 10,
    marginTop: 5,
  },
  paginationDot: {
    height: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
