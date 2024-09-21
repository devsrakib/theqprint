import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Color } from '../../../constants/GlobalStyle';
import PrintingDetailsCard from '../../../components/PrintiCard/PrintingDetailsCard';
import OrderTrackSkeleton from '../../../components/skeleton/orderTrack.skeleton';
import { useGetAllPrinting, useUser } from '../../../hooks/allHooks';
import EmptyData from '../../../components/common/EmptyData';

const OrderCancel = () => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetAllPrinting(
    `buyer.userId=${userData?.data?._id}&orderStatus.status=Cancelled`
  );
  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [userData]);
  return (
    <View style={{ flex: 1, backgroundColor: Color.C_white }}>
      {isLoading ? (
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
          contentContainerStyle={{ paddingBottom: !data ? 0 : 100, flex: 1 }}
          ListEmptyComponent={<EmptyData children="No Cancel" width={140} height={140} />}
        />
      )}
    </View>
  );
};

export default OrderCancel;

const styles = StyleSheet.create({});
