import { StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';

export const otpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    // justifyContent: "center",
    // alignItems: 'center',
  },
  logoContainer: {
    // width: "60%",
    // alignSelf: "center",
    marginBottom: 50,
    marginTop: 70,
  },
  otpLogo: {
    width: 150,
    height: 200,
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text1: {
    fontSize: Font.Font_X,
    fontWeight: '600',
    marginBottom: 10,
  },
  text2: {
    lineHeight: 22,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    fontSize: Font.Font_L,
    marginBottom: 10,
  },
  email: {
    color: Color.C_main,
    fontSize: Font.Font_L,
  },
  otpInputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '65%',
    alignSelf: 'center',
    marginTop: 30,
    height: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    // backgroundColor: "green",
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    width: 90,
    height: 40,
    borderRadius: 20,
    borderColor: Color.C_border,
    borderWidth: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  verifyButton: {
    height: 50,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 120,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Font.Font_X,
    fontWeight: '600',
    color: Color.C_white,
  },
});
