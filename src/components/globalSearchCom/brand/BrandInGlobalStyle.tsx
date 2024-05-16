import { StyleSheet } from 'react-native';
import { Color, shadows } from '../../../constants/GlobalStyle';

export const globalBrandStyle = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 50,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginLeft: 20,
    backgroundColor: Color.C_white,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
