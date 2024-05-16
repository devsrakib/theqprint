import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { orderPlacedStyle } from './Order_placedStyle';
import OrderPlaceCart from './orderPlaceCart/OrderPlaceCart';
import { useGetOnlineOrderQuery } from '../../../redux/api/onlineOrderSlice';
import OrderTrackSkeleton from '../../skeleton/orderTrack.skeleton';
import { useGetOnlineOrder, useUser } from '../../../hooks/allHooks';
import EmptyData from '../../common/EmptyData';

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
      {data?.data?.length === 0 ? (
        <EmptyData children="No online order" />
      ) : isLoading ? (
        <FlatList
          data={[1, 1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return <OrderTrackSkeleton />;
          }}
        />
      ) : (
        <FlatList
          data={data?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <OrderPlaceCart orderPlace={item} />;
          }}
        />
      )}
    </View>
  );
};

export default Order_placed;
