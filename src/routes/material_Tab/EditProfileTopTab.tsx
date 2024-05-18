import { View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Color } from '../../constants/GlobalStyle';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { IDescription, IProduct } from '../../types/interfaces/product.interface';
import EditUserInfo from '../../components/editProfileComponent/EditUserInfo';
import ShippingInfo from '../../components/editProfileComponent/ShippingInfo';

const Tab = createMaterialTopTabNavigator();
const EditProfileTopTab = ({ userdata, image }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
        }}>
        <Tab.Screen name="Personal Info">
          {({
            route,
            navigation,
          }: {
            route: RouteProp<ParamListBase, 'Personal Info'>;
            navigation: any;
            //@ts-ignore
          }) => <EditUserInfo image={image} route={route} navigation={navigation} />}
        </Tab.Screen>

        <Tab.Screen name="Shipping Info">
          {({
            route,
            navigation,
          }: {
            route: RouteProp<ParamListBase, 'Shipping Info'>;
            navigation: IDescription;
            //@ts-ignore
          }) => <ShippingInfo route={route} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default EditProfileTopTab;
