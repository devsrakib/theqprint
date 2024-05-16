import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Color } from '../../constants/GlobalStyle';

const { width } = Dimensions.get('screen');

interface PaginationProps {
  data: any[];
  scrollX: Animated.Value;
  index: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, scrollX, index }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 15,
      }}
    >
      {data?.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 15, 8],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#E5DCD1', `${Color.C_main}`, '#E5DCD1'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              {
                width: 8,
                height: 8,
                borderRadius: 8,
                marginHorizontal: 5,
                backgroundColor: index === idx ? 'red' : '#EDE4DA',
              },
              { width: dotWidth, backgroundColor },
            ]}
            key={idx.toString()}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
