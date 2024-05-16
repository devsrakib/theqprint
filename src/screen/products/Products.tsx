/**
 * Products Component:
 * This component renders a screen displaying all available products.
 * It includes a header section with navigation controls, a search input, and icons.
 * The body section displays product categories using a material top tab.
 *
 * Props:
 * None
 *
 * Navigation:
 * - The back arrow button navigates back to the previous screen.
 *
 * Usage Example:
 * ```jsx
 * import Products from './Products';
 * <Products />
 * ```
 */

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { productsStyle } from './ProductsStyle';
import { BackArrow, CartBag, Magnify, ThreeLine } from '../../../assets/allSvg/AllSvg';
import { TopTab } from '../../routes/material_Tab/TopTab';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import { CustomTouchable } from '../../shared/CustomTouchable';
import { useGetCart } from '../../hooks/allHooks';
import { CartItemContext } from '../../Providers/CartItemProvider';

interface ProductsProps {
  itemId: string;
}

const Products: React.FC<ProductsProps> = ({ itemId }) => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const [isClickedSearch, setIsClickedSearch] = useState(false);
  const DimentionsWidth = Dimensions.get('window').width;
  const { cart: data } = useContext(CartItemContext);

  // const { products } = useAppSelector((state) => state.cart);

  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1
          ? withTiming(DimentionsWidth - 40, { duration: 500 })
          : withTiming(0, { duration: 1000 }),
      borderWidth: animation.value == 1 ? withTiming(1, { duration: 250 }) : 0,
    };
  });

  return (
    <View style={productsStyle.container}>
      {/* Header Section */}
      <View style={productsStyle.headerContainer}>
        {/* Navigation Controls */}
        <View style={productsStyle.navigationAndCard}>
          {!isClickedSearch === true && (
            <View style={productsStyle.navigationAndTitle}>
              {/* Back Button */}
              <CustomTouchable
                entering={FadeInLeft}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <BackArrow />
              </CustomTouchable>
              {/* Title */}
              <Animated.Text entering={FadeInLeft.delay(250)} style={productsStyle.title}>
                All Products
              </Animated.Text>
            </View>
          )}
          {/* Cart Icon */}
          {/* Search Input and Three Line Icon */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View style={[productsStyle.inputAndThreelineCon]}>
              {/* Search Input */}
              <Animated.View
                exiting={ZoomOut.delay(250)}
                style={[productsStyle.magnifyAndInputCon, animatedStyle]}
              >
                {isClickedSearch && (
                  <TextInput
                    onChangeText={(text) => setSearchText(text)}
                    style={productsStyle.input}
                    placeholder="Search products"
                    value={searchText}
                    autoFocus={true}
                  />
                )}

                <CustomTouchable
                  entering={ZoomIn.delay(50)}
                  onPress={() => {
                    setIsClickedSearch(!isClickedSearch);
                    if (animation.value == 0) {
                      animation.value = 1;
                    } else {
                      animation.value = 0;
                    }
                  }}
                  style={productsStyle.magnify}
                >
                  {isClickedSearch ? (
                    <AntDesign name="close" size={20} color="gray" />
                  ) : (
                    <Magnify />
                  )}
                </CustomTouchable>
              </Animated.View>
            </Animated.View>
            {!isClickedSearch === true && (
              <CustomTouchable
                disabled={data?.data === null}
                onPress={() => navigation.navigate('MyCart')}
                entering={ZoomIn.delay(50)}
                style={productsStyle.cartBag}
              >
                <CartBag />
                <Badge style={productsStyle.badge}>{data?.data?.products?.length}</Badge>
              </CustomTouchable>
            )}
          </View>
        </View>
      </View>
      {/* Body Section */}
      <View style={productsStyle.bodyContainer}>
        {/* material top tab  */}
        <TopTab searchText={searchText} brandName={''} />
      </View>
      {/* Status Bar */}
      <StatusBar style="dark" />
    </View>
  );
};

export default Products;
