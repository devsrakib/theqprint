import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { orderAndPrinterDesignStyle } from '../../../pages/custom_order/CustomOrderStyle';
import { paperSizeStyle } from './PaperSizeStyle';
import { Color } from '../../../constants/GlobalStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';

const paperBoxSize = [
  {
    text: '14" x 14"',
  },
  {
    text: '4" x 14"',
  },
  {
    text: '24" x 14"',
  },
];
const PrintingPaperSizeComponent = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handlePaperSize = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(550)} style={paperSizeStyle.container}>
      <Text style={paperSizeStyle.title}>Printing Paper size (Free)</Text>
      {/* paper size container */}
      <View style={paperSizeStyle.paperSizeCon}>
        {paperBoxSize.map((i, index) => {
          return (
            <TouchableOpacity
              onPress={() => handlePaperSize(index)}
              activeOpacity={0.7}
              key={index.toString()}
              style={[
                paperSizeStyle.sizeBox1,
                { flex: index === 0 ? 1 : index === 1 ? 0.7 : 1.3 },
                {
                  borderColor: currentIndex === index ? Color.C_main : Color.C_border,
                },
              ]}
            >
              <Text style={paperSizeStyle.sizeText}>{i.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* custom order input container */}
      <View style={paperSizeStyle.customOrderInputCon}>
        <Text style={paperSizeStyle.customOrderText}>Custom Order</Text>
        {/* width container */}
        <View style={paperSizeStyle.customHeightWidthCon}>
          <Text style={paperSizeStyle.label}>Width</Text>
          <View style={paperSizeStyle.inputCon}>
            <TextInput style={paperSizeStyle.input} />
          </View>
        </View>
        {/* height container */}
        <View style={paperSizeStyle.customHeightWidthCon}>
          <Text style={paperSizeStyle.label}>Height</Text>
          <View style={paperSizeStyle.inputCon}>
            <TextInput style={paperSizeStyle.input} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default PrintingPaperSizeComponent;
