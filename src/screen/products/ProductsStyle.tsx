import { Platform, StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const productsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 10,
  },
  navigationAndCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500',
    marginLeft: 10,
  },
  cartBag: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -5,
  },
  inputAndThreelineCon: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 15,
  },
  magnifyAndInputCon: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    flex: 1,
  },

  magnify: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // body section
  bodyContainer: {
    flex: 1,
    paddingTop: 15,
  },
});
