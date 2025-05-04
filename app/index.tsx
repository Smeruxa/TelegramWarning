import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import AlertScreen from "./screens/AlertScreen"
import SettingsScreen from "./screens/SettingsScreen"

const Stack = createStackNavigator()

export default function App() {
    return (
        <Stack.Navigator initialRouteName="Alert" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}