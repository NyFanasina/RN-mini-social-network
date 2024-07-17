import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Avatar from './Avatar'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import Config from '@/constants/Config'

export default function Chatrooms({ chatroom }: any) {

    const interlocutorId = chatroom.interlocutorId ?? chatroom.chatroomId;

    async function handleClick() {
        // await axios.patch(`${Config.chatURL}/message/${chatroom.messageId}`)
        //     .then(res => console.log(res.data))


        router.push(`chat/${interlocutorId}`)
        router.setParams({
            interlocutor: chatroom.interlocutor,
            isGrouped: chatroom.chatroomId ? '1' : '0'
        })
    }

    return (
        <TouchableOpacity style={s.container} onPress={handleClick}>
            <Avatar img={chatroom.profile_picture} />
            <View style={s.Chatrooms}>
                <Text style={chatroom.seen ? s.username : s.usernameNotSeen}>{chatroom.interlocutor}</Text>
                <Text style={[chatroom.seen ? s.message : s.messageNotSeen]}>{chatroom.lastmessage}</Text>
            </View>
            <View>
                {!chatroom.seen && <Ionicons name='radio-button-on' color={Colors.gray} size={18} style={{ marginHorizontal: 4 }} />}
            </View>
        </TouchableOpacity >
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '600',
    },
    usernameNotSeen: {
        fontSize: 17,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 0.5
    },
    message: {
        fontSize: 13,
        color: Colors.gray,
    },
    messageNotSeen: {
        fontStyle: 'italic'
    },
})