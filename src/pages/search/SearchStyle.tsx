import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Color.C_white,
  },
  dummyTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyOne: {
    color: Color.C_H_black,
    fontSize: Font.Font_X,
    width: '70%',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 25,
    fontWeight: '700',
  },
  dummyTwo: {
    fontSize: Font.Font_X,
    color: Color.C_H_black,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Color.C_border,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  AddToCartContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Color.C_border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  searchContainer: {
    backgroundColor: Color.C_white,
    borderRadius: 50,
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: Color.C_border,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 5,
  },
  // ========= body style ============
  bodyContainer: {
    paddingTop: 30,
    flex: 1,
  },
  brandText: {
    fontSize: Font.Font_X,
    color: 'rgba(0, 0, 0, 0.80)',
    fontWeight: '600',
    marginLeft: 20,
  },
  // BrandContainer: {
  //   width: "100%",
  //   alignItems: "center",
  // },
});
