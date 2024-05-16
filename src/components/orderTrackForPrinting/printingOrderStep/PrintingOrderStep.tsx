import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
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
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

const PrintingOrderStep = ({ data, setStatus }: { data: any; setStatus: Function }) => {
  const lightGray = 'lightgray';

  const statusColors = data?.orderStatus?.map((status: any) => status?.status);
  useEffect(() => {
    setStatus(statusColors?.includes('Printing'));
  }, [statusColors]);
  return (
    <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.container}>
      {/* step indicator container */}
      {/* order placed */}
      <View style={styles.indicatorCon}>
        {/* indicator */}
        {/* order placed  */}
        <View
          style={[
            styles.indicatorBox,
            {
              backgroundColor: statusColors?.includes('Order placed') ? 'red' : lightGray,
            },
          ]}
        >
          <NoteBookIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            styles.relatedDivider,
            {
              backgroundColor: statusColors?.includes('Order placed') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        {/* packaging */}
        <View
          style={[
            styles.indicatorBox,
            {
              backgroundColor: statusColors?.includes('Packaging') ? 'red' : lightGray,
            },
          ]}
        >
          <PackageIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            styles.relatedDivider,
            {
              backgroundColor: statusColors?.includes('Packaging') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        {/* shipping */}
        <View
          style={[
            styles.indicatorBox,
            {
              backgroundColor: statusColors?.includes('Shipping') ? 'red' : lightGray,
            },
          ]}
        >
          <DeliveryCarIcon />
        </View>
        {/* related vertical divider */}
        <View
          style={[
            styles.relatedDivider,
            {
              backgroundColor: statusColors?.includes('Shipping') ? 'red' : lightGray,
            },
          ]}
        />
        {/* indicator */}
        <View
          style={[
            styles.indicatorBox,
            {
              backgroundColor: statusColors?.includes('Delivered') ? 'red' : lightGray,
            },
          ]}
        >
          <HandshackIcon />
        </View>
      </View>
      {/* step details container */}
      <View style={styles.stepDetailsCon}>
        {/* step details */}
        <View style={styles.stepDetails}>
          {/* order state */}
          {/* <View style={styles.dateCon}>
            {
              <>
                <Clock />
                <Text style={styles.dateText}>
                  {calculateEstimatedTime(data?.orderStatus[0].time)}
                </Text>
              </>
            }
          </View> */}
          <View style={styles.stepDetails}>
            {/* order state */}
            <View style={styles.dateCon}>
              {
                <>
                  <Clock />
                  <Text style={styles.dateText}>
                    {calculateEstimatedTime(data?.orderStatus[0]?.time)}
                  </Text>
                </>
              }
            </View>
            <View>
              <Text style={[styles.state]}>Order Placed</Text>
              <Text style={styles.subState}>Your order has been placed</Text>
            </View>
          </View>
        </View>
        {/* ======================================== */}
        <View style={styles.stepDetails}>
          {/* order state */}
          {data?.orderStatus[1]?.time && (
            <View style={styles.dateCon}>
              <Clock />
              <Text style={styles.dateText}>
                {calculateEstimatedTime(data?.orderStatus[1]?.time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                styles.state,
                { color: statusColors?.includes('Printing') ? 'black' : 'gray' },
              ]}
            >
              Printing
            </Text>
            <Text style={styles.subState}>Your Order Is ready to prepared by the Seller.</Text>
          </View>
        </View>
        {/* =========================================== */}
        <View style={styles.stepDetails}>
          {/* order state */}
          {data?.orderStatus[2]?.time && (
            <View style={styles.dateCon}>
              <Clock />
              <Text style={styles.dateText}>
                {calculateEstimatedTime(data?.orderStatus[2]?.time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                styles.state,
                { color: statusColors?.includes('Shipping') ? 'black' : 'gray' },
              ]}
            >
              To Ship
            </Text>
            <Text style={styles.subState}>Order has been shipping to your address</Text>
          </View>
        </View>
        {/* ========================================== */}
        <View style={styles.stepDetails}>
          {/* order state */}
          {data?.orderStatus[3]?.time && (
            <View style={styles.dateCon}>
              <Clock />
              <Text style={styles.dateText}>
                {calculateEstimatedTime(data?.orderStatus[3]?.time)}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={[
                styles.state,
                { color: statusColors?.includes('Delivered') ? 'black' : 'gray' },
              ]}
            >
              Order Receive
            </Text>
            <Text style={styles.subState}>Great! Order has been received by you.</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default PrintingOrderStep;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Color.C_white,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  indicatorCon: {
    alignItems: 'center',
  },
  indicatorBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedDivider: {
    width: 1,
    backgroundColor: 'red',
    height: 63,
  },
  stepDetailsCon: {
    flex: 1,
    marginLeft: 10,
  },
  stepDetails: {
    height: 110,
  },
  dateCon: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    marginLeft: 10,
  },
  state: {
    fontSize: Font.Font_L,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
  subState: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    lineHeight: 20,
  },
});
