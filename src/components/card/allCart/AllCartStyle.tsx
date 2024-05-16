import { StyleSheet } from "react-native";
import { Color } from "../../../constants/GlobalStyle";

export const allCartStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: Color.C_white,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
