import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { orderAndPrinterDesignStyle } from './CustomOrderStyle';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import TotalOrderComponent from '../../components/PrintingDesignComponent/placedOrder/PlacedOrder';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { paperSizeStyle } from '../../components/PrintingDesignComponent/paperSize/PaperSizeStyle';
import { Color, Font } from '../../constants/GlobalStyle';
import { paperTypeStyle } from '../../components/PrintingDesignComponent/paperType/PaperTypeStyle';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload } from '../../../assets/allSvg/AllSvg';
import * as DocumentPicker from 'expo-document-picker';
import { IColorMode, IPaperType, IpaperSize } from '../../types/interfaces/paparType.interface';
import { useGetPrinting } from '../../hooks/allHooks';

const OrderAndPrinterDesignPage = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [defaultCurrentIndex, setDefaultCurrentIndex] = useState<number | null>(null);
  const [currentIndexInPrint, setCurrentIndexInPrint] = useState<number | null>(null);
  const [customWidth, setCustomWidth] = useState<any>('');
  const [customHeight, setCustomHeight] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<any>();
  const [printQuantity, setPrintQuantity] = useState<number>(1);
  const [selectedPaperSize, setSelectedPaperSize] = useState<any>();
  const [bgColor, setBgColor] = useState<string>('');
  const [selectedPaperType, setSelectedPaperType] = useState<any>();
  const [selectedFileName, setSelectedFineName] = useState<any>();
  const [selectedColorMode, setSelectedColorMode] = useState<any>();
  const { data: paperSize, isLoading: isSizeLoading } = useGetPrinting(
    'printingSetupType=Paper Size'
  );
  const { data: paperType, isLoading: isTypeLoading } = useGetPrinting(
    'printingSetupType=Paper Type'
  );
  const { data: colorMode, isLoading: isColorMode } = useGetPrinting(
    'printingSetupType=Printing Color Mode'
  );

  const handleDefaultPaperSize = (index: number, i: IpaperSize) => {
    setDefaultCurrentIndex(index);
  };

  const handlePaperType = (index: number, id: string) => {
    setCurrentIndex(index);
  };

  const handlePrintMode = (index: number) => {
    setCurrentIndexInPrint(index);
  };

  let height = 0;
  let width = 0;

  if (customHeight && customWidth) {
    height = customHeight;
    width = customWidth;
  } else {
    height = selectedPaperSize?.height || 0;
    width = selectedPaperSize?.width || 0;
  }

  const calculateTotalAmount = (): number => {
    if (selectedPaperType === undefined || selectedColorMode === undefined) {
      return 0;
    }

    const paperTypePrice = selectedPaperType?.price
      ? selectedPaperType?.price
      : selectedPaperType?.customPrice || 0;
    const colorModePrice = selectedColorMode?.price || 0;
    const totalAmount = height * width * paperTypePrice + height * width * colorModePrice;
    return totalAmount;
  };

  const singlePrice = calculateTotalAmount();
  const totalAmount = printQuantity * singlePrice;
  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();

      if (res?.assets && res?.assets?.length > 0) {
        const firstAsset = res?.assets[0];

        if (firstAsset?.name) {
          setSelectedFineName(firstAsset?.name);
        }

        setSelectedFile({
          uri: firstAsset?.uri,
          type: firstAsset?.mimeType,
          name: firstAsset?.name,
        });
      }
    } catch (err) {}
  };

  const jsonData = {
    paperSize: JSON.stringify({ height, width }),
    printingColorMode: selectedColorMode?._id,
    paperTypeId: selectedPaperType?._id,
    printingRequestFile: selectedFile,
    totalQuantity: printQuantity,
    totalPrice: totalAmount,
    singlePrice: singlePrice,
    // totalPrintingPrice: totalPrintingPrice,
  };
  console.log(jsonData);

  const clearSelectedPaperSize = () => {
    setBgColor(Color.C_border);
    setDefaultCurrentIndex(null);
  };

  return (
    <View style={orderAndPrinterDesignStyle.container}>
      {/* header section */}
      <CommonHeader title="Order for Printing a design" cartBox={false} />
      {/* ========================================
                body container start here
        =================================== */}
      <ScrollView>
        {/* dummy text container */}
        <Animated.View
          entering={FadeInDown.delay(50).duration(500)}
          style={orderAndPrinterDesignStyle.dummyTextContainer}>
          <Text style={orderAndPrinterDesignStyle.text_one}>Request for a Printing</Text>
          <Text style={orderAndPrinterDesignStyle.text_Two}>
            We will print your design and send it to your delivery address
          </Text>
        </Animated.View>
        {/* paper size container */}
        <Animated.View
          entering={FadeInDown.delay(50).duration(550)}
          style={paperSizeStyle.container}>
          <Text style={paperSizeStyle.title}>Printing Paper size (Free)</Text>
          {/* paper size container */}
          <View style={paperSizeStyle.paperSizeCon}>
            {paperSize?.data?.map((i: IpaperSize, index: number) => {
              const { height, width } = i || {};
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPaperSize({ height, width });
                    handleDefaultPaperSize(index, i);
                    setCustomHeight(''); // or setCustomHeight(0) depending on your requirement
                    setCustomWidth('');
                  }}
                  activeOpacity={0.7}
                  key={index.toString()}
                  style={[
                    paperSizeStyle.sizeBox1,
                    { width: 70, height: 50 },
                    // { flex: index === 0 ? 1 : index === 1 ? 0.7 : 1.3 },
                    {
                      borderColor:
                        defaultCurrentIndex === index
                          ? Color.C_main
                          : bgColor
                            ? bgColor
                            : Color.C_border,
                    },
                  ]}>
                  <Text style={paperSizeStyle.sizeText}>{`${i?.height} x ${i?.width}`}</Text>
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
                <TextInput
                  onChangeText={(text: any) => setCustomWidth(text)}
                  onFocus={clearSelectedPaperSize}
                  maxLength={4}
                  keyboardType="numeric"
                  style={paperSizeStyle.input}
                  placeholder="00"
                  value={customWidth}
                />
              </View>
            </View>
            {/* height container */}
            <View style={paperSizeStyle.customHeightWidthCon}>
              <Text style={paperSizeStyle.label}>Height</Text>
              <View style={paperSizeStyle.inputCon}>
                <TextInput
                  onChangeText={(text: any) => setCustomHeight(text)}
                  maxLength={4}
                  keyboardType="numeric"
                  style={paperSizeStyle.input}
                  placeholder="00"
                  value={customHeight}
                />
              </View>
            </View>
          </View>
        </Animated.View>
        {/* paper type container */}
        <Animated.View
          entering={FadeInDown.delay(50).duration(550)}
          style={paperTypeStyle.container}>
          <Text style={paperTypeStyle.title}>What type of paper do you need?</Text>
          {/* all paper type container */}
          <View style={paperTypeStyle.paperTypeCon}>
            {paperType?.data?.map((i: IPaperType, index: number) => {
              return (
                <LinearGradient
                  colors={currentIndex === index ? ['#C83B62', '#7F35CD'] : ['#fff', '#fff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[paperTypeStyle.typeItem]}
                  key={index.toString()}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPaperType(i);
                      handlePaperType(index, i?._id);
                    }}
                    style={paperTypeStyle.actionLayer}
                    activeOpacity={0.7}
                    key={index.toString()}>
                    <Text
                      style={[
                        paperTypeStyle.paperTypeText,
                        {
                          color: currentIndex === index ? Color.C_white : 'rgba(0,0,0,0.7)',
                        },
                      ]}>
                      {i?.printingSetupType}{' '}
                      <Text>
                        ( {i?.price}
                        <Text style={{ fontSize: Font.Font_STen }}> QAR</Text> )
                      </Text>
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
              {colorMode?.data?.map((i: IColorMode, index: number) => {
                return (
                  <LinearGradient
                    colors={
                      currentIndexInPrint === index ? ['#C83B62', '#7F35CD'] : ['#fff', '#fff']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={paperTypeStyle.mode}
                    key={index.toString()}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={paperTypeStyle.actionLayer}
                      onPress={() => {
                        setSelectedColorMode(i);
                        handlePrintMode(index);
                      }}>
                      <Text
                        style={[
                          paperTypeStyle.modeItemText,
                          {
                            color:
                              currentIndexInPrint === index ? Color.C_white : 'rgba(0,0,0,0.7)',
                          },
                        ]}>
                        {i?.printingColorMode}{' '}
                        <Text>
                          ( {i?.price}
                          <Text style={{ fontSize: Font.Font_STen }}> QAR</Text> )
                        </Text>
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
              onPress={() => handleFilePick()}
              activeOpacity={0.7}
              style={paperTypeStyle.uploadButton}>
              <Upload />
              <Text style={paperTypeStyle.uploadButtonText}>
                {selectedFileName ? selectedFileName?.slice(0, 20) + '...' : 'Upload file'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {/* <PaperTypeComponent /> */}
        {/* total order container  */}
        <TotalOrderComponent
          printQuantity={printQuantity}
          setPrintQuantity={setPrintQuantity}
          jsonData={jsonData}
        />
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

export default OrderAndPrinterDesignPage;
