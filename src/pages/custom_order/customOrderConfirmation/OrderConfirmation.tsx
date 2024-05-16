/**
 * Order Confirmation Component
 *
 * This component displays the confirmation details of a booking order, including order code,
 * date, customer information, and social sharing options.
 *
 * Features:
 * - Displays a header with the title "Booking Confirmation".
 * - Utilizes Lottie animation for visual feedback upon confirmation.
 * - Includes social sharing buttons for Messenger and Whatsapp.
 * - Shows order details such as order code, date, customer name, phone number, and address.
 * - Provides buttons for viewing the order and confirming the action.
 * - Utilizes reanimated animations for smoother transitions and interactions.
 * - Utilizes LinearGradient for gradient background styling.
 *
 * @returns JSX.Element
 */

import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CommonHeader from '../../../components/common/commonHeader/CommonHeader';
import { customOrderConfirmationStyle } from './OrderConfimationStyle';
import { Messenger, Whatsapp } from '../../../../assets/allSvg/AllSvg';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceIn, FadeInDown } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const OrderConfirmation = () => {
  const [shouldPlayLottie, setShouldPlayLottie] = useState<boolean>(true);
  const animation = useRef<any>(null);

  useEffect(() => {
    // This effect runs when the component mounts.
    // It plays the Lottie animation once after a delay of 500 milliseconds.
    if (shouldPlayLottie) {
      setTimeout(() => {
        animation.current?.play();
        setShouldPlayLottie(false);
      }, 500);
    }
  }, [shouldPlayLottie]);
  return (
    <View style={customOrderConfirmationStyle.container}>
      {/* Header Section */}
      <CommonHeader title="Booking Confirmation" cartBox={false} />
      <ScrollView>
        {/* Top Logo and Text Container */}
        <View style={customOrderConfirmationStyle.logoCon}>
          <Animated.Image
            entering={BounceIn}
            style={customOrderConfirmationStyle.logo}
            source={require('../../../../assets/image/confirmationLogo.png')}
          />
          <LottieView
            loop={false}
            ref={animation}
            style={{ width: 400, height: 400, position: 'absolute' }}
            source={require('../../../../assets/image/cong.json')}
          />

          <Animated.Text
            entering={FadeInDown.delay(50).duration(500)}
            style={customOrderConfirmationStyle.thanksText}
          >
            Thank you
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(50).duration(500)}
            style={customOrderConfirmationStyle.dummyText1}
          >
            Our agent will you contact you soon
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(50).duration(500)}
            style={customOrderConfirmationStyle.dummyText2}
          >
            You have requested for printing a custom paper size, Very soon we will contact you
          </Animated.Text>
        </View>
        {/* Social Button Container */}
        <View style={customOrderConfirmationStyle.socialButtonCon}>
          <TouchableOpacity
            style={[customOrderConfirmationStyle.socialButton, { backgroundColor: '#097DFF' }]}
          >
            <Messenger />
            <Text style={customOrderConfirmationStyle.buttonText}>Messenger</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[customOrderConfirmationStyle.socialButton, { backgroundColor: '#25D366' }]}
          >
            <Whatsapp />
            <Text style={customOrderConfirmationStyle.buttonText}>Messenger</Text>
          </TouchableOpacity>
        </View>
        {/* Order Details Container */}
        <View>
          <Text style={customOrderConfirmationStyle.orderDetailsText}>Order details</Text>
          {/* Order Date and Code Container */}
          <View
            style={[customOrderConfirmationStyle.orderCodeAndDateCon, { paddingHorizontal: 15 }]}
          >
            <View style={[customOrderConfirmationStyle.itemCon]}>
              <Text style={customOrderConfirmationStyle.Text}>Order Code</Text>
              <Text>#958489357</Text>
            </View>
            <Divider />
            <View style={customOrderConfirmationStyle.itemCon}>
              <Text style={customOrderConfirmationStyle.Text}>Date</Text>
              <Text>October 19, 2023</Text>
            </View>
          </View>
          {/* Name, Phone, and Address Container */}
          <View style={customOrderConfirmationStyle.orderCodeAndDateCon}>
            <View style={[customOrderConfirmationStyle.itemCon, { paddingHorizontal: 15 }]}>
              <Text style={customOrderConfirmationStyle.Text}>
                Name: <Text style={{ color: '#475156' }}>Rakibul islam</Text>
              </Text>
            </View>
            <Divider />
            <View style={[customOrderConfirmationStyle.itemCon, { paddingHorizontal: 15 }]}>
              <Text style={customOrderConfirmationStyle.Text}>
                Phone: <Text style={{ color: '#475156' }}>01601113299</Text>
              </Text>
            </View>
            <Divider />
            <View style={[customOrderConfirmationStyle.itemCon, { paddingHorizontal: 15 }]}>
              <Text style={customOrderConfirmationStyle.Text}>
                Address:{' '}
                <Text style={{ color: '#475156' }}>
                  Noakhali Chaprashirhat Road No. 13/x, House no. 1320/C, Flat No. 5D
                </Text>
              </Text>
            </View>
          </View>
        </View>
        {/* Button Container */}
        <View style={customOrderConfirmationStyle.buttonCont}>
          <TouchableOpacity activeOpacity={0.7} style={customOrderConfirmationStyle.viewButton}>
            <Text style={customOrderConfirmationStyle.viewButtonText}>View Order</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={['#C83B62', '#7F35CD']}
            start={{ x: 0, y: 1 }}
            style={customOrderConfirmationStyle.linearButton}
          >
            <TouchableOpacity activeOpacity={0.7} style={customOrderConfirmationStyle.actionLayer}>
              <Text style={customOrderConfirmationStyle.linearButtonText}>Okay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

export default OrderConfirmation;
