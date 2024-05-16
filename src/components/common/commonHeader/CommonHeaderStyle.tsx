import { Platform, StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const commonHeaderStyle = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 110 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    paddingHorizontal: 20,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    backgroundColor: Color.C_white,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    // paddingLeft: 10,
  },
  backButton: {
    marginRight: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Font.Font_X,
    fontWeight: '600',
    marginLeft: 10,
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
  },
});
