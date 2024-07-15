import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Modal } from 'react-native'
import Chatrooms from '@/components/Chatrooms'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Config, { axiosConfig } from '@/constants/Config'
import myStorage from '@/AsyncStorage/myStorage'
import UserChatroomItem from '@/components/UserChatroomItem'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function Chatroom() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [chatrooms, setChatrooms] = useState<Array<any>>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadChatrooms();
        loadUsers();
    }, [])


    // function onSearch() {
    //     const nextChatrooms = .filter((chatroom: any) => {
    //         return chatroom.interlocutor.indexOf(keyword) != -1;
    //     });
    // }


    function loadChatrooms() {
        axios.get(`${Config.chatURL}/chatroom`)
            .then(res => {
                setChatrooms(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    async function loadUsers(keyWord = '') {
        const myId = await myStorage.getUserId(); // idUser Connected, me
        axios.get(`${Config.baseURL}/auth/users/${keyWord}`, await axiosConfig())
            .then(res => setUsers(res.data.filter((item: any) => {
                return item.id != myId;
            })))
            .catch(e => console.log(e))
    }

    function handleChangeText(text: string) {
        setKeyword(text);
    }

    return (
        <View style={s.container}>
            <Text style={s.head}>Messages</Text>
            <ScrollView >
                <TextInput style={s.input} placeholder='Trouvez ici vos messages' onChangeText={handleChangeText} />
                {
                    chatrooms.map((chatroom: any, index: number) => <Chatrooms key={index} chatroom={chatroom} />)
                }
            </ScrollView>
            <TouchableOpacity style={s.newBtn} onPress={() => setModalVisible(true)}>
                <Text style={s.newBtnText}>Nouveau Message</Text>
            </TouchableOpacity>

            <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={s.container}>
                    <View style={modal.head}>
                        <TouchableOpacity >
                            <Ionicons name='chevron-back-outline' size={30} />
                        </TouchableOpacity>
                        <Text>Nouveau message</Text>
                    </View>
                    <TouchableOpacity style={modal.btn} onPress={() => router.push('/DiscuGroupForm')}>
                        <Ionicons name='add-circle-outline' size={45} />
                        <Text style={modal.btnText}>Créer un groupe de discussion</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Saisissez un nom ou un groupe' style={modal.input} />
                    <TextInput style={{ fontWeight: '600', fontStyle: 'italic' }}>Suggestions :</TextInput>
                    <View>
                        {
                            users.map((user, i) => <UserChatroomItem key={i} user={user} isForChat />)
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    head: {
        fontSize: 20,
        padding: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 45,
        borderRadius: 20,
        paddingStart: 18
    },
    newBtn: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        borderRadius: 4,
        alignSelf: 'baseline',
        padding: 10,
        backgroundColor: Colors.rose,
    },
    newBtnText: {
        fontSize: 16.5,
        fontStyle: "italic",
        color: Colors.light,
    }
})

const modal = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    btnText: {
        fontSize: 20
    },
    input: {
        backgroundColor: Colors.lightGray,
        paddingVertical: 5,
        paddingStart: 15,
        borderRadius: 18
    }
})