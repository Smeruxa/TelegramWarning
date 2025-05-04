import AsyncStorage from "@react-native-async-storage/async-storage"

export const getBotToken = async () => await AsyncStorage.getItem("botToken")
export const getUserList = async () => JSON.parse(await AsyncStorage.getItem("userList") || "[]")
export const setBotToken = async (token: string) => await AsyncStorage.setItem("botToken", token)
export const setUserList = async (list: string[]) => await AsyncStorage.setItem("userList", JSON.stringify(list))