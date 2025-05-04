import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { sendTelegramMessage } from "../utils/telegram"

type RootStackParamList = { Alert: undefined; Settings: undefined }
type Props = { navigation: StackNavigationProp<RootStackParamList, "Alert"> }

export default function AlertScreen({ navigation }: Props) {
    const [token, setToken] = useState("")
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        const load = async () => {
            const t = await AsyncStorage.getItem("botToken")
            const u = await AsyncStorage.getItem("userList")
            if (t) setToken(t)
            if (u) setUsers(JSON.parse(u))
        }
        load()
    }, [])

    const handleSend = () => {
        if (!token || users.length === 0) {
            Alert.alert("Ошибка", "Проверьте настройки.")
            return
        }
        let count = 0
        const interval = setInterval(() => {
            users.forEach(id => sendTelegramMessage(token, id, "🚨 Срочная тревога!"))
            count++
            if (count >= 30) clearInterval(interval)
        }, 1000)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.alertBtn} onPress={handleSend}>
                <Text style={styles.alertText}>🚨 Отправить тревогу</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1a1a1a", justifyContent: "center", alignItems: "center" },
    settingsBtn: { position: "absolute", top: 50, left: 20 },
    settingsIcon: { fontSize: 24, color: "#fff" },
    alertBtn: { backgroundColor: "#e53935", paddingVertical: 20, paddingHorizontal: 40, borderRadius: 8 },
    alertText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
})