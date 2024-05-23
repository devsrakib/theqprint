import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { calculateEstimatedTime } from '../../../utils/calculateEstimatedTime';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

const PrintingOrderStep = ({ data, setStatus }: { data: any; setStatus: Function }) => {
  const lightGray = 'lightgray';
  const [stepStatus, setStepStatus] = useState('');

  const statusColors = data?.orderStatus?.map((status: any) => status?.status) || [];

  useEffect(() => {
    setStatus(statusColors.includes('Printing'));
    if (statusColors) {
      const printingStatus = data?.orderStatus.find((status: any) => status?.status === 'Printing');
      setStepStatus(printingStatus ? printingStatus.status : '');
    }
  }, [statusColors, data?.orderStatus]);

  const statuses = data?.orderStatus || [];
  const times = statuses.map((status: any) => status?.time);

  const allStatuses = [
    { status: 'Order placed', icon: <NoteBookIcon />, subState: 'Your order has been placed' },
    {
      status: 'Printing',
      icon: <PackageIcon />,
      subState: 'Your Order Is ready to prepared by the Seller',
    },
    {
      status: 'Shipping',
      icon: <DeliveryCarIcon />,
      subState: 'Order has been shipped to your address',
    },
    {
      status: 'Delivered',
      icon: <HandshackIcon />,
      subState: 'Great! Order has been received by you.',
    },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.container}>
      <View style={styles.indicatorCon}>
        {allStatuses.map((item, index) => (
          <React.Fragment key={index}>
            <View
              style={[
                styles.indicatorBox,
                {
                  backgroundColor: statusColors.includes(item.status) ? 'red' : lightGray,
                },
              ]}>
              {item.icon}
            </View>
            {index < allStatuses.length - 1 && (
              <View
                style={[
                  styles.relatedDivider,
                  {
                    backgroundColor: statusColors.includes(item.status) ? 'red' : lightGray,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.stepDetailsCon}>
        {allStatuses.map((item, index) => (
          <View key={index} style={styles.stepDetails}>
            {times[index] && (
              <View style={styles.dateCon}>
                <Clock />
                <Text style={styles.dateText}>{calculateEstimatedTime(times[index])}</Text>
              </View>
            )}
            <View>
              <Text
                style={[
                  styles.state,
                  { color: statusColors.includes(item.status) ? 'black' : 'gray' },
                ]}>
                {item.status}
              </Text>
              <Text style={styles.subState}>{item.subState}</Text>
            </View>
          </View>
        ))}
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
