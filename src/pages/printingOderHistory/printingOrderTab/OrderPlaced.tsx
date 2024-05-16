import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import PrintingDetailsCard from '../../../components/PrintiCard/PrintingDetailsCard';
import { Color } from '../../../constants/GlobalStyle';
import OrderTrackSkeleton from '../../../components/skeleton/orderTrack.skeleton';
import { useGetAllPrinting, useUser } from '../../../hooks/allHooks';
import EmptyData from '../../../components/common/EmptyData';

const OrderPlaced = () => {
  const { data: userData } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, setRefetch } = useGetAllPrinting(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Order placed`
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setRefreshing(false);
  };

  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [userData]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.C_white }}>
      {data?.data?.length === 0 ? (
        <EmptyData children="No Printing request" />
      ) : isLoading ? (
        <FlatList
          data={[1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return <OrderTrackSkeleton />;
          }}
        />
      ) : (
        <FlatList
          data={data?.data}
          renderItem={({ item }) => {
            return <PrintingDetailsCard item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: !data ? 0 : 100 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
};

export default OrderPlaced;
