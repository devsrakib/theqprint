import { ScrollView, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

export const CustomTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const CustomScrollView = Animated.createAnimatedComponent(ScrollView);