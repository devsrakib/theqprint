import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { reviewCartStyle } from './ReviewCartStyle';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrderReview } from '../../../types/interfaces/review.interface';
import { Rating } from 'react-native-ratings';
import { STORAGE_KEY } from '../../../constants/storageKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainUrl } from '../../../constants/mainUrl';
import { formatDate } from '../../../utils/formatDate';
import CustomLoader from '../../customLoader/CustomLoader';
import { Font } from '../../../constants/GlobalStyle';

const ReviewCart = ({ item }: { item: IOrderReview }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [productID, setProductID] = useState('');
  const [Message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const orderReviewedItem = item?.orderItems?.filter((i) => !i?.isReviewed);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleRview = async () => {
    setIndicator(true);
    const formData = new FormData();

    formData.append('orderId', item?._id);
    formData.append('productId', productID);
    formData.append('rating', JSON.stringify(rating));
    formData.append('comment', comment);

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/review/add', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          // Add any additional headers if required, such as authorization
        },
      });

      const data = await response.json();
      console.log(data);

      setSuccessMessage(data?.success);
      if (response.ok) {
        setIsModalVisible(false);
      }
      if (!response.ok) {
        if (data.errorMessages && data.errorMessages.length > 0) {
          setErrorMessage(data.errorMessages[0].message);
        } else {
          setErrorMessage(data.message); // Set general error message from server
        }
      }
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  return (
    <>
      {orderReviewedItem?.map((i) => {
        return (
          <Animated.View
            entering={FadeInDown.delay(50).duration(500)}
            style={reviewCartStyle.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={reviewCartStyle.processDate}>{formatDate(item?.createdAt)}</Text>
            </View>
            <Divider style={reviewCartStyle.dividerStyle} />
            <View style={reviewCartStyle.imgAndTitleCon}>
              <View style={reviewCartStyle.imgCon}>
                <Image
                  style={{ width: '100%', height: '100%', borderRadius: 8 }}
                  source={{ uri: `${mainUrl}${i?.productPhotos[0]}` }}
                />
              </View>
              <View style={reviewCartStyle.titleAndStoreCon}>
                <Text style={reviewCartStyle.title}>{i?.productName}</Text>
                <View style={reviewCartStyle.brandAndReviewCon}>
                  <View style={reviewCartStyle.brandAndBrandNameCon}>
                    <View style={reviewCartStyle.brandCon}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: `${mainUrl}${i?.brand?.brandPhoto}` }}
                      />
                    </View>
                    <Text>{i?.brand?.brandName}</Text>
                  </View>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#C83B62', '#7F35CD']}
                    style={reviewCartStyle.linearButton}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(true);
                        setProductID(i?.productId);
                      }}
                      style={reviewCartStyle.buttonActionLayer}>
                      <Text style={reviewCartStyle.buttonText}>Review</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <Modal
              onBackdropPress={() => setIsModalVisible(false)}
              onBackButtonPress={() => setIsModalVisible(false)}
              swipeDirection="down"
              onSwipeComplete={() => toggleModal()}
              isVisible={isModalVisible}
              style={{ justifyContent: 'flex-end', margin: 0 }}>
              <View style={reviewCartStyle.modalContainer}>
                <View style={reviewCartStyle.modalIndicator}></View>
                <View>
                  <Text style={reviewCartStyle.questionText}>What is your Rate?</Text>
                  <View style={reviewCartStyle.ratingCon}>
                    <Rating
                      type="custom"
                      ratingCount={5}
                      imageSize={30}
                      ratingBackgroundColor="#e9e9e9"
                      ratingColor="#F16A26"
                      ratingTextColor="#e9e9e9"
                      startingValue={rating}
                      onFinishRating={(rat: any) => setRating(rat)}
                    />
                  </View>
                  <Text style={reviewCartStyle.dummyText}>
                    Please share your opinion about {'\n'} the product
                  </Text>

                  <View>
                    <TextInput
                      style={reviewCartStyle.textInputCon}
                      multiline
                      placeholder="Write your review here..."
                      onChangeText={(text) => setComment(text)}
                      maxLength={200}
                      value={comment}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {/* {errorMessage ? (
                <Text>{errorMessage}</Text>
              ) : ( */}
                    {errorMessage ? (
                      <Text style={{ color: 'red', fontSize: Font.Font_S }}>{errorMessage}</Text>
                    ) : (
                      successMessage && (
                        <Text style={{ color: 'green', fontSize: Font.Font_S }}>
                          Review updated successfully
                        </Text>
                      )
                    )}
                    {/* )} */}
                    <Text style={reviewCartStyle.textQuantity}>{200 - comment?.length}/200</Text>
                  </View>
                </View>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#C83B62', '#7F35CD']}
                  style={reviewCartStyle.modalLinear}>
                  <TouchableOpacity
                    onPress={() => {
                      handleRview();
                    }}
                    activeOpacity={0.7}
                    style={reviewCartStyle.linearActionLayer}>
                    <Text style={reviewCartStyle.ModalButtonText}>Submit Review</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </Modal>
            <CustomLoader indicator={indicator} setIndicator={setIndicator} />
          </Animated.View>
        );
      })}
    </>
  );
};

export default ReviewCart;
