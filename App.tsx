import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CartItemProvider from './src/Providers/CartItemProvider';
import FavItemProvider from './src/Providers/FavItemProvider';
import Index from './src/routes/stack';

export default function App() {
  return (
    <FavItemProvider>
      <CartItemProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Index />
          </NavigationContainer>
        </GestureHandlerRootView>
      </CartItemProvider>
    </FavItemProvider>
  );
}
