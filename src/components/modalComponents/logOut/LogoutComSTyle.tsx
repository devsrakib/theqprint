import { Platform, StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const logoutComStyle = StyleSheet.create({
  container: {
    height: 310,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
  },
  qText: {
    fontSize: Font.Font_X,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    height: Platform.OS === 'ios' ? 50 : 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Font.Font_X,
  },
});
