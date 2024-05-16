import { StyleSheet } from "react-native";
import { Color, Font } from "../../../../constants/GlobalStyle";

export const productCartStyle = StyleSheet.create({
  container: {
    borderBottomColor: Color.C_border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    // marginBottom: 20,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgCon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.C_border,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productNameAndSpec: {
    color: "rgba(0,0,0,0.7)",
    fontSize: Font.Font_M,
    marginBottom: 5,
  },
  currencyAndPriceCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: Font.Font_L,
    fontWeight: "700",
    color: Color.C_main,
  },
  currency: {
    fontSize: 10,
    fontWeight: "700",
  },
  verticalDivider: {
    fontSize: Font.Font_M,
    color: "rgba(0,0,0,0.3)",
    marginHorizontal: 10,
  },
});
