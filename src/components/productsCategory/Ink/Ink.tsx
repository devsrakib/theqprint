import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../../../types/interfaces/product.interface';
import Cart from '../../card/allCart/Cart';
import AllProductSkeleton from '../../skeleton/allProduct.skeleton';
import EmptyData from '../../common/EmptyData';
import { Color } from '../../../constants/GlobalStyle';
import { useProductQuery } from '../../../hooks/allHooks';
import CustomActivityLoader from '../../../constants/CustomAcitvityLoader';

const Ink = ({ itemId, searchText }: { itemId: string; searchText: string }) => {
  const { data, isLoading } = useProductQuery(
    `category.categoryName=Ink&${searchText ? 'searchTerm=' + searchText : ''}&${itemId ? 'brand.brandId=' + itemId : ''}`
  );
  const [items, setItems] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

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
    <View style={{ flex: 0.5, padding: 8 }}>
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
      ) : isLoading ? (
        <AllProductSkeleton />
      ) : (
        // <></>
        <View style={styles.container}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: any, index) => `${item.key}${index}`}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={true}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      )}
    </>
  );
};

export default Ink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingHorizontal: 10,
  },
});
