import { FlatList, Text, View } from 'react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { orderPlacedStyle } from '../order_placed/Order_placedStyle';
import OrderPlaceCart from '../order_placed/orderPlaceCart/OrderPlaceCart';
import { useGetOnlineOrderQuery } from '../../../redux/api/onlineOrderSlice';
import OrderTrackSkeleton from '../../skeleton/orderTrack.skeleton';
import { useGetOnlineOrder, useUser } from '../../../hooks/allHooks';
import { useEffect } from 'react';
import EmptyData from '../../common/EmptyData';

const Packaging = () => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetOnlineOrder(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Packaging`
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

export default Packaging;
