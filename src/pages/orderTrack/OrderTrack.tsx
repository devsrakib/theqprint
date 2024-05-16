/**
 * TrackedOrderDetails Component:
 * This component represents the screen for tracking an order's details.
 * It includes sections for customer details, order steps, product information,
 * and a summary of the order. Users can also cancel the order.
 *
 * State:
 * - isStepChange: A state variable to control the change in order steps.
 *
 * Navigation:
 * None
 *
 * Usage Example:
 * ```jsx
 * import TrackedOrderDetails from './TrackedOrderDetails';
 * <TrackedOrderDetails />
 * ```
 */

import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { trackedOrderDetailsStyle } from './OrderTrackStyle';
import CustomerDetailsContainer from '../../components/trackedOrderDtailsCom/customerDetailsContainer/CustomerDetailsContainer';
import OrderStepContainer from '../../components/trackedOrderDtailsCom/orderStepContainer/OrderStepContainer';
import ProductContainer from '../../components/trackedOrderDtailsCom/productContainer/ProductContainer';
import SummeryContainer from '../../components/trackedOrderDtailsCom/summaryContainer/SummeryContainer';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { IOrder } from '../../types/interfaces/orderHistory.interface';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetOnlineOrderById, useNotification } from '../../hooks/allHooks';
import CustomLoader from '../../components/customLoader/CustomLoader';
import { useNavigation } from '@react-navigation/native';
const TrackedOrderDetails = (props: IOrder) => {
  // @ts-ignore
  const item = props?.route?.params;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [status, setStatus] = useState();
  const [cancellation, setCancellation] = useState('');
  const [comment, setComment] = useState('');
  const [indicator, setIndicator] = useState(false);
  const id = item?.OrderPlacedId || item?.onlineOrderId;
  const { data } = useGetOnlineOrderById(`${id}`);
  const [accessToken, setAccessToken] = useState<string>('');
  const { data: NTData, setRefetch } = useNotification();
  const navigation = useNavigation<any>();

  const handleButton = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, [data]);

  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [NTData]);

  const handleSubmit = async () => {
    setIndicator(true);

    try {
      const status = 'Cancelled';
      const reasonOfCancellation = cancellation;

      const updatedData = {
        status: status,
        reasonOfCancellation: reasonOfCancellation,
        comment: comment,
      };

      const response = await fetch(`https://api.theqprint.com/api/v1/online-order/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (response.ok) {
        setIsModalVisible(false);
        navigation.navigate('NotificationPage');
      }
      // const res: any = await updateOrderById(updateData);
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  return (
    <Animated.View style={trackedOrderDetailsStyle.container}>
      {/* ======================== */}
      {/* header section */}
      {/* ======================== */}
      <CommonHeader title="Track Your Order" cartBox={true} />
      {/* ======================== */}
      {/* body section */}
      {/* ======================== */}
      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          {/* ======================== */}
          {/* customer details */}
          {/* ======================== */}
          <CustomerDetailsContainer data={data?.data} />
          {/* ======================== */}
          {/* order step container */}
          {/* ======================== */}
          <OrderStepContainer data={data?.data} setStatus={setStatus} />
          {/* ======================== */}
          {/* product container */}
          {/* ======================== */}

          <ProductContainer data={data?.data} />
          {/* ======================== */}
          {/* summary container */}
          {/* ======================== */}
          <SummeryContainer data={data?.data} />
        </View>
      </ScrollView>
      {/* ======================== */}
      {/* linear button  */}
      {/* ======================== */}
      {status ? null : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#C83B62', '#7F35CD']}
          style={trackedOrderDetailsStyle.button}
        >
          {/* =========================== */}
          {/* action layer  */}
          {/* =========================== */}
          <TouchableOpacity
            onPress={() => handleButton()}
            activeOpacity={0.7}
            style={trackedOrderDetailsStyle.buttonActionLayer}
          >
            {/* ===================== */}
            {/* button text */}
            {/* ===================== */}
            <Text style={trackedOrderDetailsStyle.buttonText}>Cancel Order</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
      {/* ===================== */}
      <Modal
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => handleButton()}
        isVisible={isModalVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={trackedOrderDetailsStyle.cancelModalCon}>
          <View style={trackedOrderDetailsStyle.modalIndicator} />
          <Text style={trackedOrderDetailsStyle.cancellationText}>Cancellation Request</Text>
          <View style={trackedOrderDetailsStyle.inputAndTextCon}>
            <Text style={trackedOrderDetailsStyle.label}>Cancellation Reason</Text>
            <TextInput
              style={trackedOrderDetailsStyle.input}
              placeholder="wirte here..."
              onChangeText={(e) => setCancellation(e)}
            />
          </View>
          <View style={trackedOrderDetailsStyle.inputAndTextCon}>
            <Text style={trackedOrderDetailsStyle.label}>Comments</Text>
            <TextInput
              style={trackedOrderDetailsStyle.commentInput}
              multiline
              placeholder="(Optional)"
              onChangeText={(e) => setComment(e)}
              maxLength={250}
            />
            <Text style={trackedOrderDetailsStyle.commentTextLength}>
              {250 - cancellation.length} / 250
            </Text>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#C83B62', '#7F35CD']}
            style={[trackedOrderDetailsStyle.submitButton]}
          >
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={trackedOrderDetailsStyle.buttonActionLayer}
            >
              <Text style={trackedOrderDetailsStyle.buttonText}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      {/* ===================== */}
      {/* ======================= */}
      {/* expo status bar */}
      {/* ======================= */}
      <StatusBar style="dark" />
      <CustomLoader indicator={indicator} setIndicator={setIndicator} />
    </Animated.View>
  );
};

export default TrackedOrderDetails;
