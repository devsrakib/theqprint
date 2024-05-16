import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToAsyncStorage = async (key: string, token: string) => {
    
        if (!key || typeof AsyncStorage === 'undefined') {
            return ''
        }
       return await AsyncStorage.setItem(key, token);
};


export const getFromAsyncStorage = async (key: string, ) => {
        if (!key || typeof AsyncStorage === 'undefined') {
            return ''
        }
        
       return await AsyncStorage.getItem(key);
};
