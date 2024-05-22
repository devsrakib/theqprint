import { View, Text } from 'react-native';
import React from 'react';
import { summerContainerStyle } from './SummeryContainerStyle';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const SummeryContainer = ({ data }: { data: any }) => {
  return (
    <Animated.View style={summerContainerStyle.container}>
      <Text style={summerContainerStyle.title}>Order Summery</Text>
      <View style={summerContainerStyle.infoCon}>
        <Text style={summerContainerStyle.leftText}>
          Subtotal <Text style={summerContainerStyle.smallText}>({data?.totalQuantity} item)</Text>
        </Text>
        <Text style={summerContainerStyle.price}>QR {data?.totalPrice}.00</Text>
      </View>
      {/* ================== */}
      <View style={summerContainerStyle.infoCon}>
        <Text style={summerContainerStyle.leftText}>Delivery Fee</Text>
        <Text>QR {data?.shippingCharge}.00</Text>
      </View>
      {/* ================== */}
      <View style={summerContainerStyle.infoCon}>
        <Text style={summerContainerStyle.leftText}>Discount</Text>
        <Text>QR {data?.totalDiscount.toFixed(2)}</Text>
      </View>
      {/* ================== */}
      <View style={summerContainerStyle.infoCon}>
        <Text style={summerContainerStyle.leftText}>{data?.totalQuantity} Item, 3 Package</Text>
        <Text style={summerContainerStyle.leftText}>
          Total:
          <Text style={summerContainerStyle.totalPrice}> QR {data?.totalPayable.toFixed(2)}</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default SummeryContainer;
