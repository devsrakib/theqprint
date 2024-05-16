import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Order_placed from '../../components/orderHistoryComponents/order_placed/Order_placed';
import Packaging from '../../components/orderHistoryComponents/Packeaging/Packaging';
import Shipping from '../../components/orderHistoryComponents/shipping/Shipping';
import { Color } from '../../constants/GlobalStyle';
import OrderRecieve from '../../components/orderHistoryComponents/ordeReview/OrderRecieve';

const Tab = createMaterialTopTabNavigator();
const OrderHistoryTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 118, // Adjust the width of each tab
        },
        tabBarActiveTintColor: Color.C_main,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'capitalize' }, // Text style for tab labels
        tabBarIndicatorStyle: {
          backgroundColor: Color.C_main, // Color of the indicator line
          height: 1, // Height of the indicator line
          borderRadius: 10, // Border radius of the indicator line
        },
      }}
    >
      <Tab.Screen name="Order Placed" component={Order_placed} />
      <Tab.Screen name="Packaging" component={Packaging} />
      <Tab.Screen name="Shipping" component={Shipping} />
      <Tab.Screen name="Receive" component={OrderRecieve} />
    </Tab.Navigator>
  );
};

export default OrderHistoryTopTab;
