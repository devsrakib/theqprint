import { StyleSheet } from "react-native";
import { Color, Font, shadows } from "../../../constants/GlobalStyle";

export const cartStyle = StyleSheet.create({
  container: {
    width: 180,
    paddingBottom: 10,
    backgroundColor: Color.C_white,
    borderRadius: 10,
    marginLeft: 20,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginVertical: 25,
  },
  discountCon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255, 0, 0, 0.10)",
  },
  discountText: {
    fontSize: 10,
    color: Color.C_red,
  },
  imgCon: {
    width: "40%",
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  descCon: {
    marginHorizontal: 20,
  },
  title: {
    color: "rgba(0, 0, 0, 0.80)",
    fontSize: Font.Font_L,
    marginBottom: 5,
  },
  startRating: {
    fontSize: Font.Font_S,
    marginBottom: 5,
  },
  rating: {
    fontSize: Font.Font_S,
    color: "rgba(0,0,0,0.5)",
  },
  priceCon: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentPrice: {
    fontSize: Font.Font_L,
    fontWeight: "700",
    color: Color.C_main,
    marginRight: 10,
  },
  currency: {
    fontSize: Font.Font_STen,
    fontWeight: "700",
    color: Color.C_main,
  },
  discountedPrice: {
    fontSize: Font.Font_S,
    color: "rgba(0,0,0,0.4)",
    fontWeight: "500",
    textDecorationLine: "line-through",
  },
});
