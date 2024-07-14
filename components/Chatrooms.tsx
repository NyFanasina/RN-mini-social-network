import { StyleSheet, Text, View, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'
import { router } from 'expo-router'

export default function Chatrooms() {
    return (
        <TouchableOpacity style={s.container} onPress={() => router.push("/Chat")}>
            <Avatar />
            <View style={s.Chatrooms}>
                <Text style={s.username}>Lorem, ipsum.</Text>
                <Text style={s.snippet}>Lorem ipsum dolor sit amet consectetur adipisicing elit...</Text>
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
    },
    Chatrooms: {
        marginStart: 5,
    },
    username: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    snippet: {
        fontSize: 13,
        paddingEnd: 15
    }
})