import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import PrintingTopTab from '../../routes/material_Tab/PrintingTopTab';
import { LinearGradient } from 'expo-linear-gradient';
import { Color, Font } from '../../constants/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

const PrintingOrderHistory = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1 }}>
      <CommonHeader title="Printing Request History" cartBox={true} />
      {/* all history tab */}
      <PrintingTopTab />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#C83B62', '#7F35CD']}
        style={styles.button}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderAndPrinterDesignPage')}
          style={styles.actionLayer}
        >
          <Text style={styles.buttonText}>Request For Printing</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default PrintingOrderHistory;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    borderRadius: 25,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Font.Font_X,
    color: Color.C_white,
  },
});
