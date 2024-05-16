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

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import PrintingCustomerDetails from './printingCustomerDetails/PrintingCustomerDetails';
import PrintingOrderStep from './printingOrderStep/PrintingOrderStep';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { trackedOrderDetailsStyle } from '../../pages/orderTrack/OrderTrackStyle';
import { IOrder } from '../../types/interfaces/orderHistory.interface';
import PringitSummary from '../trackedOrderDtailsCom/printingSummary/PringitSummary';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';

import Animated from 'react-native-reanimated';
import Modal from 'react-native-modal';

import { useGetAllPrintingById } from '~/hooks/allHooks';
const OrderTrackForPrinting = (props: IOrder) => {
  // @ts-ignore
  const item = props?.route?.params;
  const [isStepChange, setIsStepChange] = useState<number>(0);
  const [status, setStatus] = useState();
  const [cancellation, setCancellation] = useState('');
  const [comment, setComment] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [indicator, setIndicator] = useState(false);
  const { data } = useGetAllPrintingById(`${item?._id}`);
  // const { data } = useGetOnlineOrderByIdQuery(`${item?.OrderPlacedId}`);
  const handleButton = () => {
    setIsStepChange(1);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, [data]);

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

      const response = await fetch(
        `https://api.theqprint.com/api/v1/printing-request/${item?._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedData),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setIsModalVisible(false);
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
      <CommonHeader title="Track Your Order" cartBox={false} />
      {/* ======================== */}
      {/* body section */}
      {/* ======================== */}
      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          {/* ======================== */}
          {/* customer details */}
          {/* ======================== */}
          <PrintingCustomerDetails data={data?.data} />
          {/* ======================== */}
          {/* order step container */}
          {/* ======================== */}
          <PrintingOrderStep data={data?.data} setStatus={setStatus} />
          {/* ======================== */}
          {/* product container */}
          {/* ======================== */}
          <PringitSummary item={item} />
          {/* ======================== */}
          {/* summary container */}
          {/* ======================== */}
        </View>
      </ScrollView>
      {/* ======================== */}
      {/* linear button  */}
      {/* ======================== */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C83B62', '#7F35CD']}
        style={trackedOrderDetailsStyle.button}>
        {/* =========================== */}
        {/* action layer  */}
        {/* =========================== */}
        <TouchableOpacity
          onPress={() => handleButton()}
          activeOpacity={0.7}
          style={trackedOrderDetailsStyle.buttonActionLayer}>
          {/* ===================== */}
          {/* button text */}
          {/* ===================== */}
          {status ? null : <Text style={trackedOrderDetailsStyle.buttonText}>Cancel Order</Text>}
        </TouchableOpacity>
      </LinearGradient>

      <Modal
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => handleButton()}
        isVisible={isModalVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}>
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
            style={[trackedOrderDetailsStyle.submitButton]}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={trackedOrderDetailsStyle.buttonActionLayer}>
              <Text style={trackedOrderDetailsStyle.buttonText}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      {/* ======================= */}
      {/* expo status bar */}
      {/* ======================= */}
      <StatusBar style="dark" />
    </Animated.View>
  );
};

export default OrderTrackForPrinting;
