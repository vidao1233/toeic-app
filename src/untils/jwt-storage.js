import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu JWT vào AsyncStorage
export const storeJwtToken = async (token) => {
    try {
        await AsyncStorage.setItem('jwt', token);
        console.log('JWT token đã được lưu trữ thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu trữ JWT:', error);
    }
};

// Lấy JWT từ AsyncStorage
export const getJwtToken = async () => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        if (token !== null) {
            // JWT được tìm thấy trong AsyncStorage
            return token;
        } else {
            // Không tìm thấy JWT trong AsyncStorage
            console.log('Không tìm thấy JWT trong AsyncStorage.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy JWT từ AsyncStorage:', error);
        return null;
    }
};

// Xóa JWT từ AsyncStorage
export const removeJwtToken = async () => {
    try {
        await AsyncStorage.removeItem('jwt');
        console.log('JWT token đã được xóa khỏi AsyncStorage.');
    } catch (error) {
        console.error('Lỗi khi xóa JWT từ AsyncStorage:', error);
    }
};
