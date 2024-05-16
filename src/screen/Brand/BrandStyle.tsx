import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const brandStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  bodyContainer: {
    paddingTop: 30,
  },
  topBrandText: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.8)',
    marginLeft: 20,
  },
  allBrandContainer: {
    flex: 1,
    backgroundColor: Color.C_white,
    // paddingHorizontal: 20,
    marginTop: 20,
  },
  allBrandText: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.8)',
    marginLeft: 20,
    marginBottom: 20,
  },
  allCartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    flex: 1,
  },
});
