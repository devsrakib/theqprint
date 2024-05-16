import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const newPassStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  header: {
    height: 70,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gradientContainer: {
    width: '100%',
  },
  gradientImg: {
    width: '100%',
    position: 'absolute',
  },
  bodyCon: {
    paddingHorizontal: 20,
    marginTop: 60,
    paddingVertical: 20,
    width: '90%',
    backgroundColor: Color.C_white,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: Color.C_shadow,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowOpacity: shadows.opacity_1,
    shadowRadius: shadows.radius_1,
    elevation: shadows.elevation_1,
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_L,
    marginLeft: 10,
  },
  text1: {
    fontSize: Font.Font_X,
    fontWeight: '600',
    color: Color.C_main,
    marginBottom: 20,
    alignSelf: 'center',
  },
  text2: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 22,
    marginBottom: 50,
    textAlign: 'center',
  },
  labelAndInputCon: {
    marginBottom: 30,
  },
  label: {
    fontSize: Font.Font_X,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 10,
  },
  inputCon: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: Font.Font_L,
    flex: 1,
  },
  eye: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    width: '100%',
    marginBottom: 20,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorMessagesCon: {
    width: '90%',
    paddingHorizontal: 10,
  },
  errorMessage: {
    fontSize: Font.Font_M,
    color: Color.C_main,
  },
  buttonText: {
    fontSize: Font.Font_X,
    fontWeight: '600',
    color: Color.C_white,
  },
});
