import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { orderPlacedStyle } from '../order_placed/Order_placedStyle';
import OrderPlaceCart from '../order_placed/orderPlaceCart/OrderPlaceCart';
import OrderTrackSkeleton from '../../skeleton/orderTrack.skeleton';
import { useGetOnlineOrder, useUser } from '../../../hooks/allHooks';
import EmptyData from '../../common/EmptyData';

const Shipping = () => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetOnlineOrder(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Shipping`
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <OrderPlaceCart orderPlace={item} />;
          }}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={<EmptyData width={140} height={140} children="No online order" />}
        />
      )}
    </View>
  );
};

export default Shipping;
