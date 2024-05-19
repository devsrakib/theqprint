/**
 * Summery Component:
 * This component represents the summary page of the checkout process, where users can view their order summary,
 * shipping details, and proceed to payment.
 *
 * State:
 * - isDown: Tracks whether the shipping address box is expanded or collapsed.
 * - defaultLocation: Tracks whether to save the current location as the default shipping address.
 * - height: Shared value for controlling the height of the shipping address box animation.
 *
 * Navigation:
 * - navigation: React Navigation hook used for navigation between screens.
 *
 * Usage Example:
 * ```jsx
 * import Summery from './Summery';
 * <Summery />
 * ```
 */

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { summeryStyle } from './SummeryStyle';
import { Dropdown, UpArrow } from '../../../assets/allSvg/AllSvg';
import { CartItemContext } from '../../Providers/CartItemProvider';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import CustomLoader from '../../components/customLoader/CustomLoader';
import { Color, Font } from '../../constants/GlobalStyle';
import useKeyboardVisibility from '../../constants/useKeyboad';
import {
  useGetDeliveryState,
  useGetShippingQuery,
  useNotification,
  useUpdateCart,
} from '../../hooks/allHooks';
import { AddressFormState } from '../../types/interfaces/signUpAndLogin.interface';
import { ICartData } from '../productDetailsPage/ProductDetails';

const Summery: React.FC = (props) => {
  //@ts-ignore
  const item = props?.route?.params;

  const navigation: any = useNavigation();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [defaultLocation, setDefaultLocation] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [printingMessage, setPrintingMessage] = useState();
  const [accessToken, setAccessToken] = useState<string>('');
  const [indicator, setIndicator] = useState(false);
  const [formData, setFormData] = useState<AddressFormState>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    state: '',
    companyName: '',
    phoneNumber: '+974',
    zipCode: 0,
    country: 'Qatar',
    isDefault: defaultLocation,
  });

  const height = useSharedValue(100);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(null);
  const { data } = useGetShippingQuery('isDefault=true');
  const { data: NTData, setRefetch } = useNotification();
  const { cart: cartData, setCart } = useContext(CartItemContext);
  const { updateCart } = useUpdateCart();

  let location: any;
  if (data?.data && data?.data?.length > 0) {
    location = data?.data[0];
  }
  const { data: deliveryCharge } = useGetDeliveryState();

  const keyboardVisible = useKeyboardVisibility();
  const productDefaultLocation = {
    firstName: location?.firstName,
    lastName: location?.lastName,
    streetAddress: location?.streetAddress,
    state: location?.state,
    companyName: location?.companyName,
    phoneNumber: location?.phoneNumber,
    zipCode: location?.zipCode,
    country: location?.country,
    isDefault: location?.isDefault,
  };
  const targetedAmount: any = deliveryCharge?.data?.freeShippingMinOrderAmount;

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const formatExistingCart = (existCart: Array<ICartData>) => {
    return [
      ...existCart.map((cartItem) => ({
        productId: cartItem.productId,
        variantName: cartItem.variant.variantName,
        orderQuantity: cartItem.orderQuantity,
      })),
    ];
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isDefault: defaultLocation,
    }));
  }, [defaultLocation]);

  const customAddressFields = () => {
    let toggleHeight;
    if (isDown) {
      toggleHeight = 100;
    } else if (!isDropdown && location === undefined) {
      toggleHeight = 470;
    } else {
      toggleHeight = 470;
    }
    height.value = withTiming(toggleHeight, {
      duration: 450,
      easing: Easing.inOut(Easing.ease),
    });
    setIsDown(!isDown);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  let totalQuantity = 0;
  let totalPrice = 0;
  let totalDiscountPercentage = 0;
  let totalDiscountedAmount = 0;
  if (item) {
    for (const key in item) {
      if (!isNaN(Number(key))) {
        const product = item[key];
        const variant = product.variant; // Access the variant object

        if (variant) {
          let pricePerItem = variant?.sellingPrice;

          // If discounted price is available, use it instead
          if (variant.discountedPrice) {
            pricePerItem = variant?.discountedPrice;
          }

          if (variant && variant.discountPercentage) {
            // Accumulate the discount percentage
            totalDiscountPercentage += variant.discountPercentage;
          }

          if (
            variant &&
            variant.discountedPrice &&
            variant.discountedPrice < variant.sellingPrice
          ) {
            // Calculate the discounted amount for the current variant
            const discountedAmount =
              (variant.sellingPrice - variant.discountedPrice) * product.quantity;

            // Accumulate the discounted amount
            totalDiscountedAmount += discountedAmount;
          }

          totalQuantity += product?.quantity;
          totalPrice += product?.quantity * pricePerItem;
        }
      }
    }
  }

  totalPrice = item?.variant?.sellingPrice;

  let deliveryFee = 0; // Assigning a default value
  if (targetedAmount && item?.discountedTotal && targetedAmount <= item?.discountedTotal) {
    deliveryFee = 0;
  }
  if (location?.state === 'Doha' || formData?.state === 'Doha') {
    deliveryFee = deliveryCharge?.data?.inside || 0;
  } else {
    deliveryFee = deliveryCharge?.data?.outside || 0; // Adding default value here as well
  }

  if (targetedAmount && item?.discountedTotal && targetedAmount <= item?.discountedTotal) {
    deliveryFee = 0;
  }

  let grandTotal: number = 0;

  if (item?.discountedTotal || item?.variant?.discountedPrice || item?.totalPrice) {
    grandTotal = item?.totalPrice || item?.variant?.discountedPrice || item?.discountedTotal; // Added parentheses for clarity
  }

  // if (targetedAmount && targetedAmount <= grandTotal) {
  //   deliveryFee = 0;
  // }

  const paymentMethod: { paymentStatus: any; paymentMethod: any } = {
    paymentStatus: 'Unpaid',
    paymentMethod: 'COD',
  };

  let orderItems: { productId: string; variantName: string; orderQuantity: number }[] = [];

  // Check if item exists and if it's an object with properties
  if (item?.CartItem) {
    // format cart items for order
    orderItems = formatExistingCart(item.data?.products);
  } else {
    const orderItem = {
      productId: item?._id,
      variantName: item?.variant?.variantName,
      orderQuantity: item?.quantity,
    };
    orderItems.push(orderItem);
  }
  // Now, orderItems array contains the necessary data for each item in your cart
  // You can use this orderItems array to send data to your API

  const orderedProductDataForConfirmPage = {
    createdAt: item?.createdAt,
    totalAmount: item?.variant?.discountedPrice
      ? item?.variant?.discountedPrice
      : item?.variant?.sellingPrice,
  };

  const handleProductSubmit = async () => {
    let updateData: any = [];
    const paymentMethod: { paymentStatus: any; paymentMethod: any } = {
      paymentStatus: 'Paid',
      paymentMethod: 'COD',
    };
    let orderAddress;
    const isFormDataEmpty =
      Object.values(formData?.firstName && formData?.lastName && formData?.streetAddress)
        ?.length === 0;

    if (isFormDataEmpty) {
      orderAddress = productDefaultLocation;
    } else {
      orderAddress = formData;
    }

    const productJson = {
      additionalDiscount: item?.variant?.discountPercentage,
      orderItems: orderItems,
      shippingAddress: orderAddress,
      payment: paymentMethod,
    };
    try {
      const response = await fetch('https://api.theqprint.com/api/v1/online-order/add', {
        method: 'POST',
        body: JSON.stringify(productJson), // Stringify the object
        headers: {
          'Content-Type': 'application/json', // Specify content type
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (formData?.isDefault) {
        const response = await fetch('https://api.theqprint.com/api/v1/user-address/add', {
          method: 'POST',
          body: JSON.stringify(formData), // Stringify the object
          headers: {
            'Content-Type': 'application/json', // Specify content type
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();
      }

      if (response.ok && item?.source2 === 'AllCartRemove') {
        setCart({ data: { products: updateData } });
        updateCart({ products: [] });
      }
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result?.success);
        setRefetch((prev) => prev + 1);
        navigation.navigate('confirmorder', {
          orderedProductDataForConfirmPage,
          discountedTotal: item?.discountedTotal,
        });
      } else {
        if (result?.data?.errorMessages[0].message) {
          setErrorMessage(result?.data?.errorMessages[0].message);
        } else if (result?.errorMessages[0].message) {
          setErrorMessage(result?.errorMessages[0].message);
        }
      }
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleFormDataForCustomOrder = async () => {
    try {
      const defaultFormData = new FormData();
      defaultFormData.append('payment', JSON.stringify(paymentMethod));
      if (
        Object.values(formData?.firstName && formData?.lastName && formData?.streetAddress)
          ?.length === 0
      ) {
        defaultFormData.append('shippingAddress', JSON.stringify(location));
      } else {
        defaultFormData.append('shippingAddress', JSON.stringify(formData));
      }

      // Append other order details
      defaultFormData.append('paperSize', item?.paperSize);
      defaultFormData.append('printingColorModeId', item?.printingColorMode);
      defaultFormData.append('paperTypeId', item?.paperTypeId);
      defaultFormData.append('printingRequestFile', item?.printingRequestFile);
      defaultFormData.append('totalQuantity', item?.totalQuantity || totalQuantity);

      const response = await fetch('https://api.theqprint.com/api/v1/printing-request/add', {
        method: 'POST',
        body: defaultFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (formData?.isDefault) {
        const response = await fetch('https://api.theqprint.com/api/v1/user-address/add', {
          method: 'POST',
          body: JSON.stringify(formData), // Stringify the object
          headers: {
            'Content-Type': 'application/json', // Specify content type
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.json();
      }
      const responseData = await response.json();
      if (responseData?.success) {
        setSuccessMessage(responseData?.success);
        navigation.navigate('confirmorder', { sellignPrice: item?.singlePrice });
      } else {
        setPrintingMessage(responseData?.errorMessages[0]?.message);
      }
      setRefetch((prev) => prev + 1);
    } catch (error) {
      // Handle network or other errors
    } finally {
      setIndicator(false);
    }
  };

  const handleSubmitOrder = () => {
    setIndicator(true);
    if (item?.source === 'ProductDetailsPage') {
      handleProductSubmit();
    } else if (item?.source === 'CustomPrinting') {
      handleFormDataForCustomOrder();
    }
  };

  const error = errorMessage || printingMessage;
  const prices = item?.variant?.sellingPrice || item?.originalTotalPrice || item?.singlePrice;
  const discount = prices - grandTotal;
  const grandTotalPrice = grandTotal + deliveryFee;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* CommonHeader Component: Renders a common header with the title "Checkout" */}
      <CommonHeader title="Checkout" cartBox={false} />

      {/* ScrollView Component: Provides a scrollable view for the content */}
      <ScrollView>
        {/* Animated.View: Container for animated elements */}
        <Animated.View style={{ paddingTop: 20, paddingBottom: 100 }}>
          {/* Order Summary Box */}
          <Animated.View
            style={summeryStyle.topSummeryBox}
            entering={FadeInLeft.delay(50).duration(500)}>
            {/* Title for the Order Summary */}
            <Text style={summeryStyle.summeryTitle}>Order Summary</Text>

            {/* Subtotal Item */}
            <View style={summeryStyle.summeryItemBox}>
              <Text style={summeryStyle.summeryItemNormalText}>
                Subtotal
                <Text style={summeryStyle.summeryItemSmallText}>
                  {' '}
                  {/* ({item?.quantity || item?.totalQuantity || totalQuantity}) */}(
                  {item?.quantity || item?.orderQuantity || item?.totalQuantity})
                </Text>
              </Text>
              <Text style={summeryStyle.summeryItemCurrency}>
                QR {prices}
                .00
              </Text>
            </View>

            {/* Delivery Fee Item */}
            <View style={summeryStyle.summeryItemBox}>
              <Text style={summeryStyle.summeryItemNormalText}>Shipping Fee</Text>
              <Text style={summeryStyle.summeryItemCurrency}>QR {deliveryFee}.00</Text>
            </View>

            {/* Discount Item */}
            <View
              style={[
                summeryStyle.summeryItemBox,
                summeryStyle.borderBottomStyle,
                { paddingBottom: 20 },
              ]}>
              <>
                <Text style={summeryStyle.summeryItemNormalText}>Discount</Text>
                <Text style={summeryStyle.summeryItemCurrency}>- QR {discount.toFixed(2)}</Text>
              </>
            </View>

            {/* Grand Total Item */}
            <View style={summeryStyle.grandTotalCon}>
              <Text style={summeryStyle.summeryItemNormalText}>Grand Total</Text>
              <Text style={summeryStyle.summeryCurrency}>QR {grandTotalPrice.toFixed(2)}</Text>
            </View>
          </Animated.View>

          {/* Shipping Address Box */}
          <Animated.View
            style={summeryStyle.shiptoBox}
            entering={FadeInDown.delay(50).duration(500)}>
            {/* Title for the Shipping Address */}
            <Text style={summeryStyle.shipToText}>Ship to</Text>

            {/* Default Shipping Address */}
            {location && (
              <View
                style={[
                  summeryStyle.shipToItem,
                  {
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 5,
                  },
                ]}>
                <Image source={require('../../../assets/image/location.png')} />
                <Text
                  style={
                    summeryStyle.shipToItemText
                  }>{` ${location?.firstName}  ${location?.lastName},  ${location?.streetAddress} - ${location?.zipCode}, ${location?.state}, ${location?.country} \n ${location?.phoneNumber}`}</Text>
              </View>
            )}

            {/* Button to use a different shipping address */}
            <TouchableOpacity style={summeryStyle.shipToItem} onPress={() => customAddressFields()}>
              {!isDown ? (
                <View style={summeryStyle.emptyRadio} />
              ) : (
                <Image resizeMode="contain" source={require('../../../assets/image/Radio.png')} />
              )}
              <Text style={summeryStyle.shipToItemText}>Use a different shipping address</Text>
            </TouchableOpacity>
            {error ? (
              <Text style={{ color: 'red', marginTop: 5, marginLeft: 25 }}>{error}</Text>
            ) : (
              successMessage && (
                <Text style={{ color: 'green', marginTop: 5, marginLeft: 25 }}>
                  New Online order created successfully!
                </Text>
              )
            )}

            {/* Additional Fields for a Different Shipping Address */}
            {isDown && (
              <Animated.View style={[{ marginTop: 20 }, animatedStyle]}>
                <Animated.View
                  entering={FadeInUp.delay(50).duration(500)}
                  style={summeryStyle.nameInputContainer}>
                  <TextInput
                    style={summeryStyle.nameInput}
                    onChangeText={(text) => handleInputChange('firstName', text)}
                    placeholder="First Name"
                  />
                  <TextInput
                    style={summeryStyle.nameInput}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                    placeholder="Last Name"
                  />
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(50).duration(510)}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[summeryStyle.inputBox, { opacity: 0.4 }]}>
                    <Text style={summeryStyle.inputText}>Qatar</Text>
                    <Dropdown />
                  </TouchableOpacity>
                </Animated.View>
                {/* Other Address Input Fields */}
                <Animated.View
                  style={[
                    isDropdown
                      ? [summeryStyle.districtBox, { height: 140 }]
                      : summeryStyle.districtBox,
                  ]}
                  entering={FadeInUp.delay(50).duration(520)}>
                  <TouchableOpacity
                    onPress={() => setIsDropdown(!isDropdown)}
                    activeOpacity={0.7}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[summeryStyle.inputText, { color: 'rgba(0,0,0,0.6)' }]}>
                      {formData?.state ? formData?.state : 'state'}
                    </Text>
                    {isDropdown ? <UpArrow /> : <Dropdown />}
                  </TouchableOpacity>
                  {isDropdown && (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          handleInputChange('state', 'Doha'), setIsDropdown(false);
                        }}
                        style={summeryStyle.dropdownItem}>
                        <Text>Doha</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleInputChange('state', 'Outside Doha');
                          setIsDropdown(false);
                        }}
                        style={summeryStyle.dropdownItem}>
                        <Text>Outside Doha</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(50).duration(530)}>
                  <TextInput
                    style={[summeryStyle.inputBox]}
                    onChangeText={(text) => handleInputChange('streetAddress', text)}
                    placeholder="street address"
                  />
                </Animated.View>
                <Animated.View
                  entering={FadeInUp.delay(50).duration(550)}
                  style={summeryStyle.nameInputContainer}>
                  <TextInput
                    style={summeryStyle.nameInput}
                    onChangeText={(text) => handleInputChange('companyName', text)}
                    placeholder="company name"
                  />
                  <TextInput
                    style={summeryStyle.nameInput}
                    onChangeText={(text) => handleInputChange('zipCode', parseInt(text))}
                    placeholder="Zip Code"
                    keyboardType="numeric"
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    summeryStyle.numberInput,
                    {
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                  entering={FadeInUp.delay(50).duration(560)}>
                  <Text style={{ fontSize: Font.Font_M, marginRight: 5 }}>+974</Text>
                  <TextInput
                    style={{ flex: 1 }}
                    // onChangeText={(text) => handleInputChange('phoneNumber', text)}
                    onChangeText={(text) => {
                      // Check if the entered text starts with '+974'
                      if (text.startsWith('+974')) {
                        // If yes, update the phoneNumber field with the entered text
                        handleInputChange('phoneNumber', text);
                      } else {
                        // If no, concatenate '+974' with the entered text and update the phoneNumber field
                        handleInputChange('phoneNumber', '+974' + text);
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={8}
                  />
                </Animated.View>
                {/* Save as Default Address Option */}
                <Animated.View entering={FadeInUp.delay(50).duration(570)}>
                  <TouchableOpacity
                    style={[summeryStyle.shipToItem, { marginTop: 20 }]}
                    onPress={() => setDefaultLocation(!defaultLocation)}>
                    {!defaultLocation ? (
                      <View style={summeryStyle.emptyRadio}></View>
                    ) : (
                      <Image
                        resizeMode="contain"
                        source={require('../../../assets/image/Radio.png')}
                      />
                    )}
                    <Text style={[summeryStyle.shipToItemText]}>Save as default address</Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            )}
          </Animated.View>
          <Animated.View style={summeryStyle.checkboxCon}>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name="checksquare" size={20} color={Color.C_main} />
              <Text style={{ marginLeft: 10 }}>Cash on Delivery</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </ScrollView>

      {/* Next Button */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#C83B62', '#7F35CD']}
        style={[summeryStyle.nextButton, keyboardVisible && { display: 'none' }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleSubmitOrder();
          }}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={summeryStyle.buttonText}>Order Placed</Text>
        </TouchableOpacity>
      </LinearGradient>
      {indicator && <CustomLoader indicator={indicator} setIndicator={setIndicator} />}
    </View>
  );
};

export default Summery;
