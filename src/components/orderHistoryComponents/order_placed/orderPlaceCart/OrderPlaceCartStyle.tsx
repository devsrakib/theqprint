import { StyleSheet } from "react-native";
import { Color, Font, shadows } from "../../../../constants/GlobalStyle";

export const orderPlaceCartStyle = StyleSheet.create({
  container: {
    // height: 200,
    width: "90%",
    alignSelf: "center",
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    backgroundColor: Color.C_white,
    marginVertical: 15,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  topSectionCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderID: {
    fontSize: Font.Font_S,
    fontWeight: "500",
    marginBottom: 5,
  },
  date: {
    fontSize: Font.Font_S,
    color: "rgba(0,0,0,0.6)",
    marginTop: 5,
  },
  orderPlacedButton: {
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  orderButtonText: {
    fontSize: 10,
    color: "rgba(0,0,0,0.8)",
  },
  // middle section
  middleSectionCon: {
    flexDirection: "row",
    marginVertical: 15,
  },
  imgCon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: Color.C_border,
    borderWidth: 1,
    marginRight: 10,
  },
  textCon: {
    flex: 1,
  },
  title: {
    color: "rgba(0,0,0,0.70)",
  },
  crrencyCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: Font.Font_L,
    fontWeight: "600",
    color: Color.C_main,
  },
  currency: {
    fontSize: Font.Font_S,
  },
  verticalDivider: {
    fontSize: 14,
    color: "rgba(0,0,0,0.2)",
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: Font.Font_S,
    color: "rgba(0,0,0,0.8)",
    fontWeight: "500",
  },
  lastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  itemAndTotalText: {
    fontSize: Font.Font_M,
    color: "rgba(0,0,0,0.7)",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0,0,0,0.8)",
  },
  totalPriceQRA: {
    fontSize: 10,
    color: "rgba(0,0,0,0.6)",
  },
  trackButtonLinear: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  trackButtonActionLayer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  trackButtonText: {
    fontSize: Font.Font_M,
    color: Color.C_white,
    fontWeight: "500",
  },
});
