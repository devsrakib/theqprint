import { useWindowDimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import Animated, { FadeInDown, FadeInRight, SlideInRight } from 'react-native-reanimated';
import { IDescription, IProduct } from '../../types/interfaces/product.interface';
const ProductDesc = ({ item }: { item: any }) => {
  const [textShown, setTextShown] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  // const description = item;

  // const description = item;
  const _editor = useRef(null);

  return (
    <Animated.View entering={FadeInRight.delay(70).duration(200)} style={{ height: 400 }}>
      {/* <QuillEditor style={{ flex: 1 }} ref={_editor} initialHtml={description} /> */}
    </Animated.View>
  );
};

export default ProductDesc;
