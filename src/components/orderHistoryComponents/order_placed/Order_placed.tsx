import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { orderPlacedStyle } from './Order_placedStyle';
import OrderPlaceCart from './orderPlaceCart/OrderPlaceCart';
import { useGetOnlineOrder, useUser } from '../../../hooks/allHooks';
import EmptyData from '../../common/EmptyData';
import OrderTrackSkeleton from '../../skeleton/orderTrack.skeleton';

const Order_placed = (index: any) => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetOnlineOrder(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Order placed`
  );

  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [userData]);

  return (
    <View style={orderPlacedStyle.container}>
      {isLoading ? (
        <FlatList
          data={[1, 1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return <OrderTrackSkeleton />;
          }}
        />
      ) : (
        <FlatList
          data={data?.data}
          contentContainerStyle={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <OrderPlaceCart orderPlace={item} />;
          }}
          ListEmptyComponent={<EmptyData width={140} height={140} children="No online order" />}
        />
      )}
    </View>
  );
};

export default Order_placed;
