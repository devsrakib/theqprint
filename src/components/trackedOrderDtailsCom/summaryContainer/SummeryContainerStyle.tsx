import { StyleSheet } from "react-native";
import { Color, Font, shadows } from "../../../constants/GlobalStyle";

export const summerContainerStyle = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 12,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    backgroundColor: Color.C_white,
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_L,
    fontWeight: "500",
    marginBottom: 20,
  },
  infoCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  leftText: {
    fontSize: Font.Font_L,
    color: "rgba(0,0,0,0.7)",
  },
  smallText: {
    color: "rgba(0,0,0,0.4)",
    fontSize: Font.Font_S,
  },
  price: {
    fontSize: Font.Font_M,
    color: "rgba(0,0,0,0.8)",
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: Font.Font_L,
    color: Color.C_main,
    fontWeight: "700",
  },
});
