import myStorage from '@/AsyncStorage/myStorage'
import Avatar from '@/components/Avatar'
import { Colors } from '@/constants/Colors'
import Config from '@/constants/Config'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'

export default function Chat() {
    const [sender, setSender] = useState<any>({})
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Array<any>>([]);
    const { interlocutor, interlocutorId } = useLocalSearchParams(); // Recipient

    useEffect(() => {
        (async () => {
            const me = await myStorage.get()
            setSender(me.user)
        })()
        loadMessages();
    }, [])

    async function loadMessages() {
        const userId = await myStorage.getUserId();
        console.log(userId, interlocutorId);
        axios.get(`${Config.chatURL}/message/${interlocutorId}?userId=${userId}`)
            .then(res => {
                console.log(res.data)
                setMessages(res.data)
            })
            .catch(e => console.log(e))
    }

    function handleSend() {
        const body = {
            sender: sender.id,
            recipient: interlocutorId,
            content: message
        }
        if (message)
            axios.post(`${Config.chatURL}/message`, body)
                .then(res => {
                    if (res.status === 201) {
                        loadMessages();
                        setMessage('');
                    }
                })
                .catch(e => console.log(e))
    }

    return (
        <View style={s.container}>
            <View style={s.head}>
                <TouchableOpacity style={s.backBtn} onPress={router.back}>
                    <Ionicons name='chevron-back-outline' size={30} />
                </TouchableOpacity>
                <Text style={s.username}>{interlocutor}</Text>
            </View>
            <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 12 }}>
                {
                    messages.map((msg: any, i) => {
                        return <Text key={i} style={[s.msg, (msg.sender == sender.id) ? s.msgOut : s.msgIn]}>{msg.content}</Text>
                    })
                }
            </ScrollView>
            <View style={s.form}>
                <TextInput style={s.input} multiline={true} onChangeText={setMessage} value={message} placeholder='Tapez ici votre message...' />
                <TouchableOpacity style={s.btnSend} onPress={handleSend}>
                    <Ionicons name='send' size={33} color={Colors.rose} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        position: 'relative',
        padding: 15,
        borderColor: Colors.gray,
        borderBottomWidth: 0.2
    },
    backBtn: {
        position: "absolute",
        padding: 15
    },
    username: {
        margin: "auto",
        fontSize: 20,
    },
    msg: {
        fontSize: 16,
        padding: 10,
        marginVertical: 5
    },
    msgIn: {
        backgroundColor: Colors.lightGray,
        color: '#222',
        marginEnd: 'auto',
    },
    msgOut: {
        backgroundColor: Colors.rose,
        color: Colors.light,
        marginStart: 'auto'
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 0.2,
        borderColor: Colors.gray,
    },
    input: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        borderWidth: 0.2,
        borderRadius: 20,
        paddingVertical: 4,
        paddingStart: 20
    },
    btnSend: {
        paddingHorizontal: 5,
    }
})