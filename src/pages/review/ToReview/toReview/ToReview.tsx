import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import ReviewCart from '../../../../components/toReviewCom/reviewCart/ReviewCart';
import { useGetProductReviewQuery } from '../../../../redux/api/reviewSlice';
import ReviewSkeleton from '../../../../components/skeleton/Review.skeleton';
import { Color } from '../../../../constants/GlobalStyle';
import { IOrderReview } from '../../../../types/interfaces/review.interface';
import {
  useGetOnlineOrderById,
  useGetOnlineReveiwById,
  useReview,
  useUser,
} from '../../../../hooks/allHooks';
import CustomActivityLoader from '../../../../constants/CustomAcitvityLoader';
import EmptyData from '../../../../components/common/EmptyData';

const ToReview = () => {
  const { data: userData } = useUser();
  const { data, isLoading, setRefetch } = useGetOnlineReveiwById(userData?.data?._id);

  const [items, setItems] = useState<IOrderReview[]>([]);
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, [userData]);

  useEffect(() => {
    if (!isLoading && data) {
      setItems(data.data);
      setMeta(data.meta);
    }
  }, [data, isLoading]);
  const fetchData = async () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setLoading(true);
      const response = await fetch(
        `https://api.theqprint.com/api/v1/online-order?orderStatus.status=Delivered&buyer.userId=${userData?.data?._id}&page=${meta.page + 1}&limit=${meta.limit}`
      );
      const jsonData = await response.json();
      setItems([...items, ...jsonData.data]);
      setMeta(jsonData.meta);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => <ReviewCart item={item} />;

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

  const handleRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setRefreshing(false);
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      {data?.data?.length === 0 ? (
        <EmptyData children="No Online order" />
      ) : isLoading ? (
        <ReviewSkeleton />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item: any, index) => `${index}`}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}
    </View>
  );
};

export default ToReview;
