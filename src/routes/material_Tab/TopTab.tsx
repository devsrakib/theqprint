/**
 * TopTab Component:
 * This component defines a top tab navigator for displaying different product categories.
 * It utilizes the createMaterialTopTabNavigator from '@react-navigation/material-top-tabs'.
 * It includes tabs for Printer, Cartridge, and Ink categories.
 *
 * Props:
 * None
 *
 * Usage Example:
 * ```jsx
 * import { TopTab } from './TopTab';
 * <TopTab />
 * ```
 */

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Printer from '../../components/productsCategory/Printer/Printer';
import Cartridge from '../../components/productsCategory/Cartridge/Cartridge';
import Ink from '../../components/productsCategory/Ink/Ink';
import { Color } from '../../constants/GlobalStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ProductAll from '../../components/productsCategory/All/Product.all';

const Tab = createMaterialTopTabNavigator();

export const TopTab = ({ brandName, searchText }: { brandName: any; searchText: string }) => {
  return (
    <Animated.View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* =============================== */}
      {/* Top Tab Navigator */}
      {/* =============================== */}
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: '#FFFFFF', // Background color of the tab bar
          },
          tabBarActiveTintColor: Color.C_main,
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarItemStyle: { width: 115 },
          tabBarLabelStyle: { fontSize: 16, textTransform: 'capitalize', width: 100 },
          tabBarIndicatorStyle: {
            backgroundColor: Color.C_main, // Color of the indicator line
            height: 1, // Height of the indicator line
            borderRadius: 10, // Border radius of the indicator line
          },
        }}>
        {/* =============================== */}
        {/* Printer Category Tab */}
        {/* =============================== */}
        <Tab.Screen name="All">
          {() => <ProductAll searchText={searchText} brandName={brandName} />}
        </Tab.Screen>
        <Tab.Screen name="Printer">
          {() => <Printer searchText={searchText} itemId={brandName} />}
        </Tab.Screen>
        {/* =============================== */}
        {/* Cartridge Category Tab */}
        {/* =============================== */}
        <Tab.Screen name="Cartridge">
          {() => <Cartridge searchText={searchText} itemId={brandName} />}
        </Tab.Screen>
        {/* =============================== */}
        {/* Ink Category Tab */}
        {/* =============================== */}
        <Tab.Screen name="Ink">
          {() => <Ink searchText={searchText} itemId={brandName} />}
        </Tab.Screen>
      </Tab.Navigator>
    </Animated.View>
  );
};
