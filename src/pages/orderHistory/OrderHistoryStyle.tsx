import { StyleSheet } from "react-native";
import { Color } from "../../constants/GlobalStyle";

export const orderHistoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  bodyContainer: {
    flex: 1,
    paddingTop: 20,
  },
  navCon: {
    height: 30,
    paddingTop: 5,
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: Color.C_border,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  navItem: {
    height: "100%",
    paddingBottom: 5,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
});
