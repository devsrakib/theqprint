/**
 * ConfirmOrder Component
 *
 * This component displays the confirmation of a successful booking order,
 * including details of the transaction and an option to view the order.
 *
 * Features:
 * - Header section includes a common header component with the title "Booking Confirmation".
 * - Animated transitions for displaying the success logo and transaction details.
 * - Provides information such as total amount paid, payment method, transaction date, and transaction number.
 * - Offers a button to view the order details.
 * - Utilizes TouchableOpacity, ScrollView, and Linear Gradient for interactive elements.
 * - Utilizes Lottie animation for visual feedback upon confirmation.
 * - Integrates with navigation to navigate between screens.
 * - Utilizes Animated for animations like BounceIn and FadeInDown.
 *
 * @returns JSX.Element
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { confirmOrderStyle } from './ConfirmOrderStyle';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceIn, FadeInDown } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { IProduct } from '../../types/interfaces/product.interface';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../utils/formatDate';
import { commonHeaderStyle } from '../../components/common/commonHeader/CommonHeaderStyle';

const ConfirmOrder = (props: IProduct) => {
  //@ts-ignore
  const item = props?.route?.params;
  const data = item?.orderedProductDataForConfirmPage;
  const navigation = useNavigation<any>();
  const [shouldPlayLottie, setShouldPlayLottie] = useState<boolean>(true);
  const animation = useRef<any>(null);
  var today = new Date();
  var formattedDate =
    today.getDate() +
    ' ' +
    today.toLocaleString('default', { month: 'long' }) +
    ' ' +
    today.getFullYear();

  useEffect(() => {
    // This effect runs when the component mounts.
    // It plays the Lottie animation once after a delay of 500 milliseconds.
    if (shouldPlayLottie) {
      setTimeout(() => {
        animation.current?.play();
        setShouldPlayLottie(false);
      }, 200);
    }
  }, [shouldPlayLottie]);

  useEffect(() => {
    // Prevent hardware back button press from affecting navigation
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    // Clean up event listener on component unmount
    return () => backHandler.remove();
  }, []);

  return (
    <View style={confirmOrderStyle.container}>
      {/* common header component */}
      <View style={commonHeaderStyle.container}>
        <View style={commonHeaderStyle.titleCon}>
          <Text style={commonHeaderStyle.title}>Order confirmed</Text>
        </View>
      </View>

      {/* Body Section */}
      <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
        <View style={confirmOrderStyle.bodyContainer}>
          {/* Success Logo and Text */}
          <Animated.View style={confirmOrderStyle.logoContainer}>
            <Animated.View
              style={{ width: '100%', height: 280, alignItems: 'center', justifyContent: 'center' }}
              entering={BounceIn.delay(50).duration(500)}
            >
              {/* <SuccessPageLogo /> */}
              <LottieView
                loop={false}
                ref={animation}
                style={{ width: '90%', height: '80%', position: 'absolute' }}
                source={require('../../../assets/image/Right_Mark.json')}
              />
            </Animated.View>
            <Text style={confirmOrderStyle.orderPayment}>Your order is success</Text>
            <Text style={confirmOrderStyle.desc}>
              Your payment has been processed. Details of the transaction are included below.
            </Text>
          </Animated.View>

          {/* Transaction Details */}
          <View>
            {/* Total Amount Paid */}
            <Animated.View entering={FadeInDown.delay(50).duration(500)}>
              <Animated.View style={confirmOrderStyle.informationCon}>
                <Text style={confirmOrderStyle.amountTextAndother}>Total payable Amount</Text>
                <Text style={confirmOrderStyle.totalPriceAndother}>
                  {data?.totalAmount || item?.sellignPrice || item?.discountedTotal} QAR
                </Text>
              </Animated.View>

              {/* Divider */}
              <Divider />

              {/* Pay with */}
              <Animated.View style={confirmOrderStyle.informationCon}>
                <Text style={confirmOrderStyle.amountTextAndother}>Pay with</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[confirmOrderStyle.totalPriceAndother, { marginLeft: 10 }]}>
                    Cash on delivery
                  </Text>
                </View>
              </Animated.View>

              {/* Divider */}
              <Divider />

              {/* Transaction Date */}
              <Animated.View style={confirmOrderStyle.informationCon}>
                <Text style={confirmOrderStyle.amountTextAndother}>Order Date</Text>

                <Text style={confirmOrderStyle.totalPriceAndother}>{formattedDate}</Text>
              </Animated.View>

              <Divider />

              {/* Transaction Number */}
              {/* <View style={confirmOrderStyle.informationCon}>
                <Text style={confirmOrderStyle.amountTextAndother}>Transaction Number</Text>
                <Text style={confirmOrderStyle.totalPriceAndother}>1574OISHD514</Text>
              </View> */}
            </Animated.View>
            <Divider />
          </View>

          {/* View Order Button */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('OrderTrackForPrinting', { ...data })}
            style={confirmOrderStyle.viewOrderButton}
          >
            <Text style={confirmOrderStyle.buttonText}>View Order</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Okay Button */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#C83B62', '#7F35CD']}
        style={confirmOrderStyle.linearGradientStyle}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomTab')}
          style={confirmOrderStyle.buttonActionLayer}
        >
          <Text style={confirmOrderStyle.OkeyButtonText}>Okay</Text>
        </TouchableOpacity>
      </LinearGradient>
      <StatusBar style="dark" />
    </View>
  );
};

export default ConfirmOrder;
