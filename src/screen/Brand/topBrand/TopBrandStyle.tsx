import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const topBrandStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
    marginLeft: 15,
  },
  logoCon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: Color.C_white,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 25,
  },
  brandName: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.7)',
  },
});
