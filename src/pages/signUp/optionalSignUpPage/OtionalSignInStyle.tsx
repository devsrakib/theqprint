import { StyleSheet } from "react-native";
import { Color, Font } from "../../../constants/GlobalStyle";

export const optionalSignInStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  gradientImgCon: {
    width: "100%",
  },
  gradientImg: {
    width: "100%",
    position: "absolute",
  },
  logoContainer: {
    marginTop: 120,
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: Color.C_white,
    borderRadius: 15,
    shadowColor: Color.C_shadow,
    elevation: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: "90%",
    alignSelf: "center",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  inputAndLabeCon: {
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_XL,
    fontWeight: "600",
    color: Color.C_main,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: Font.Font_X,
    color: Color.C_H_black,
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.C_border,
    paddingHorizontal: 10,
    fontSize: Font.Font_L,
  },
  continue: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  actionLayer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: Font.Font_X,
    fontWeight: "600",
    color: Color.C_white,
  },
  skipButton: {
    height: 30,
    marginTop: 20,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
