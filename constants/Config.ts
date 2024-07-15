import myStorage from "@/AsyncStorage/myStorage";


const Config = {
    baseURL: "http://192.168.43.44:4000/api",
    chatURL: "http://192.168.43.44:3001/api/chat"
}

export const axiosConfig = async (contentType: string = "application/json") => {
    const user = await myStorage.get();

    return {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": contentType
        }
    }
}

export default Config;