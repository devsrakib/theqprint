import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const productReviewsStyle = StyleSheet.create({
  ratingAndReviewsCon: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  ratingAndReviewsText: {
    fontSize: Font.Font_M,
    fontWeight: '500',
  },
  reviewerCon: {
    marginTop: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    borderBottomColor: Color.C_border,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  reviewerImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Color.C_border,
  },
  reviewerNameAndDate: {},
  reviewerName: {
    fontWeight: '500',
    fontSize: Font.Font_M,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.6)',
  },
  seeReviewAndArrowCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  yourReviewCon: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  yourReviewText: {
    fontSize: Font.Font_XL,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '600',
  },
  nameTextInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.C_border,
    paddingLeft: 10,
    marginBottom: 15,
  },
  reviewTextInput: {
    // height: 40,
    paddingBottom: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.C_border,
    paddingLeft: 10,
    marginBottom: 15,
  },
});
