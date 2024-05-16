import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { orderStepContainerStyle } from './OrderStepStyle';
import {
  Calender,
  Clock,
  DeliveryCarIcon,
  HandshackIcon,
  NoteBookIcon,
  PackageIcon,
  Track,
} from '../../../../assets/allSvg/AllSvg';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrder, IOrderStatus } from '../../../types/interfaces/orderHistory.interface';
import { calculateEstimatedTime } from '../../../utils/calculateEstimatedTime';
import { Color, Font } from '../../../constants/GlobalStyle';

const OrderStepContainer = ({ data, setStatus }: { data: any; setStatus: Function }) => {
  const lightGray = 'lightgray';

  const orderItemStatus = data?.orderStatus?.map((status: any) => status?.status);

  useEffect(() => {
    const hasOrderPlaced = orderItemStatus?.includes('Packaging');
    setStatus(hasOrderPlaced);
  }, [orderItemStatus]);
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={orderStepContainerStyle.container}
    >
      {/* step indicator container */}
      {/* order placed */}
      <View style={orderStepContainerStyle.indicatorCon}>
        {/* indicator */}
        {/* order placed  */}
        <View
          style={[
            orderStepContainerStyle.indicatorBox,
            {
              backgroundColor: orderItemStatus?.includes('Order placed') ? 'red' : lightGray,
            },
          ]}
        >
          <NoteBookIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            orderStepContainerStyle.relatedDivider,
            {
              backgroundColor: orderItemStatus?.includes('Order placed') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        {/* packaging */}
        <View
          style={[
            orderStepContainerStyle.indicatorBox,
            {
              backgroundColor: orderItemStatus?.includes('Packaging') ? 'red' : lightGray,
            },
          ]}
        >
          <PackageIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            orderStepContainerStyle.relatedDivider,
            {
              backgroundColor: orderItemStatus?.includes('Packaging') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        {/* shipping */}
        <View
          style={[
            orderStepContainerStyle.indicatorBox,
            {
              backgroundColor: orderItemStatus?.includes('Shipping') ? 'red' : lightGray,
            },
          ]}
        >
          <DeliveryCarIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            orderStepContainerStyle.relatedDivider,
            {
              backgroundColor: orderItemStatus?.includes('Shipping') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        <View
          style={[
            orderStepContainerStyle.indicatorBox,
            {
              backgroundColor: orderItemStatus?.includes('Delivered') ? 'red' : lightGray,
            },
          ]}
        >
          <HandshackIcon />
        </View>
      </View>
      {/* step details container */}
      <View style={orderStepContainerStyle.stepDetailsCon}>
        {/* step details */}
        <View style={orderStepContainerStyle.stepDetails}>
          {/* order state */}
          <View style={orderStepContainerStyle.dateCon}>
            {
              <>
                <Clock />
                <Text style={orderStepContainerStyle.dateText}>
                  {calculateEstimatedTime(data?.orderStatus[0].time)}
                </Text>
              </>
            }
          </View>
          <View>
            <Text style={[orderStepContainerStyle.state]}>Order Placed</Text>
            <Text style={orderStepContainerStyle.subState}>Your order has been placed</Text>
          </View>
        </View>
        {/* ======================================== */}
        <View style={orderStepContainerStyle.stepDetails}>
          {/* order state */}
          {data?.orderStatus[1]?.time && (
            <View style={orderStepContainerStyle.dateCon}>
              <Clock />
              <Text style={orderStepContainerStyle.dateText}>
                {calculateEstimatedTime(data?.orderStatus[1].time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                orderStepContainerStyle.state,
                { color: orderItemStatus?.includes('Packaging') ? 'black' : 'gray' },
              ]}
            >
              Packaging
            </Text>
            <Text style={orderStepContainerStyle.subState}>
              Your Order Is ready to prepared by the Seller.
            </Text>
          </View>
        </View>
        {/* =========================================== */}
        <View style={orderStepContainerStyle.stepDetails}>
          {/* order state */}
          {data?.orderStatus[2]?.time && (
            <View style={orderStepContainerStyle.dateCon}>
              <Clock />
              <Text style={orderStepContainerStyle.dateText}>
                {calculateEstimatedTime(data?.orderStatus[2].time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                orderStepContainerStyle.state,
                { color: orderItemStatus?.includes('Shipping') ? 'black' : 'gray' },
              ]}
            >
              To Ship
            </Text>
            <Text style={orderStepContainerStyle.subState}>
              Order has been shipping to your address
            </Text>
          </View>
        </View>
        {/* ========================================== */}
        <View style={orderStepContainerStyle.stepDetails}>
          {/* order state */}
          {data?.orderStatus[3]?.time && (
            <View style={orderStepContainerStyle.dateCon}>
              <Clock />
              <Text style={orderStepContainerStyle.dateText}>
                {calculateEstimatedTime(data?.orderStatus[3].time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                orderStepContainerStyle.state,
                { color: orderItemStatus?.includes('Delivered') ? 'black' : 'gray' },
              ]}
            >
              Order Receive
            </Text>
            <Text style={orderStepContainerStyle.subState}>
              Great! Order has been received by you.
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default OrderStepContainer;
