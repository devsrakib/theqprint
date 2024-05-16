import { StyleSheet } from "react-native";
import { Color, Font } from "../../../constants/GlobalStyle";

export const customOrderConfirmationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
  },
  logoCon: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 40,
  },
  thanksText: {
    fontSize: Font.Font_X,
    fontWeight: "500",
    marginTop: 15,
  },
  dummyText1: {
    fontSize: Font.Font_X,
    fontWeight: "600",
    marginTop: 30,
  },
  dummyText2: {
    fontSize: Font.Font_M,
    color: "#5F6C72",
    textAlign: "center",
    width: "75%",
    alignSelf: "center",
    marginTop: 20,
  },
  socialButtonCon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 40,
  },
  socialButton: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  buttonText: {
    color: Color.C_white,
    fontSize: Font.Font_L,
    marginLeft: 10,
  },
  orderDetailsText: {
    fontSize: Font.Font_L,
    fontWeight: "500",
    marginTop: 25,
    marginLeft: 20,
  },
  orderCodeAndDateCon: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  itemCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  Text: {
    fontSize: Font.Font_L,
    color: Color.C_H_black,
  },
  buttonCont: {
    width: "100%",
    alignItems: "center",
  },
  viewButton: {
    width: 130,
    borderRadius: 5,
    height: 40,
    borderColor: Color.C_main,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  viewButtonText: {
    fontSize: Font.Font_L,
    color: Color.C_main,
    fontWeight: "500",
  },
  linearButton: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    marginBottom: 40,
  },
  actionLayer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  linearButtonText: {
    fontSize: Font.Font_X,
    fontWeight: "500",
    color: Color.C_white,
  },
});
