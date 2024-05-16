import { StyleSheet } from "react-native";
import { Color, Font, shadows } from "../../constants/GlobalStyle";

export const searchPageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingTop: 30,
  },
  searchContainer: {
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    backgroundColor: Color.C_white,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: Font.Font_L,
  },
});
