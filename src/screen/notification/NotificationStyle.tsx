import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const notificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  bodyContainer: {
    flex: 1,
  },
  dayText: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    marginLeft: 20,
    marginBottom: 20,
  },
});
