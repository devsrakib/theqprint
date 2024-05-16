import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from '../../constants/GlobalStyle';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const ReviewSkeleton = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      keyExtractor={(item: any, index) => `${item.key}${index}`}
      renderItem={({ item }) => {
        return (
          <View key={item?.index} style={styles.container}>
            <View>
              <ShimmerPlaceHolder style={styles.dataSkeleton} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ShimmerPlaceHolder
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                />
                <View>
                  <ShimmerPlaceHolder style={{ marginTop: 10, width: '80%' }} />
                  <ShimmerPlaceHolder style={{ marginTop: 10, width: '80%' }} />
                </View>
              </View>
              <ShimmerPlaceHolder style={{ marginTop: 25, width: 300, borderRadius: 10 }} />
            </View>
          </View>
        );
      }}
    />
  );
};
export default ReviewSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: 180,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  dataSkeleton: {
    height: 20,
    width: '70%',
    borderRadius: 15,
    marginVertical: 10,
  },
});
