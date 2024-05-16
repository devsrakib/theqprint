/**
 * PaymentMethod Component
 *
 * This component represents the screen where users can select their payment methods
 * and provide payment details for the checkout process.
 *
 * Features:
 * - Header section includes a common header component with the title "Checkout".
 * - Users can choose from available payment methods and input their payment details.
 * - Animated transitions for payment method selection and input fields.
 * - Provides options for securely saving card details.
 * - Displays the total amount to be paid and allows users to proceed with the payment.
 * - Utilizes TouchableOpacity and LinearGradient for interactive elements.
 * - Integrates with navigation to navigate between screens.
 * - Utilizes ScrollView to handle scrolling content within the screen.
 *
 * @returns JSX.Element
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkmark } from '../../../assets/allSvg/AllSvg';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { paymentMethodStyle } from './PaymentMethodStyle';
import { Color } from '../../constants/GlobalStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const PaymentMethod = () => {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Color.C_white }}>
      <CommonHeader title="Checkout" />

      {/* Body Section */}
      <ScrollView>
        <View style={paymentMethodStyle.bodyContainer}>
          <Text style={paymentMethodStyle.PaymentMethodText}>Payment Methods</Text>

          {/* Debit Card Payment Method */}
          <Animated.View
            entering={FadeInUp.delay(50).duration(500)}
            style={paymentMethodStyle.PaymentCartContainer}
          >
            <View style={paymentMethodStyle.dabidCartTextAndArrowCon}>
              <View style={paymentMethodStyle.cartImgAndTextCon}>
                <Image
                  style={paymentMethodStyle.cardImg}
                  source={require('../../../assets/image/cashOn.png')}
                />
                <Text style={paymentMethodStyle.dabidText}>Debit Card</Text>
              </View>
              <View style={paymentMethodStyle.radio} />
            </View>
          </Animated.View>

          {/* Visa Card Payment Method */}
          <Animated.View
            entering={FadeInUp.delay(50).duration(500)}
            style={paymentMethodStyle.PaymentCartContainer}
          >
            {/* Visa Card Image and Text */}
            <View style={paymentMethodStyle.dabidCartTextAndArrowCon}>
              <View style={paymentMethodStyle.cartImgAndTextCon}>
                <Image
                  style={paymentMethodStyle.cardImg}
                  source={require('../../../assets/image/visa.png')}
                />
                <Text style={paymentMethodStyle.dabidText}>Debit Card</Text>
              </View>
              <View style={paymentMethodStyle.radio}></View>
            </View>

            {/* Card Number Input */}
            <View style={paymentMethodStyle.cardTitleAndInputCon}>
              <Text style={paymentMethodStyle.cardNumberTitle}>Card Number</Text>
              <View style={paymentMethodStyle.inputContainer}>
                <TextInput style={paymentMethodStyle.input} placeholder="0000 0000 0000 0000" />
                <Image source={require('../../../assets/image/visa-logo.png')} />
              </View>
            </View>

            {/* Expiry Date and CVV Input */}
            <View style={paymentMethodStyle.expirDateAndCVVCon}>
              <View style={paymentMethodStyle.inputCon}>
                <Text style={paymentMethodStyle.exDateAndCVVText}>Expiry date</Text>
                <TextInput
                  placeholder="05/27"
                  style={[paymentMethodStyle.input, paymentMethodStyle.exCVVInput]}
                />
              </View>
              <View style={paymentMethodStyle.inputCon}>
                <Text style={paymentMethodStyle.exDateAndCVVText}>CVV</Text>
                <TextInput
                  placeholder="523"
                  style={[paymentMethodStyle.input, paymentMethodStyle.exCVVInput]}
                />
              </View>
            </View>

            {/* Name on Card Input */}
            <View style={paymentMethodStyle.cardTitleAndInputCon}>
              <Text style={paymentMethodStyle.cardNumberTitle}>Name on Card</Text>
              <View style={paymentMethodStyle.inputContainer}>
                <TextInput style={paymentMethodStyle.input} placeholder="Name on Card" />
              </View>
            </View>

            {/* Securely Save Card Details */}
            <View style={paymentMethodStyle.secureTextCon}>
              <View style={paymentMethodStyle.checkmarkCon}>
                <Checkmark />
              </View>
              <Text style={paymentMethodStyle.checkmarkText}>Securely save card and details</Text>
            </View>
          </Animated.View>

          {/* Other Payment Methods */}
          <View style={paymentMethodStyle.PaymentCartContainer}>
            <View style={paymentMethodStyle.dabidCartTextAndArrowCon}>
              <View style={paymentMethodStyle.cartImgAndTextCon}>
                <Image
                  style={paymentMethodStyle.cardImg}
                  source={require('../../../assets/image/cashOn.png')}
                />
                <Text style={paymentMethodStyle.dabidText}>Debit Card</Text>
              </View>
              <View style={paymentMethodStyle.radio}></View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Amount and Pay Now Button */}
      <View style={paymentMethodStyle.ammountCon}>
        <View>
          <Text style={paymentMethodStyle.totalAmount}>Total Amount</Text>
          <Text style={paymentMethodStyle.currency}>QR 4545.00</Text>
        </View>
        <View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#C83B62', '#7F35CD']}
            style={paymentMethodStyle.buttonContainer}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={paymentMethodStyle.buttonActionLayer}
              onPress={() => navigation.navigate('confirmorder')}
            >
              <Text style={paymentMethodStyle.buttonText}>Pay Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      {/* expo status bar */}
      <StatusBar style="dark" />
    </View>
  );
};

export default PaymentMethod;
