import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Color } from '../../constants/GlobalStyle';
import ToReview from '../../pages/review/ToReview/toReview/ToReview';
import OrderPlaced from '../../pages/printingOderHistory/printingOrderTab/OrderPlaced';
import Printing from '../../pages/printingOderHistory/printingOrderTab/Printing';
import Shipped from '../../pages/printingOderHistory/printingOrderTab/Shipped';
import OrderRecieve from '../../pages/printingOderHistory/printingOrderTab/OrderRecieve';
import OrderCancel from '../../pages/printingOderHistory/printingOrderTab/OrderCancel';

const Tab = createMaterialTopTabNavigator();

const PrintingTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: Color.C_main,
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarItemStyle: { width: 125 },
        tabBarGap: 0,
        tabBarAndroidRipple: { borderless: false },
        tabBarLabelStyle: { fontSize: 16, textTransform: 'capitalize', width: 125 },
        tabBarIndicatorStyle: {
          backgroundColor: Color.C_main,
          height: 1,
          borderRadius: 10,
          width: 115,
          left: '1%',
        },
      }}>
      {/* <Tab.Screen name="To Review" component={ToReview} /> */}
      <Tab.Screen name="Order Placed" component={OrderPlaced} />
      <Tab.Screen name="Printing" component={Printing} />
      <Tab.Screen name="Shipped" component={Shipped} />
      <Tab.Screen name="Order Received" component={OrderRecieve} />
      <Tab.Screen name="Cancel" component={OrderCancel} />
    </Tab.Navigator>
  );
};

export default PrintingTopTab;
