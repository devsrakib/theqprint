import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, ToastAndroid } from 'react-native';

import { placedOrderStyle } from './PlacedOrderStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Color, Font } from '../../../constants/GlobalStyle';
const TotalOrderComponent = ({
  printQuantity,
  setPrintQuantity,
  jsonData,
}: {
  printQuantity: number;
  setPrintQuantity: Function;
  jsonData: any;
}) => {
  const navigation: any = useNavigation();
  const sourcePage = 'CustomPrinting';
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  // const submitAndroute = () => {
  //   handleSubmit();
  // };

  const increaseQuantity = () => {
    setPrintQuantity((printQuantity += 1));
  };

  const decreaseQuantity = () => {
    if (printQuantity > 1) {
      setPrintQuantity((printQuantity -= 1));
    }
  };

  useEffect(() => {
    if (
      jsonData?.paperSize?.height === 0 ||
      jsonData?.paperSize?.width === 0 ||
      !jsonData?.printingRequestFile ||
      !jsonData?.paperTypeId ||
      !jsonData?.printingColorMode ||
      !jsonData?.singlePrice ||
      !jsonData?.totalPrice
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [jsonData]);

  return (
    <View style={placedOrderStyle.container}>
      {/* <Text>
        You are placing a custom order, So After placing an order, our one of
        agent will contact you soon.
      </Text> */}
      <Text style={placedOrderStyle.title}>Total Order</Text>
      <Divider style={placedOrderStyle.divider} />
      <View>
        <View style={placedOrderStyle.totalOrderItem}>
          <Text style={placedOrderStyle.itemText}>Item of print</Text>
          <View style={placedOrderStyle.totalOrderItemPlusMinus}>
            <TouchableOpacity
              style={placedOrderStyle.counterIcon}
              onPress={() => decreaseQuantity()}>
              <AntDesign name="minuscircleo" size={20} color="rgba(0,0,0,0.7)" />
            </TouchableOpacity>
            <View style={placedOrderStyle.priceQuantity}>
              <Text style={{ fontSize: 16 }}>{printQuantity}</Text>
            </View>
            <TouchableOpacity
              style={placedOrderStyle.counterIcon}
              onPress={() => increaseQuantity()}>
              <AntDesign name="pluscircleo" size={20} color="rgba(0,0,0,0.7)" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={placedOrderStyle.totalOrderItem}>
          <Text style={placedOrderStyle.itemText}>Printing Price</Text>
          <Text style={placedOrderStyle.printingPrice}>
            {jsonData?.singlePrice.toFixed(2)}{' '}
            <Text style={{ color: Color.C_H_black, fontSize: Font.Font_S, fontWeight: '400' }}>
              QAR
            </Text>
          </Text>
        </View>
      </View>
      <Divider style={placedOrderStyle.divider} />
      <View style={placedOrderStyle.totalPriceCon}>
        <Text style={placedOrderStyle.totalPrice}>Total Price</Text>
        <Text style={placedOrderStyle.price}>
          {jsonData?.totalPrice} <Text style={placedOrderStyle.currency}>QAR</Text>
        </Text>
      </View>
      <LinearGradient
        colors={['#C83B62', '#7F35CD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={placedOrderStyle.button}>
        <TouchableOpacity
          onPress={() => {
            if (buttonDisabled) {
              return ToastAndroid.show('please fill all the field', ToastAndroid.LONG);
            } else {
              navigation.navigate('Summery', { ...jsonData, source: sourcePage });
            }
          }}
          activeOpacity={0.7}
          style={placedOrderStyle.actionLayer}>
          <Text style={placedOrderStyle.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default TotalOrderComponent;
