import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const paperSizeStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 10,
    paddingVertical: 20,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_X,
    color: 'rgba(0,0,0,0.8)',
    alignSelf: 'center',
  },
  paperSizeCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sizeBox1: {
    borderWidth: 1,
    borderRadius: 5,
    // flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: Font.Font_L,
    color: Color.C_H_black,
  },
  customOrderText: {
    fontSize: Font.Font_X,
    color: Color.C_black_eight,
    marginVertical: 20,
  },
  customOrderInputCon: {
    marginTop: 20,
  },
  customHeightWidthCon: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: Font.Font_L,
  },
  inputCon: {
    height: 40,
    borderColor: 'rgba(127, 53, 205, 0.10)',
    shadowColor: 'rgba(127, 53, 205, 0.10)',
    elevation: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 12,
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.C_white,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: Font.Font_L,
    color: Color.C_H_black,
  },
});
