import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { Color } from '~/constants/GlobalStyle';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DetailsSkeleton = () => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <ShimmerPlaceHolder style={styles.container} />
          <ShimmerPlaceHolder style={styles.container} />
          <ShimmerPlaceHolder style={styles.container} />
        </View>
        <View>
          <ShimmerPlaceHolder style={[styles.container1]} />
          <View>
            <ShimmerPlaceHolder style={styles.container2} />
            <ShimmerPlaceHolder style={styles.container3} />
          </View>
          <View style={styles.circleCon}>
            <ShimmerPlaceHolder style={styles.circle} />
            <ShimmerPlaceHolder style={styles.circle} />
          </View>
          <ShimmerPlaceHolder style={styles.container4} />
        </View>
      </View>
    </>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 280,
    backgroundColor: Color.C_white,
    padding: 20,
  },
  secondContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  container: {
    width: 100,
    height: 30,
    borderRadius: 8,
    marginRight: 20,
  },
  container1: {
    width: '70%',
    marginBottom: 20,
  },
  container2: {
    width: '30%',
    marginBottom: 20,
  },
  container3: {
    width: '50%',
    marginBottom: 20,
  },
  container4: {
    width: '90%',
    marginTop: 30,
  },
  circleCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
});
