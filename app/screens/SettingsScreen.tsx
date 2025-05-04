import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { getBotToken, getUserList, setBotToken, setUserList } from "../utils/storage"

type RootStackParamList = { Alert: undefined; Settings: undefined }
type Props = { navigation: StackNavigationProp<RootStackParamList, "Settings"> }

export default function SettingsScreen({ navigation }: Props) {
    const [token, setToken] = useState("")
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        const loadData = async () => {
            const savedToken = await getBotToken()
            const savedUsers = await getUserList()
            if (savedToken) setToken(savedToken)
            if (savedUsers) setUsers(savedUsers)
        }
        loadData()
    }, [])

    useEffect(() => {
        if (token) setBotToken(token)
    }, [token])

    useEffect(() => {
        if (users.length) setUserList(users)
    }, [users])

    const updateUser = (index: number, value: string) => {
        const updatedUsers = [...users]
        updatedUsers[index] = value
        setUsers(updatedUsers)
    }

    const handleAddUser = () => setUsers(prevUsers => [...prevUsers, ""])

    const handleRemoveUser = (index: number) => {
        const updatedUsers = users.filter((_, i) => i !== index)
        setUsers(updatedUsers)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={styles.backText}>⬅ Вернуться</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Telegram Bot API"
                placeholderTextColor="#888"
                value={token}
                onChangeText={setToken}
            />

            <TouchableOpacity style={styles.addBtn} onPress={handleAddUser}>
                <Text style={styles.addText}>➕ Добавить ID</Text>
            </TouchableOpacity>

            <FlatList
                data={users}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.userRow}>
                        <TextInput
                            style={styles.userInput}
                            placeholder="User ID"
                            placeholderTextColor="#888"
                            keyboardType="numeric"
                            value={item}
                            onChangeText={val => updateUser(index, val)}
                        />
                        <TouchableOpacity onPress={() => handleRemoveUser(index)}>
                            <Text style={styles.trash}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1a1a1a", padding: 20, paddingTop: 60 },
    back: { marginBottom: 20 },
    backText: { color: "#fff", fontSize: 16 },
    input: { backgroundColor: "#2a2a2a", color: "#fff", padding: 12, borderRadius: 6, marginBottom: 15 },
    addBtn: { backgroundColor: "#333", padding: 12, borderRadius: 6, alignItems: "center", marginBottom: 15 },
    addText: { color: "#fff", fontSize: 16 },
    userRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    userInput: { flex: 1, backgroundColor: "#2a2a2a", color: "#fff", padding: 10, borderRadius: 6, marginRight: 10 },
    trash: { fontSize: 20, color: "#ff5252" }
})