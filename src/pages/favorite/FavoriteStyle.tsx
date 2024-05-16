import { StyleSheet } from "react-native";
import { Color, Font } from "../../constants/GlobalStyle";

export const favoriteStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  bodyContainer: {
    flex: 1,
  },
  footerButton: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  footerButtonText: {
    fontSize: Font.Font_X,
    color: Color.C_main,
  },
});
