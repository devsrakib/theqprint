import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToReview from '../../pages/review/ToReview/toReview/ToReview';
import History from '../../pages/review/ToReview/reviewHistory/History';
import { Color } from '../../constants/GlobalStyle';

const Tab = createMaterialTopTabNavigator();
const ReviewTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Background color of the tab bar
        },
        tabBarActiveTintColor: Color.C_main,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarLabelStyle: { fontSize: 16, textTransform: 'capitalize' }, // Text style for tab labels
        tabBarIndicatorStyle: {
          backgroundColor: Color.C_main, // Color of the indicator line
          height: 1, // Height of the indicator line
          borderRadius: 10, // Border radius of the indicator line
        },
      }}
    >
      <Tab.Screen name="To Review" component={ToReview} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

export default ReviewTopTab;
