import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const brandDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  brandSpecCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  brandLogoAndNameCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCon: {
    borderWidth: 1,
    borderRadius: 8,
    width: 80,
    height: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.C_border,
    marginRight: 20,
  },
  brandImages: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  brandName: {
    fontSize: Font.Font_X,
    fontWeight: '700',
    marginBottom: 20,
  },
  availableText: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.6)',
  },
  favCon: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
