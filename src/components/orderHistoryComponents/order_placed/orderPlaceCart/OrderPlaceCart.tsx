import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { orderPlaceCartStyle } from './OrderPlaceCartStyle';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrder, IOrderStatus } from '../../../../types/interfaces/orderHistory.interface';
import { formatDate } from '../../../../utils/formatDate';
import { mainUrl } from '../../../../constants/mainUrl';

interface orderPlaceProps {
  orderPlace: IOrder;
}

const OrderPlaceCart: React.FC<orderPlaceProps> = ({ orderPlace }) => {
  const navigation: any = useNavigation();
  const OrderPlacedId = orderPlace?._id;

  orderPlace?.orderStatus?.status;

  let statusBgColor;
  let statusColor;
  // let status
  if (orderPlace?.orderStatus?.status === 'Order placed') {
    statusBgColor = 'rgba(0, 0, 0, 0.08)';
    statusColor = 'black';
  } else if (orderPlace?.orderStatus?.status === 'Packaging') {
    statusBgColor = 'rgba(250, 130, 50, 0.08)';
    statusColor = 'rgba(250, 130, 50, 1)';
  } else if (orderPlace?.orderStatus?.status === 'Shipping') {
    statusBgColor = 'rgba(13, 151, 85, 0.08)';
    statusColor = 'rgba(13, 151, 85, 1)';
  } else if (orderPlace?.orderStatus?.status === 'Delivered') {
    statusBgColor = 'rgba(90, 139, 242, 0.08)';
    statusColor = 'rgba(90, 139, 242, 1)';
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={orderPlaceCartStyle.container}
    >
      {/* top section */}
      <View style={orderPlaceCartStyle.topSectionCon}>
        <View>
          <Text style={orderPlaceCartStyle.orderID}>Order ID : {orderPlace?.orderId}</Text>
          <Text style={orderPlaceCartStyle.date}>{formatDate(orderPlace?.createdAt)}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[orderPlaceCartStyle.orderPlacedButton, { backgroundColor: statusBgColor }]}
        >
          <Text style={[orderPlaceCartStyle.orderButtonText, { color: statusColor }]}>
            {orderPlace?.orderStatus?.status}
          </Text>
        </TouchableOpacity>
      </View>
      {/* ================== */}
      <Divider />
      {/* middle section */}
      {orderPlace?.orderItems?.map((item) => {
        return (
          <View style={orderPlaceCartStyle.middleSectionCon}>
            <View style={orderPlaceCartStyle.imgCon}>
              <Image
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                source={{ uri: `${mainUrl}${item?.productPhotos[0]}` }}
              />
            </View>
            <View style={orderPlaceCartStyle.textCon}>
              <Text key={item?._id} style={orderPlaceCartStyle.title}>
                {item?.productName}
              </Text>

              <View style={orderPlaceCartStyle.crrencyCon}>
                <Text style={orderPlaceCartStyle.price}>
                  {/* I have to solve this problem NaN*/}
                  {item?.variant?.discountedPrice ||
                    item?.variant?.sellingPrice * item?.orderQuantity}
                  <Text style={orderPlaceCartStyle.currency}>QAR</Text>
                </Text>

                <Text style={orderPlaceCartStyle.verticalDivider}>|</Text>
                <Text style={orderPlaceCartStyle.quantity}>X {item?.orderQuantity}</Text>
              </View>
            </View>
          </View>
        );
      })}
      {/* ==================== */}
      <Divider />
      {/* last section */}
      <View style={orderPlaceCartStyle.lastContainer}>
        <View>
          <Text style={orderPlaceCartStyle.itemAndTotalText}>
            {orderPlace?.totalQuantity} Items, Total:
          </Text>
          <Text style={orderPlaceCartStyle.totalPrice}>
            {orderPlace?.totalPrice} <Text style={orderPlaceCartStyle.totalPriceQRA}>QAR</Text>
          </Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#C83B62', '#7F35CD']}
          style={orderPlaceCartStyle.trackButtonLinear}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TrackedOrderDetails', { OrderPlacedId: OrderPlacedId })
            }
            activeOpacity={0.7}
            style={orderPlaceCartStyle.trackButtonActionLayer}
          >
            <Text style={orderPlaceCartStyle.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

export default OrderPlaceCart;
