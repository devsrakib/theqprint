import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import HistoryCart from '../../../../components/toReviewCom/history/HistoryCart';
import { useReviewHistory, useUser } from '../../../../hooks/allHooks';
import EmptyData from '../../../../components/common/EmptyData';
import ReviewSkeleton from '../../../../components/skeleton/Review.skeleton';

const History = () => {
  const { data: userData } = useUser();
  const id = userData?.data?._id;
  const { data, isLoading, setRefetch } = useReviewHistory(id);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [userData]);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {data?.data?.length === 0 ? (
        <EmptyData children="No Review History" />
      ) : isLoading ? (
        <ReviewSkeleton />
      ) : (
        <FlatList
          data={data?.data}
          renderItem={({ item }) => {
            return <HistoryCart item={item} />;
          }}
          keyExtractor={(item) => item?._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
};

export default History;
