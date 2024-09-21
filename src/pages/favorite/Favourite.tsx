import { View, FlatList, ViewToken } from 'react-native';
import React, { useContext, useEffect } from 'react';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { favoriteStyle } from './FavoriteStyle';
import FavoriteCart from '../../components/favoriteCartComponents/FavoriteCart';
import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue } from 'react-native-reanimated';
import EmptyData from '../../components/common/EmptyData';
import { useGetFavourite } from '../../hooks/allHooks';
import { FavItemContext } from '../../Providers/FavItemProvider';

const Favorite = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { data, setRefetch } = useGetFavourite();
  const favCtxValue = useContext<any>(FavItemContext);
  return (
    <>
      <View style={favoriteStyle.container}>
        {/* header section */}
        <CommonHeader title="My Favorite" cartBox={false} />
        {/* body section */}

        <View style={favoriteStyle.bodyContainer}>
          <FlatList
            data={favCtxValue?.data?.data?.products}
            onViewableItemsChanged={({ viewableItems: vItems }) => {
              viewableItems.value = vItems;
            }}
            contentContainerStyle={{ flex: 1 }}
            ListEmptyComponent={<EmptyData children="No Favourite" width={140} height={140} />}
            renderItem={({ item }) => {
              return <FavoriteCart item={item} viewableItems={viewableItems} />;
            }}
          />
        </View>

        <StatusBar style="dark" />
      </View>
    </>
  );
};

export default Favorite;
