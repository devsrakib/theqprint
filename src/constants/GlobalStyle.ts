import { Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

export const Font = {
  Font_STen: screenWidth <= 350 ? 7 : screenWidth <= 370 ? 8 : 10,
  Font_S: screenWidth <= 350 ? 8 : screenWidth <= 370 ? 10 : 12,
  Font_M: screenWidth <= 350 ? 10 : screenWidth <= 370 ? 12 : 14,
  Font_L: screenWidth <= 350 ? 12 : screenWidth <= 370 ? 14 : 16,
  Font_X: screenWidth <= 350 ? 14 : screenWidth <= 370 ? 16 : 18,
  Font_XL: screenWidth <= 350 ? 16 : screenWidth <= 370 ? 18 : 20,
  Font_XXL: screenWidth <= 350 ? 20 : screenWidth <= 370 ? 22 : 24,
  Font_XXXL: screenWidth <= 350 ? 22 : screenWidth <= 370 ? 24 : 26,
  Font_4XL: screenWidth <= 350 ? 24 : screenWidth <= 370 ? 26 : 28,
  Font_FXL: screenWidth <= 350 ? 26 : screenWidth <= 370 ? 28 : 30,
};

export const Color = {
  C_main: '#980442',
  C_second: '#FFE5E5',
  C_third: '',
  C_shadow: 'rgba(0,0,0,0.4)',
  C_white: '#ffffff',
  C_black: '#000000',
  C_red: '#ff0000',
  C_H_black: 'rgba(0,0,0,0.5)',
  C_border: 'rgba(0, 0, 0, 0.12)',
  C_black_eight: 'rgba(0,0,0,0.8)',
  C_green: '#169B00',
};

export const shadows = {
  shadow_color: 'rgba(0,0,0,0.4)',
  elevation_1: 10,
  elevation_2: 10,
  offsetWidth_1: 2,
  offsetHeight_1: 2,
  radius_1: 8,
  radius_2: 2,
  opacity_1: 0.2,
  opacity_2: 2,
};
