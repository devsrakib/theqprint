import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Color, Font, shadows } from '../../constants/GlobalStyle';
import { IPrintingOrder } from '../../types/interfaces/allPrintingReq.interface';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatDate } from '../../utils/formatDate';

const { width } = Dimensions.get('window');
const PrintingDetailsCard = ({ item }: { item: IPrintingOrder }) => {
  const navigation = useNavigation<any>();

  const status = item?.orderStatus?.status;

  let statusBgColor;
  let statusColor;
  // let status
  if (status === 'Order placed') {
    statusBgColor = 'rgba(0, 0, 0, 0.08)';
    statusColor = 'black';
  } else if (status === 'Pending') {
    statusBgColor = 'rgba(250, 130, 50, 0.08)';
    statusColor = 'rgba(250, 130, 50, 1)';
  } else if (status === 'Order Received') {
    statusBgColor = 'rgba(13, 151, 85, 0.08)';
    statusColor = 'rgba(13, 151, 85, 1)';
  } else if (status === 'Shipped') {
    statusBgColor = 'rgba(90, 139, 242, 0.08)';
    statusColor = 'rgba(90, 139, 242, 1)';
  } else if (status === 'Cancelled') {
    statusBgColor = 'rgba(255, 0, 0, 0.08)';
    statusColor = 'rgba(255, 0, 0, 1)';
  }

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.container}>
      {/* data container */}
      <View style={[styles.common, styles.stutasCon]}>
        <View>
          <Text style={[styles.commonTextOne, { color: Color.C_black }]}>
            Order ID : <Text>{item?.orderId}</Text>
          </Text>
          <Text style={styles.commonTextOne}>
            <Text>{formatDate(item?.createdAt)}</Text>
          </Text>
        </View>
        <View style={[styles.statusButton, { backgroundColor: statusBgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {item?.orderStatus?.status}
          </Text>
        </View>
      </View>
      {/* divider */}
      <Divider />
      <View>
        {/* <View style={[styles.common]}> */}
        {/* size and mode container */}
        <View style={styles.paperTypeAndModeCon}>
          <Text style={styles.commonTextOne}>
            Paper Size :{' '}
            <Text style={{ color: Color.C_black }}>
              {item?.paperSize?.width} x {item?.paperSize?.height}
            </Text>
          </Text>
          <Text style={styles.commonTextOne}>
            Printing Mode : <Text style={{ color: Color.C_black }}>{item?.printingColorMode}</Text>
          </Text>
          {/* paper type and file contaienr
        <View style={styles.paperTypeAndModeCon}> */}
          <Text style={styles.commonTextOne}>
            Paper Type : <Text style={{ color: Color.C_black }}>{item?.paperType}</Text>
          </Text>
          <View style={styles.attachment}>
            <Text style={styles.commonTextOne}>Attachment :</Text>
            <Text style={{ color: Color.C_black, fontSize: Font.Font_L, flex: 1 }}>
              {' '}
              {item?.printingRequestFile}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
      <View style={[styles.common, { alignItems: 'center' }]}>
        <Text style={styles.commonTextOne}>
          Tatal Order : {item?.totalQuantity} x {item?.totalPrice}
        </Text>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate('OrderTrackForPrinting', { ...item })}
        >
          <Text style={{ fontSize: 14, color: Color.C_main }}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PrintingDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: Color.C_shadow,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowOpacity: shadows.opacity_1,
    shadowRadius: shadows.radius_1,
    backgroundColor: Color.C_white,
    marginVertical: 10,
  },
  common: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  stutasCon: {
    paddingHorizontal: 20,
  },
  statusButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 35,
  },
  paperDetailsCon: {
    paddingHorizontal: 20,
  },
  // paperSizeConAndMode: {
  //   width: '48%',
  // },
  commonTextOne: {
    fontSize: Font.Font_L,
    color: Color.C_H_black,
    marginBottom: 10,
  },
  paperTypeAndModeCon: { paddingHorizontal: 10, paddingVertical: 10 },
  trackButton: {
    width: 100,
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.C_main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachment: {
    flexDirection: 'row',
  },
  statusText: {
    fontSize: Font.Font_STen,
  },
});
