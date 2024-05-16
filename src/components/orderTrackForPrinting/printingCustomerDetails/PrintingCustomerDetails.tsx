import { View, Text, Image } from 'react-native';
import React from 'react';
import { CallIcon, LocationIcon, MessageBox, ShiftCar } from '../../../../assets/allSvg/AllSvg';
import { Divider } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrder } from '../../../types/interfaces/orderHistory.interface';
import { customerContainerStyle } from '../../trackedOrderDtailsCom/customerDetailsContainer/CustomerDetailsContainerStyle';
import { FontAwesome } from '@expo/vector-icons';

const PrintingCustomerDetails = ({ data }: { data: IOrder }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={customerContainerStyle.container}
    >
      <View>
        <Text style={customerContainerStyle.orderID}>
          Order ID: <Text style={customerContainerStyle.ID}>{data?.orderId}</Text>
        </Text>
        <View style={customerContainerStyle.deliveryDateAndCarCon}>
          <ShiftCar />
          <Text style={customerContainerStyle.deliveryDate}>Estimated delivery : 7 days</Text>
        </View>
      </View>
      <Divider style={customerContainerStyle.dividerStyle} />
      {/* ================================ */}
      <View>
        <Text style={customerContainerStyle.shipToText}>Ship & bill to</Text>
        <View style={customerContainerStyle.infoCon}>
          {/* <View style={customerContainerStyle.imgCon}>
            <Image source={{uri: data?.}} />
          </View> */}
          <FontAwesome name="user-circle-o" size={30} color="rgba(0,0,0,0.5)" />
          <Text style={[customerContainerStyle.name, { marginLeft: 10 }]}>
            {data?.buyer?.fullName}
          </Text>
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
            {`${data?.buyer?.shippingAddress?.streetAddress}-${data?.buyer?.shippingAddress?.zipCode}, ${data?.buyer?.shippingAddress?.country}`}
          </Text>
        </View>
      </View>
      <Divider style={customerContainerStyle.dividerStyle} />
      {/* ==================== */}
      <View>
        <Text style={customerContainerStyle.paidBy}>Paid by</Text>
        <View style={customerContainerStyle.infoCon}>
          <Text style={customerContainerStyle.cardText}>{data?.payment?.paymentMethod}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default PrintingCustomerDetails;
