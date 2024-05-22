import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Color } from '../../../constants/GlobalStyle';
import { FlatList } from 'react-native-gesture-handler';
import PrintingDetailsCard from '../../../components/PrintiCard/PrintingDetailsCard';
import { useGetAllPrinting, useUser } from '../../../hooks/allHooks';
import OrderTrackSkeleton from '../../../components/skeleton/orderTrack.skeleton';
import EmptyData from '../../../components/common/EmptyData';

const Shipped = () => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetAllPrinting(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Shipping`
  );
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
        />
      )}
    </View>
  );
};

export default Shipped;
