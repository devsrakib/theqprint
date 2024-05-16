import { StyleSheet } from "react-native";
import { Color, Font, shadows } from "../../../constants/GlobalStyle";

export const productContainerStyle = StyleSheet.create({
  container: {
    backgroundColor: Color.C_white,
    borderRadius: 10,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    width: "90%",
    alignSelf: "center",
    padding: 12,
    marginVertical: 12,
  },
  quantityAndPriceCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  quantityText: {
    fontSize: Font.Font_L,
    color: "rgba(0,0,0,0.7)",
  },
  totalPrice: {
    color: "rgba(0,0,0,0.8)",
    fontSize: Font.Font_X,
    fontWeight: "700",
  },
  currency: {
    fontSize: 10,
    color: Color.C_H_black,
  },
});
