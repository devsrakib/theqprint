import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToReview from '../../pages/review/ToReview/toReview/ToReview';
import History from '../../pages/review/ToReview/reviewHistory/History';
import { Color } from '../../constants/GlobalStyle';
import ProductSpec from '../../components/productSpec/ProductSpec';
import ProductDesc from '../../components/productDesc/ProductDesc';
import ProductReviews from '../../components/productReviews/ProductReviews';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { IProduct, IDescription } from '../../types/interfaces/product.interface';

const Tab = createMaterialTopTabNavigator();
const ProductDetailsTopTab = ({ item }: { item: IProduct }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FFFFFF', // Background color of the tab bar
          },
          tabBarActiveTintColor: Color.C_main,
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarLabelStyle: { fontSize: 16, textTransform: 'lowercase' }, // Text style for tab labels
          tabBarIndicatorStyle: {
            backgroundColor: Color.C_main, // Color of the indicator line
            height: 1, // Height of the indicator line
            borderRadius: 10, // Border radius of the indicator line
          },
        }}
        tabBarOptions={{
          scrollEnabled: false, // Disable tab bar scrolling
        }}
      >
        <Tab.Screen name="Specification">
          {({
            route,
            navigation,
          }: {
            route: RouteProp<ParamListBase, 'Specification'>;
            navigation: IProduct;
          }) => <ProductSpec route={route} navigation={navigation} items={item?.specifications} />}
        </Tab.Screen>

        <Tab.Screen name="Description">
          {({
            route,
            navigation,
          }: {
            route: RouteProp<ParamListBase, 'Description'>;
            navigation: IDescription[];
          }) => <ProductDesc route={route} navigation={navigation} item={item?.description} />}
        </Tab.Screen>
        <Tab.Screen name="Reviews">
          {({
            route,
            navigation,
          }: {
            route: RouteProp<ParamListBase, 'Reviews'>;
            navigation: any;
          }) => <ProductReviews route={route} navigation={navigation} item={item?.reviews} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default ProductDetailsTopTab;
