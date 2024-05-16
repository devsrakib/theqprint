import { View, Text, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from 'react-native-paper';
import { historyStyle } from './HistoryCartStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { RatingStar } from '../../../../assets/allSvg/AllSvg';
import Modal from 'react-native-modal';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { IReviewHistory } from '../../../types/interfaces/review.interface';
import { usePostReviewMutation } from '../../../redux/api/reviewSlice';
import { Rating } from 'react-native-ratings';
import { mainUrl } from '../../../constants/mainUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../customLoader/CustomLoader';
import { Font } from '../../../constants/GlobalStyle';

const HistoryCart = ({ item }: { item: IReviewHistory }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState();
  const [editRating, setEditRating] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleSubmit = async () => {
    setIndicator(true);
    const formData = new FormData();

    formData.append('orderId', item?._id);
    // formData.append('productId', productID);
    formData.append('rating', JSON.stringify(rating));
    formData.append('comment', comment);

    try {
      const response = await fetch(`https://api.theqprint.com/api/v1/review/${item?._id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          // Add any additional headers if required, such as authorization
        },
      });

      const data = await response.json();

      if (data?.success === true) {
        setSuccessMessage(data?.success);
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
      setIsModalVisible(false);
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(500)} style={historyStyle.container}>
      <Text style={historyStyle.processDate}>Purchased on 12 Jul 2023</Text>
      <Divider style={historyStyle.dividerStyle} />
      <View style={historyStyle.imgAndTitleCon}>
        <View style={historyStyle.imgCon}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            source={{ uri: `${mainUrl}${item?.product?.productPhoto}` }}
          />
        </View>
        <View style={historyStyle.titleAndStoreCon}>
          <Text style={historyStyle.title}>{item?.product?.productName}</Text>
          <View style={historyStyle.brandAndReviewCon}>
            <View style={historyStyle.brandAndBrandNameCon}>
              <View style={historyStyle.brandCon}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: `${mainUrl}${item?.product}` }}
                />
              </View>
              <Text>{item?.product?.brandName}</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider style={historyStyle.dividerStyle} />
      <View>
        <View style={historyStyle.ratingAndEditButtonCon}>
          <View style={historyStyle.ratingCon}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={28}
              ratingBackgroundColor="#e9e9e9"
              ratingColor="#F16A26"
              readonly
              ratingTextColor="#e9e9e9"
              startingValue={item?.rating}
              onFinishRating={(rating: any) => setRating(rating)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setEditRating(true);
              setIsModalVisible(true);
            }}
            activeOpacity={0.7}
            style={historyStyle.editButton}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={historyStyle.PevComment}>{item?.comment}</Text>
      </View>
      <Modal
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => toggleModal()}
        isVisible={isModalVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={historyStyle.modalContainer}>
          <View style={historyStyle.modalIndicator} />
          <View>
            <Text style={historyStyle.questionText}>What is your Rate?</Text>
            <TouchableOpacity
              onPress={() => () => setEditRating(true)}
              style={historyStyle.ratingCon}
            >
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={30}
                ratingBackgroundColor="#e9e9e9"
                ratingColor="#F16A26"
                ratingTextColor="#e9e9e9"
                startingValue={item?.rating}
                onFinishRating={(rat: any) => setRating(rat)}
              />
            </TouchableOpacity>
            <Text style={historyStyle.dummyText}>
              Please share your opinion about {'\n'} the product
            </Text>
            <TextInput
              multiline
              placeholder={item?.comment ? item?.comment : 'Write your review here...'}
              style={historyStyle.textInputCon}
              placeholderTextColor={'#000'}
              onChangeText={(text) => setComment(text)}
              maxLength={200}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* {errorMessage ? (
                <Text>{errorMessage}</Text>
              ) : ( */}
              {errorMessage && (
                <Text style={{ color: 'red', fontSize: Font.Font_S }}>{errorMessage}</Text>
              )}
              {successMessage && (
                <Text style={{ color: 'green', fontSize: Font.Font_S }}>
                  Review updated successfully
                </Text>
              )}
              {/* )} */}
              <Text style={historyStyle.textQuantity}>{200 - comment?.length}/200</Text>
            </View>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#C83B62', '#7F35CD']}
            style={historyStyle.modalLinear}
          >
            <TouchableOpacity
              onPress={() => handleSubmit()}
              activeOpacity={0.7}
              style={historyStyle.linearActionLayer}
            >
              <Text style={historyStyle.ModalButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      <CustomLoader indicator={indicator} setIndicator={setIndicator} />
    </Animated.View>
  );
};

export default HistoryCart;
