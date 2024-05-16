import { Platform, StyleSheet } from "react-native";
import { Font } from "../../../constants/GlobalStyle";

export const ratingComStyle = StyleSheet.create({
    container:{
height: 380
    },
    logo:{
        width: 70,
        height: 70,
        alignSelf:'center'
    },
    text:{
        fontSize: Font.Font_X,
        fontWeight: '500',
        textAlign:'center',
        marginTop: 20,
        lineHeight: 30
      },
      ratingStarCon:{
        alignSelf:'center',
        marginTop: 20
      },
      buttonCon:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop: 50,
        gap: 20
      },
     button:{
        flex: 1,
        height: Platform.OS === 'ios' ? 50 : 45,
        borderRadius: 8,
        alignItems:"center",
        justifyContent:'center'
      },
      linearActionLayer:{
        width: '100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
      },
      cancel:{
        backgroundColor: '#DBDBDB'
      },
      buttonText:{
        fontSize: Font.Font_X,
        fontWeight: '600',
      }
})