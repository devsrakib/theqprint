import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const allBrandStyle = StyleSheet.create({
  CartContainer: {
    flex: 0.5, // Make each item take half of the available width (for 2 columns)
    padding: 8,
    backgroundColor: Color.C_white,
    borderRadius: 12,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  cardActionLayer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 8,
  },
  brandName: {
    marginBottom: 20,
    fontSize: Font.Font_X,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: '600',
  },
  avilableProductText: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.6)',
  },
});
