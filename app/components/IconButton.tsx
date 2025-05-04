import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface Props {
    icon: string
    onPress: () => void
}

export default function IconButton({ icon, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.icon} onPress={onPress}>
            <Text style={styles.iconText}>{icon}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: { position: "absolute", top: 20, left: 20, zIndex: 10 },
    iconText: { fontSize: 28, color: "#fff" }
})