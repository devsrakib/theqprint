import { View, Text, Image } from 'react-native';
import React from 'react';
import { customerContainerStyle } from './CustomerDetailsContainerStyle';
import { CallIcon, LocationIcon, MessageBox, ShiftCar } from '../../../../assets/allSvg/AllSvg';
import { Divider } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrder } from '../../../types/interfaces/orderHistory.interface';
import { FontAwesome } from '@expo/vector-icons';

const CustomerDetailsContainer = ({ data }: { data: IOrder }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={customerContainerStyle.container}
    >
      <Text style={customerContainerStyle.orderID}>
        Order ID: <Text style={customerContainerStyle.ID}>{data?.orderId}</Text>
      </Text>
      <View style={customerContainerStyle.deliveryDateAndCarCon}>
        <ShiftCar />
        <Text style={customerContainerStyle.deliveryDate}>Estimated delivery : 7 days</Text>
      </View>

      <Divider style={customerContainerStyle.dividerStyle} />
      {/* ================================ */}

      <Text style={customerContainerStyle.shipToText}>Ship & bill to</Text>
      <View style={customerContainerStyle.infoCon}>
        <View style={customerContainerStyle.imgCon}>
          {/* <Image source={{uri: data?.buyer?.shippingAddress?.}} /> */}
          <FontAwesome name="user-circle-o" size={30} color="rgba(0,0,0,0.5)" />
        </View>
        <Text style={customerContainerStyle.name}>{data?.buyer?.fullName}</Text>
      </View>
      {/* ========= */}
      <View style={customerContainerStyle.infoCon}>
        <MessageBox />
        <Text style={customerContainerStyle.infoText}>{data?.buyer?.email}</Text>
      </View>
      {/* ========= */}
      <View style={customerContainerStyle.infoCon}>
        <CallIcon />
        <Text style={customerContainerStyle.infoText}>
          {data?.buyer?.shippingAddress?.phoneNumber}
        </Text>
      </View>
      {/* ========= */}
      <View style={[customerContainerStyle.infoCon, { alignItems: 'flex-start' }]}>
        <LocationIcon />
        <Text style={customerContainerStyle.infoText}>
          {` ${data?.buyer?.shippingAddress?.streetAddress}-${data?.buyer?.shippingAddress?.zipCode}, ${data?.buyer?.shippingAddress?.country}`}
        </Text>
      </View>
      <Divider style={customerContainerStyle.dividerStyle} />
      {/* ==================== */}
      <Text style={customerContainerStyle.paidBy}>Paid by</Text>
      <View style={customerContainerStyle.infoCon}>
        <Text style={customerContainerStyle.cardText}>{data?.payment?.paymentMethod}</Text>
      </View>
    </Animated.View>
  );
};

export default CustomerDetailsContainer;
