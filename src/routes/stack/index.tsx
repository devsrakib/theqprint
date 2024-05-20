import { View, Text, Image, Platform, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screen/home/Home';
import Products from '../../screen/products/Products';
import Brand from '../../screen/Brand/Brand';
import Notification from '../../screen/notification/Notification';
import Profile from '../../screen/profile/Profile';
import ProductDetails from '../../pages/productDetailsPage/ProductDetails';
import Search from '../../pages/search/Search';
import MyCart from '../../pages/myCart/MyCart';
import Summery from '../../pages/summery/Summery';
import PaymentMethod from '../../pages/paymentMethod/PaymentMethod';
import ConfirmOrder from '../../pages/confirmOrder/ConfirmOrder';
import BrandDetails from '../../pages/brandDetails/BrandDetails';
import EditProfile from '../../pages/editProfile/EditProfile';
import Favorite from '../../pages/favorite/Favourite';
import TermsAndCondition from '../../pages/termsAndCondition/TermsAndCondition';
import FAQ from '../../pages/FAQ/FAQ';
import Review from '../../pages/review/Review';
import OrderHistory from '../../pages/orderHistory/OrderHistory';
import TrackedOrderDetails from '../../pages/orderTrack/OrderTrack';
import { Color } from '../../constants/GlobalStyle';
import OrderAndPrinterDesignPage from '../../pages/custom_order/CustomOrder';
import Login from '../../pages/logIn/Login';
import SignUp from '../../pages/signUp/SignUp';
import OTP from '../../pages/OTP/OTP';
import NewPass from '../../pages/forgotPass/newPass/NewPass';
import { forgotPass } from '../../pages/forgotPass/ForgotPassStyle';
import ForgotPass from '../../pages/forgotPass/ForgotPass';
import OptionalSignIn from '../../pages/signUp/optionalSignUpPage/OptionalSignIn';
import Onboarding from '../../pages/onboardingScreen/Onboarding';
import OrderConfirmation from '../../pages/custom_order/customOrderConfirmation/OrderConfirmation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PrintingOrderHistory from '../../pages/printingOderHistory/PrintingOrderHistory';
import OrderTrackForPrinting from '../../components/orderTrackForPrinting/OrderTrackForPrinting';
import PrivacyPolicy from '../../pages/privacyPolicy/PrivacyPolicy';
import {
  AcitveNotification,
  ActiveBrand,
  ActiveHome,
  ActiveProduct,
  ActiveUser,
} from '../../../assets/allSvg/AllSvg';
import { useUser } from '~/hooks/allHooks';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowColor: '#000',
          elevation: 13,
          borderTopColor: '#fff',
          paddingBottom: 10,
          shadowOffset: {
            width: 2,
            height: 1,
          },
          // shadowOpacity: 0.2,
          shadowRadius: 3,
          height: Platform.OS === 'ios' ? 80 : 70,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {focused ? (
                  <ActiveHome />
                ) : (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/defaultHome.png')}
                  />
                )}
                <Text
                  style={{
                    color: focused ? Color.C_main : Color.C_H_black,
                    fontWeight: focused ? '600' : '400',
                    fontSize: width <= 380 ? 10 : 12,
                  }}>
                  Home
                </Text>
              </View>
            );
          },
          headerShown: false,
          headerStyle: { height: 100 },
          headerTitleStyle: { marginTop: 30 },
        }}
        name="Home"
        component={Home}></Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {focused ? (
                  <ActiveProduct />
                ) : (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/defaultProduct.png')}
                  />
                )}
                <Text
                  style={{
                    color: focused ? Color.C_main : Color.C_H_black,
                    fontWeight: focused ? '600' : '400',
                    fontSize: width <= 380 ? 10 : 12,
                  }}>
                  Products
                </Text>
              </View>
            );
          },
          headerStyle: { height: 100 },
          headerTitleStyle: { marginTop: 30 },
        }}
        name="Products"
        //@ts-ignore
        component={Products}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {focused ? (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/AcitveBrandIcon.png')}
                  />
                ) : (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/defaulBrand.png')}
                  />
                )}
                <Text
                  style={{
                    color: focused ? Color.C_main : Color.C_H_black,
                    fontWeight: focused ? '600' : '400',
                    fontSize: width <= 380 ? 10 : 12,
                  }}>
                  Brand
                </Text>
              </View>
            );
          },
        }}
        name="Brand"
        component={Brand}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {focused ? (
                  <AcitveNotification />
                ) : (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/defaultNt.png')}
                  />
                )}
                <Text
                  style={{
                    color: focused ? Color.C_main : Color.C_H_black,
                    fontWeight: focused ? '600' : '400',
                    fontSize: width <= 380 ? 10 : 12,
                  }}>
                  Notifications
                </Text>
              </View>
            );
          },
        }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {focused ? (
                  <ActiveUser />
                ) : (
                  <Image
                    style={{ width: 23, height: 23 }}
                    source={require('../../../assets/image/defaultUser.png')}
                  />
                )}
                <Text
                  style={{
                    color: focused ? Color.C_main : Color.C_H_black,
                    fontWeight: focused ? '600' : '400',
                    fontSize: width <= 380 ? 10 : 12,
                  }}>
                  Profile
                </Text>
              </View>
            );
          },
        }}
        name="Profile "
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Index = () => {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);

  const { data } = useUser();

  useEffect(() => {
    const checkAccessToken = async () => {
      // const accessToken = await isLoggedIn();
      const userVarify = await AsyncStorage.getItem('varifyUser');
      // if(!userVarify || !data?.success || !data?.data?.isVerified){
      //   setInitialRoute('login')
      // }
      setInitialRoute(userVarify ? 'BottomTab' : !data?.success ? 'login' : 'BottomTab');
    };

    checkAccessToken();
  }, [initialRoute, data]);

  if (initialRoute === undefined) {
    return null;
  }

  return (
    // {/* // <Stack.Navigator initialRouteName="SignUp"> */}
    // <Stack.Navigator initialRouteName={`OTP`}>
    <Stack.Navigator initialRouteName={`${initialRoute}`}>
      <Stack.Screen options={{ headerShown: false }} name="onboarding" component={Onboarding} />
      <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
      <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />
      <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
      <Stack.Screen options={{ headerShown: false }} name="ProductDetails">
        {(props: any) => <ProductDetails {...props} />}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="MyCart" component={MyCart} />
      <Stack.Screen options={{ headerShown: false }} name="Summery" component={Summery} />
      <Stack.Screen options={{ headerShown: false }} name="Payment" component={PaymentMethod} />
      <Stack.Screen options={{ headerShown: false }} name="confirmorder" component={ConfirmOrder} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderTrackForPrinting"
        component={OrderTrackForPrinting}
      />
      <Stack.Screen options={{ headerShown: false }} name="BrandDetails">
        {(props: any) => <BrandDetails {...props} />}
      </Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="NotificationPage"
        component={Notification}
      />
      <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
      <Stack.Screen options={{ headerShown: false }} name="Favorite" component={Favorite} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TermsAndCond"
        component={TermsAndCondition}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen options={{ headerShown: false }} name="FAQ" component={FAQ} />
      <Stack.Screen options={{ headerShown: false }} name="Review" component={Review} />
      <Stack.Screen options={{ headerShown: false }} name="OrderHistory" component={OrderHistory} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TrackedOrderDetails"
        //@ts-ignore
        component={TrackedOrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderAndPrinterDesignPage"
        component={OrderAndPrinterDesignPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PrintingOrderHistory"
        component={PrintingOrderHistory}
      />
      <Stack.Screen options={{ headerShown: false }} name="OTP" component={OTP} />
      <Stack.Screen options={{ headerShown: false }} name="forgotPass" component={ForgotPass} />
      <Stack.Screen options={{ headerShown: false }} name="NewPass" component={NewPass} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="optionalSignIn"
        component={OptionalSignIn}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="customOrderConfirmation"
        component={OrderConfirmation}
      />
    </Stack.Navigator>
  );
};

export default Index;
