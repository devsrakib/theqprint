import { Dimensions, StyleSheet } from 'react-native';

import { Color, Font } from '../../constants/GlobalStyle';

const width = Dimensions.get('window').width;
export const sliderItemStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#EDE4DA',
    padding: 10,
    width: width - 20,
    height: 220,
    marginHorizontal: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },

  insideCon: {
    width: '50%',
    padding: 10,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: Font.Font_M,
    fontWeight: '500',
    color: Color.C_H_black,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: Font.Font_M,
    color: Color.C_main,
    fontWeight: '500',
  },
});
