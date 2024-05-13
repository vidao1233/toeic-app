import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu JWT vào AsyncStorage
export const storeJwtToken = async (emailConfirmed, expiration, freeTest ,token) => {
    try {
        await AsyncStorage.setItem('emailConfirmed', emailConfirmed);
        await AsyncStorage.setItem('expiration', expiration);
        await AsyncStorage.setItem('freeTest', freeTest);
        await AsyncStorage.setItem('jwt', token);
        console.log(`storage ${token}`)
        console.log('JWT token đã được lưu trữ thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu trữ JWT:', error);
    }
};

// Lấy JWT từ AsyncStorage
export const getJwtToken = async () => {
    try {
        const emailConfirmed = await AsyncStorage.getItem('emailConfirmed', emailConfirmed);
        const expiration = await AsyncStorage.getItem('expiration', expiration);
        const freeTest = await AsyncStorage.getItem('freeTest', freeTest);
        const token = await AsyncStorage.getItem('jwt');
        if (token !== null) {
            // JWT được tìm thấy trong AsyncStorage
            return {emailConfirmed, expiration, freeTest, token};
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

// Lưu login info vào AsyncStorage
export const storeRememberedCredentials = async (username, password) => {
    try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        console.log('Login info đã được lưu trữ thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu trữ login info:', error);
    }
};

// Lấy login info từ AsyncStorage
export const getRememberedCredentials = async () => {
    try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        if (username !== null && password !== null) {
            // login info được tìm thấy trong AsyncStorage
            console.log({username, password})
            return {username, password};
        } else {
            // Không tìm thấy login info trong AsyncStorage
            console.log('Không tìm thấy login info trong AsyncStorage.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy login info từ AsyncStorage:', error);
        return null;
    }
};

// Xóa login info từ AsyncStorage
export const removeRememberedCredentials = async () => {
    try {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        console.log('Login info token đã được xóa khỏi AsyncStorage.');
    } catch (error) {
        console.error('Lỗi khi xóa login info từ AsyncStorage:', error);
    }
};