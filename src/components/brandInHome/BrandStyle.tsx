import { StyleSheet } from 'react-native';
import { Color, shadows } from '../../constants/GlobalStyle';

export const brandStyle = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Color.C_white,
    marginLeft: 20,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
