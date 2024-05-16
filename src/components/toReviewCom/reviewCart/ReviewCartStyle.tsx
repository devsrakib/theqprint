import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const reviewCartStyle = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
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
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  processDate: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.6)',
  },
  dividerStyle: {
    marginVertical: 10,
  },
  imgCon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.C_border,
    marginRight: 10,
  },
  imgAndTitleCon: {
    flexDirection: 'row',
  },
  titleAndStoreCon: {
    flex: 1,
  },
  title: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: Font.Font_M,
  },
  brandAndReviewCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  brandAndBrandNameCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandCon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderColor: Color.C_border,
    borderWidth: 1,
    marginRight: 10,
  },
  linearButton: {
    height: 30,
    borderRadius: 5,
  },
  buttonActionLayer: {
    paddingHorizontal: 12,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Color.C_white,
    fontSize: Font.Font_S,
    fontWeight: '500',
  },
  modalContainer: {
    backgroundColor: Color.C_white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
  },
  modalIndicator: {
    height: 5,
    width: 60,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  questionText: {
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.8)',
  },
  ratingCon: {
    alignSelf: 'center',
  },
  dummyText: {
    textAlign: 'center',
    // alignSelf:
    marginVertical: 50,
    fontSize: Font.Font_XL,
    fontWeight: '600',
  },
  textInputCon: {
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.C_border,
    width: '100%',
    padding: 12,
    textAlignVertical: 'top',
  },
  textQuantity: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-end',
    // marginRight: 20,
    marginTop: 10,
  },
  modalLinear: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  linearActionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalButtonText: {
    fontSize: Font.Font_X,
    fontWeight: '500',
    color: Color.C_white,
  },
});
