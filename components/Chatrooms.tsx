import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'
import { router } from 'expo-router'

export default function Chatrooms({ chatroom }: any) {

    function handleClick() {
        router.push(`chat/${chatroom.interlocutorId}`)
        router.setParams({
            interlocutor: chatroom.interlocutor
        })
    }

    return (
        <TouchableOpacity style={s.container} onPress={handleClick}>
            <Avatar img={chatroom.profile_picture} />
            <View style={s.Chatrooms}>
                <Text style={s.username}>{chatroom.interlocutor}</Text>
                <Text style={s.snippet}>{chatroom.lastmessage}</Text>
            </View>
        </TouchableOpacity >
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 5,
        height: 60,
        // borderWidth: 0.75,
        overflow: 'hidden'
    },
    Chatrooms: {
        flex: 1,
        marginStart: 10,
    },
    username: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    snippet: {
        fontSize: 13,
    }
})