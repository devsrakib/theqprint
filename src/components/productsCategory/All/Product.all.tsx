import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Cart from '../../card/allCart/Cart';
import AllProductSkeleton from '../../skeleton/allProduct.skeleton';
import { IProduct } from '../../../types/interfaces/product.interface';
import { Color } from '../../../constants/GlobalStyle';
import EmptyData from '../../common/EmptyData';
import { CustomScrollView } from '../../../shared/CustomTouchable';
import { useProductQuery } from '../../../hooks/allHooks';
import CustomActivityLoader from '../../../constants/CustomAcitvityLoader';

const ProductAll = ({ brandName, searchText }: { brandName: string; searchText: string }) => {
  const { data, isLoading, refetchData } = useProductQuery(
    `${searchText ? 'searchTerm=' + searchText : ''}&${brandName ? 'brand.brandName=' + brandName : ''}`
  );
  const [items, setItems] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchedOnce, setSearchedOnce] = useState(false);

  useEffect(() => {
    refetchData();
    if (searchText) {
      setSearchedOnce(true);
    }
  }, [searchText]);

  useEffect(() => {
    if (data) {
      setItems(data.data);
      setMeta(data.meta);
    }
  }, [data]);

  const fetchData = async () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setLoading(true);
      const response = await fetch(
        `https://api.theqprint.com/api/v1/product?page=${meta.page + 1}&limit=${meta.limit}`
      );
      const jsonData = await response.json();
      setItems([...items, ...jsonData.data]);
      setMeta(jsonData.meta);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Cart item={item} />
    </View>
  );

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
    <>
      {data?.data?.length === 0 ? (
        <EmptyData children="No Product Found" />
      ) : searchedOnce || isLoading ? (
        <AllProductSkeleton />
      ) : (
        <View style={styles.container}>
          <Animated.FlatList
            entering={FadeInDown.delay(50).duration(500)}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: any, index) => `${item.key}${index}`}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={true}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
      {/* {isLoading && <AllProductSkeleton />} */}
    </>
  );
};

export default ProductAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingHorizontal: 10,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 0.5, // Make each item take half of the available width (for 2 columns)
    padding: 8, // Add padding for spacing between items
  },
});
