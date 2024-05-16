import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { paperTypeStyle } from './PaperTypeStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Color } from '../../../constants/GlobalStyle';
import { Divider } from 'react-native-paper';
import { Upload } from '../../../../assets/allSvg/AllSvg';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
const paperType = [
  {
    type: 'Inkjet printer paper',
  },
  {
    type: 'Laser Printer paper',
  },
  {
    type: 'Matte paper',
  },
  {
    type: 'Glossy paper',
  },
  {
    type: 'Card stock paper',
  },
  {
    type: 'Bond & Label paper',
  },
];

const PrintingMode = [
  {
    mode: 'RGB',
  },
  {
    mode: 'Black & White',
  },
  {
    mode: 'More Version',
  },
];

const PaperTypeComponent = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentIndexInPrint, setCurrentIndexInPrint] = useState<number>(0);
  const [image, setImage] = useState<any>();

  const handlePaperType = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrintMode = (index: number) => {
    setCurrentIndexInPrint(index);
  };

  // Uploads an image from the gallery
  const uploadImageFromGallery = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error: any) {
      alert('Error Uploading image' + error.message);
    }
  };

  // Saves the uploaded image
  const saveImage = async (image: any) => {
    try {
      // update displayed image
      setImage(image);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(550)} style={paperTypeStyle.container}>
      <Text style={paperTypeStyle.title}>What type of paper do you need?</Text>
      {/* all paper type container */}
      <View style={paperTypeStyle.paperTypeCon}>
        {paperType.map((i, index) => {
          return (
            <LinearGradient
              colors={currentIndex === index ? ['#C83B62', '#7F35CD'] : ['#fff', '#fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[paperTypeStyle.typeItem]}
              key={index.toString()}
            >
              <TouchableOpacity
                onPress={() => handlePaperType(index)}
                style={paperTypeStyle.actionLayer}
                activeOpacity={0.7}
                key={index.toString()}
              >
                <Text
                  style={[
                    paperTypeStyle.paperTypeText,
                    {
                      color: currentIndex === index ? Color.C_white : 'rgba(0,0,0,0.7)',
                    },
                  ]}
                >
                  {i.type}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
      <Divider style={paperTypeStyle.divider} />
      {/* printing mode container */}
      <View>
        <Text style={paperTypeStyle.printingModeTitle}>Print Mode</Text>
        <View style={paperTypeStyle.PrintModeCon}>
          {PrintingMode.map((i, index) => {
            return (
              <LinearGradient
                colors={currentIndexInPrint === index ? ['#C83B62', '#7F35CD'] : ['#fff', '#fff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={paperTypeStyle.mode}
                key={index.toString()}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={paperTypeStyle.actionLayer}
                  onPress={() => handlePrintMode(index)}
                >
                  <Text
                    style={[
                      paperTypeStyle.modeItemText,
                      {
                        color: currentIndexInPrint === index ? Color.C_white : 'rgba(0,0,0,0.7)',
                      },
                    ]}
                  >
                    {i.mode}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
        </View>
      </View>
      <Divider style={paperTypeStyle.divider} />
      {/* attachment container */}
      <View>
        <Text style={paperTypeStyle.attachmentText}>Attachment</Text>
        <TouchableOpacity
          onPress={() => uploadImageFromGallery()}
          activeOpacity={0.7}
          style={paperTypeStyle.uploadButton}
        >
          <Upload />
          <Text style={paperTypeStyle.uploadButtonText}>Upload file</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PaperTypeComponent;
