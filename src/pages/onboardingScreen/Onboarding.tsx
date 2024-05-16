import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { onboardingStyle } from './OnboardingStyle';
import { Logo, WhiteLogo } from '../../../assets/allSvg/AllSvg';
import LottieView from 'lottie-react-native';
import { Color, Font } from '../../constants/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface IOnboarding {
  bg: any;
  logo: any;
  topTitle?: string;
  lottie: any;
  topDesc: string;
  title: string;
  desc: string;
  button?: any;
}

const onboardingItem: IOnboarding[] = [
  {
    bg: require('../../../assets/image/fOngradient.png'),
    logo: <WhiteLogo />,
    topDesc: 'Professional App for your eCommerce\nbusiness',
    lottie: require('../../../assets/image/Q-print_1.json'),
    title: 'Purchase Printer',
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor ut labore`,
  },
  {
    bg: require('../../../assets/image/onScreen2.png'),
    logo: require('../../../assets/image/onColorLogo.png'),
    topDesc: 'Professional App for your eCommerce\nbusiness',
    lottie: require('../../../assets/image/Q-print_2.json'),
    title: 'Printer Ink !!',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor ut labore',
  },
  {
    bg: require('../../../assets/image/fOnGradient3.png'),
    logo: <WhiteLogo />,
    topDesc: 'Professional App for your eCommerce\nbusiness',
    lottie: require('../../../assets/image/Q-print_3.json'),
    title: 'Get Your order!!',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor ut labore',
    button: 'Get started',
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation: any = useNavigation();

  return (
    <View style={onboardingStyle.container}>
      <FlatList
        horizontal
        onScroll={(e) => {
          setCurrentIndex(
            (e.nativeEvent.contentOffset.x / Dimensions.get('window').width).toFixed(0)
          );
        }}
        pagingEnabled
        data={onboardingItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index.toString()} style={onboardingStyle.flatCon}>
              <Image style={onboardingStyle.gradientImage} source={item.bg} />
              {/* logo container */}
              <View
                style={[
                  index === 0
                    ? onboardingStyle.leftLogoAndTitleCon
                    : index === 1
                      ? onboardingStyle.centerLogoAndTitleCon
                      : index === 2 && onboardingStyle.leftLogoAndTitleCon,
                ]}
              >
                {index === 1 ? (
                  <Image style={{ width: 150 }} resizeMode="contain" source={item.logo} />
                ) : (
                  item.logo
                )}
                <Text
                  style={[
                    index === 1 ? { color: '#000', textAlign: 'center' } : onboardingStyle.topDesc,
                  ]}
                >
                  {item.topDesc}
                </Text>
              </View>
              <LottieView
                autoPlay
                // ref={animation}
                style={
                  index === 1 ? onboardingStyle.lottieSecondIndexStyle : onboardingStyle.lottieStyle
                }
                // Find more Lottie files at https://lottiefiles.com/featured
                source={item.lottie}
                resizeMode="contain"
              />
              <View
                style={[
                  index === 1
                    ? [onboardingStyle.titleAndDescCon, { marginTop: 40 }]
                    : onboardingStyle.titleAndDescCon,
                ]}
              >
                <Text style={onboardingStyle.title}>{item.title}</Text>
                <Text style={onboardingStyle.desc}>{item.desc}</Text>
              </View>
              {/* get start button container */}
              {item.button && (
                <LinearGradient
                  colors={['#C83B62', '#7F35CD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={onboardingStyle.linearButton}
                >
                  <TouchableOpacity
                    style={onboardingStyle.actionLayer}
                    onPress={() => navigation.navigate('BottomTab')}
                  >
                    <Text style={onboardingStyle.buttonText}>GET STARTED</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </View>
          );
        }}
      />
      {/* ≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠ */}
      {/* pagination container */}
      {currentIndex != 2 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 50,
          }}
        >
          <View style={onboardingStyle.paginationCon}>
            {onboardingItem.map((i, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    width: currentIndex == index ? 20 : 10,
                    height: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    backgroundColor: currentIndex == index ? Color.C_main : '#7F35CD',
                  }}
                />
              );
            })}
          </View>
          <TouchableOpacity onPress={() => setCurrentIndex(parseInt(currentIndex) + 1)}>
            {currentIndex === 0 ? (
              <Image
                style={{ width: 60, height: 60 }}
                source={require('../../../assets/image/circlePagination2.png')}
              />
            ) : (
              currentIndex === 1 && (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/image/circlePagination.png')}
                />
              )
            )}
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="light" />
    </View>
  );
};

export default Onboarding;
