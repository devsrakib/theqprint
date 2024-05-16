import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Color, Font } from '../../constants/GlobalStyle';
import { IProduct } from '../../types/interfaces/product.interface';
import { AntDesign } from '@expo/vector-icons';
const ProgressBar = ({ item }: { item: any }) => {
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const targetAmount = item?.bulk?.minOrder;
  const percentageProgress =
    currentQuantity === 0 ? 0 : Math.round((currentQuantity / targetAmount) * 100);
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    setCurrentQuantity(item?.orderQuantity);
  }, [item?.orderQuantity]);

  useEffect(() => {
    const percentage = Math.min(100, Math.round((currentQuantity / targetAmount) * 100));
    animatedProgress.value = withTiming(percentage / 100, { duration: 1000 });
  }, [currentQuantity, targetAmount]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
      height: 4,
      backgroundColor: Color.C_main,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      position: 'relative',
      borderRadius: 4,
    };
  });

  let bulkOrder: number | undefined;
  if (item?.bulk?.minOrder >= item?.orderQuantity) {
    bulkOrder = item?.bulk?.minOrder - item?.orderQuantity;
  } else {
    bulkOrder = 0;
  }

  return (
    <View style={{ position: 'relative' }}>
      <View style={styles.customProgressBG}>
        <Animated.View style={progressStyle} />
      </View>
      {bulkOrder === 0 ? (
        <View style={styles.congratsMessageCon}>
          <AntDesign name="checkcircleo" size={16} color={Color.C_green} />
          <Text style={styles.congratsText}>
            Congratulation! You got extra {item?.bulk?.discount}% off
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>
          Spend <Text style={styles.spendItemText}>{bulkOrder}</Text> item more to get off{' '}
          <Text style={styles.extraText}>{item?.bulk?.discount}% Extra!</Text>
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  customProgressBG: {
    width: '96%',
    height: 5,
    borderRadius: 10,
    backgroundColor: Color.C_border,
    marginTop: 20,
  },
  percentageValueCon: {
    position: 'absolute',
    right: -10,
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    top: -10,
    borderColor: Color.C_main,
    backgroundColor: Color.C_white,
  },
  text: {
    marginTop: 20,
    color: 'rgba(0,0,0,0.6)',
    fontSize: Font.Font_M,
  },
  spendItemText: {
    color: Color.C_main,
    fontWeight: '600',
  },
  extraText: {
    fontWeight: '600',
    color: '#000',
  },
  congratsMessageCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  congratsText: {
    fontSize: Font.Font_M,
    color: Color.C_shadow,
    marginLeft: 10,
  },
});
