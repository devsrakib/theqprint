import { StyleSheet } from 'react-native';
import { Color, shadows } from '../../constants/GlobalStyle';

export const homePageStyle = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    paddingTop: 45,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: 'contain',
  },
  cart: {
    position: 'relative',
    width: 25,
    height: 30,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
