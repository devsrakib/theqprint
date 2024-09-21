/**
 * Search Component
 *
 * This component represents a screen for searching products within the application.
 * It allows users to input search queries, view search results, and navigate to relevant sections.
 *
 * Features:
 * - Header section includes navigation elements like back button, search input field, and cart icon.
 * - Main body renders search results based on user input.
 * - Displays dummy text if no search query is present, encouraging users to input search terms.
 * - Shows search results including brand items and cart items in a scrollable view.
 * - Utilizes TouchableOpacity components for user interaction with buttons and icons.
 * - Integrates with navigation functionality to navigate between screens seamlessly.
 * - Uses SafeAreaView to ensure content renders within safe boundaries of the device screen.
 * - Utilizes StatusBar component to manage the status bar appearance.
 *
 * State:
 * - dummyText: Manages the visibility of dummy text encouraging users to input search queries.
 * - input: Stores the user input from the search field.
 * - skeleton: Manages the skeleton loading state for search results.
 *
 * @returns JSX.Element
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { CartBag, Goback, Magnify, ThreeLine } from '../../../assets/allSvg/AllSvg';
import { searchStyle } from './SearchStyle';
import { Color } from '../../constants/GlobalStyle';
import Cart from '../../components/card/allCart/Cart';
import BrandInGlobalSearch from '../../components/globalSearchCom/brand/BrandInGlobalSearch';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IProduct } from '../../types/interfaces/product.interface';
import { useBrandQuery, useGetCart, useProductQuery, useSearch } from '../../hooks/allHooks';
import { Badge } from 'react-native-paper';
//@ts-ignore
import { debounce } from 'lodash';
import CustomActivityLoader from '../../constants/CustomAcitvityLoader';
import EmptyData from '~/components/common/EmptyData';

const Search = () => {
  const navigation: any = useNavigation();
  const [input, setInput] = useState<string>('');
  const { data } = useGetCart();
  const { data: productData, isLoading, refetchData } = useProductQuery(`searchTerm=${input}`);
  const { data: brandData, setRefetch: BRefetch } = useBrandQuery(`searchTerm=${input}`);

  const [items, setItems] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productData) {
      setItems(productData.data);
      setMeta(productData.meta);
    }
  }, [productData]);

  const fetchData = async () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setLoading(true);
      const response = await fetch(
        `https://api.theqprint.com/api/v1/product?searchTerm=${input}&page=${meta.page + 1}&limit=${meta.limit}`
      );
      const jsonData = await response.json();
      setItems([...items, ...jsonData.data]);
      setMeta(jsonData.meta);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={{ flex: 0.5, padding: 8 }}>
      <Cart item={item} />
    </View>
  );

  const debouncedFetchData = debounce(() => {
    refetchData();
    BRefetch((prev) => prev + 1);
  }, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedFetchData();
  }, [input]);

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <CustomActivityLoader />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={searchStyle.container}>
      {/* Header Section */}
      <View style={searchStyle.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}>
          <Goback />
        </TouchableOpacity>
        <Animated.View style={[searchStyle.searchContainer]}>
          <Magnify />
          <TextInput
            style={searchStyle.input}
            placeholder="Search"
            placeholderTextColor={Color.C_H_black}
            onChangeText={(text) => setInput(text)}
            autoFocus={true}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyCart')}
          activeOpacity={0.7}
          style={searchStyle.AddToCartContainer}>
          <CartBag />

          <Badge style={{ position: 'absolute', top: -8, right: -5 }}>
            {data?.data?.products?.length}
          </Badge>
        </TouchableOpacity>
      </View>

      {/* Main Body */}
      {input?.length === 0 ? (
        // Dummy Container
        <View style={searchStyle.dummyTextCont}>
          <Text style={searchStyle.dummyOne}>Type your words to find the best product for you</Text>
          <Text style={searchStyle.dummyTwo}>e.g : Epson printer</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={searchStyle.bodyContainer}>
            <Text style={searchStyle.brandText}>Brand</Text>
            <View>
              {/* FlatList for Brand Items */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
                data={brandData?.data}
                renderItem={({ item }) => <BrandInGlobalSearch item={item} />}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 10,
              }}>
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item: any, index) => `${item.key}${index}`}
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                removeClippedSubviews
                numColumns={2}
                ListEmptyComponent={
                  <EmptyData children="No search result found" width={140} height={140} />
                }
                contentContainerStyle={{ justifyContent: 'space-between' }}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {/* StatusBar */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Search;
