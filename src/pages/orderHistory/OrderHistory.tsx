/**
 * OrderHistory Component:
 * This component represents the screen for viewing order history.
 * It includes sections for displaying various stages of the order, such as order placed,
 * packaging, shipping, and order review.
 *
 * State:
 * - activeTab: Represents the currently active tab.
 * - activeTabIndex: Represents the index of the active tab.
 *
 * Navigation:
 * None
 *
 * Usage Example:
 * ```jsx
 * import OrderHistory from './OrderHistory';
 * <OrderHistory />
 * ```
 */

import React from 'react';
import { View } from 'react-native';
import { orderHistoryStyle } from './OrderHistoryStyle';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { StatusBar } from 'expo-status-bar';
import OrderHistoryTopTab from '../../routes/material_Tab/OrderHistoryTopTab';

const OrderHistory = () => {
  return (
    <View style={orderHistoryStyle.container}>
      {/* Header Container */}
      <CommonHeader title="Order History" cartBox={true} />
      {/* Body Container */}
      <View style={orderHistoryStyle.bodyContainer}>
        {/* Navigation Container */}
        <OrderHistoryTopTab />
      </View>
      {/* expo status bar */}
      <StatusBar style="dark" />
    </View>
  );
};

export default OrderHistory;
