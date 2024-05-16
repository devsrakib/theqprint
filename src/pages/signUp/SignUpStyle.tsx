import { Dimensions, StyleSheet } from 'react-native';
import { Color, Font } from '../../constants/GlobalStyle';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SignUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  gradientImgCon: {
    width: '100%',
  },
  gradientImg: {
    width: '100%',
    position: 'absolute',
  },

  inputContainer: {
    backgroundColor: Color.C_white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: Color.C_shadow,
    elevation: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingVertical: SCREEN_HEIGHT <= 700 ? 15 : 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT <= 800 ? 30 : 60,
    marginBottom: 50,
  },
  signUpText: {
    fontSize: Font.Font_XXXL,
    color: Color.C_main,
    marginBottom: SCREEN_HEIGHT <= 700 ? 15 : 30,
  },
  inputAndTextCon: {
    marginBottom: 20,
    width: '90%',
  },
  label: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    marginBottom: 10,
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 8,
  },
  passwordInputCon: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 6,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  passwordInput: {
    fontSize: Font.Font_M,
    flex: 1,
  },
  eye: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    height: 50,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: SCREEN_HEIGHT <= 700 ? 20 : 30,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Font.Font_X,
    color: Color.C_white,
    fontWeight: '600',
  },
});
