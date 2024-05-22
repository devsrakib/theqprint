import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';

import { Divider } from 'react-native-paper';

import { Color, Font, shadows } from '../../../constants/GlobalStyle';

import { useGetOnlineOrder } from '~/hooks/allHooks';

const PringitSummary = ({ item }: { item: any }) => {
  const { data: NData } = useGetOnlineOrder('');
  return (
    <Animated.View entering={FadeInDown.delay(50).duration(200)} style={styles.container}>
      <Text style={[styles.commonText, { marginLeft: 20 }]}>Shopping Items</Text>
      <View style={styles.requestPringtingQuantity}>
        <Text style={styles.request}>Request a printing</Text>
        <Text>
          {item?.totalQuantity || NData?.totalQuantity} x {item?.totalPrice || NData?.totalPrice}
        </Text>
      </View>
      <Divider />
      <View>
        <View style={styles.commontContainer}>
          <Text style={styles.commonText}>Sub Total</Text>
          <Text>
            {item?.totalPrice || NData?.totalPrice} <Text>QAR</Text>
          </Text>
        </View>
        <View style={styles.commontContainer}>
          <Text style={styles.commonText}>Shipping</Text>
          <Text>
            {item?.shippingCharge || NData?.shippingCharge} <Text>QAR</Text>
          </Text>
        </View>
        <Divider />
        <View style={styles.commontContainer}>
          <Text style={styles.commonText}>Total</Text>
          <Text style={styles.totalAmount}>
            {item?.totalPayable?.toFixed(2) || NData?.totalPayable.toFixed(2)} <Text>QAR</Text>
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default PringitSummary;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Color.C_white,
    shadowColor: Color.C_shadow,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowOpacity: shadows.opacity_1,
    shadowRadius: shadows.radius_1,
    elevation: shadows.elevation_1,
    marginTop: 15,
    paddingVertical: 20,
  },
  request: {
    fontSize: Font.Font_M,
  },
  commonText: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
  },
  commontContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  requestPringtingQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  totalAmount: {
    color: Color.C_main,
    fontWeight: '600',
  },
});
