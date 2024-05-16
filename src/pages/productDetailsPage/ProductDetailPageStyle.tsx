import { StyleSheet } from "react-native";
import { Color } from "../../constants/GlobalStyle";

export const productDetailPageStyle = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor:Color.C_white,
        backgroundColor: '#FFF5F9'
    },
    topSection:{
height: 330,
    },
    backArrowAndFavCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        alignItems:'center',
        height: 50,
// position:'absolute', top: 0,
width: '100%',
    },
    backArrowFAV:{
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Color.C_border,
        alignItems:'center',
        justifyContent:'center',
    },
    imgCon:{
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        width: '80%',
        height: 250
    },
    bodyContainer:{
       flex: 1,
        backgroundColor:'red',
        borderTopLeftRadius: 20,
        borderTopRightRadius:50
    }
})