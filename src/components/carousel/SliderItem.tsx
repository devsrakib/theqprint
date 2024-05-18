import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { sliderItemStyle } from './SliderItemStyle';
import { mainUrl } from '../../constants/mainUrl';
const SliderItem = ({ item }: any) => {
  const openWebLink = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    Linking.openURL(url);
  };

  return (
    <>
      {item?.backgroundPhoto ? (
        <ImageBackground
          source={{ uri: `${mainUrl}${item?.backgroundPhoto}` }}
          borderRadius={10}
          style={[sliderItemStyle.container]}>
          <Animated.View
            entering={FadeIn.delay(50).duration(555).damping(20).springify()}
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={sliderItemStyle.insideCon}>
              <Text style={sliderItemStyle.title}>{item?.title}</Text>
              <Text numberOfLines={2} style={sliderItemStyle.description}>
                {item?.description}
              </Text>
              <TouchableOpacity
                onPress={() => openWebLink(item?.link)}
                activeOpacity={0.7}
                style={sliderItemStyle.button}>
                <Text style={sliderItemStyle.buttonText}>{item?.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <View style={sliderItemStyle.insideCon}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                source={{ uri: `${mainUrl}${item?.productPhoto}` }}
              />
            </View>
          </Animated.View>
        </ImageBackground>
      ) : (
        <Animated.View
          style={[sliderItemStyle.container, { backgroundColor: `#${item?.backgroundColor}` }]}>
          <Animated.View
            entering={FadeIn.delay(50).duration(555).damping(20).springify()}
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={sliderItemStyle.insideCon}>
              <Text style={sliderItemStyle.title}>{item?.title}</Text>
              <Text numberOfLines={2} style={sliderItemStyle.description}>
                {item?.description}
              </Text>
              <TouchableOpacity
                onPress={() => openWebLink(item?.link)}
                activeOpacity={0.7}
                style={sliderItemStyle.button}>
                <Text style={sliderItemStyle.buttonText}>{item?.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <View style={sliderItemStyle.insideCon}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                source={{ uri: `${mainUrl}${item?.productPhoto}` }}
              />
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

export default SliderItem;
