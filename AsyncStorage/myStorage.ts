import AsyncStorage from "@react-native-async-storage/async-storage";

class myStorage {
    static async store(user: any): Promise<void> {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    static async get() {
        const userString: string = await AsyncStorage.getItem('user') ?? '{}';
        return JSON.parse(userString);
    }

    static distroy() {
        AsyncStorage.removeItem('user');
    }

    static async update(user: any) {
        const data = await myStorage.get();
        const nextData: any = { ...data, user: { ...user } }
        myStorage.store(nextData)
    }

    static async getUserId() {
        const data = await myStorage.get();
        return data.user.id;
    }


}

export default myStorage