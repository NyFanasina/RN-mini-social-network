import myStorage from '@/AsyncStorage/myStorage';
import Avatar from '@/components/Avatar'
import Head from '@/components/Head';
import { Colors } from '@/constants/Colors';
import Config, { axiosConfig } from '@/constants/Config';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'

export default function DiscuGroupForm() {
    const [members, setMembers] = useState<Array<any>>([]);
    const [users, setUsers] = useState<Array<any>>([]);
    const [gpName, setGpName] = useState<string>('');

    useEffect(() => {
        loadUsers();
    }, [])

    async function loadUsers(keyword: string = "") {
        const myId = await myStorage.getUserId(); // idUser Connected, me
        axios.get(`${Config.baseURL}/auth/users/${keyword} `, await axiosConfig())
            .then(res => setUsers(res.data.filter((item: any) => {
                return item.id != myId;
            })))
            .catch(e => console.log(e))
    }

    function onAddMember(member: any) {
        if (members.indexOf(member) === -1) {
            let nextMembers: Array<any> = [...members];
            nextMembers.push(member);
            setMembers(nextMembers);
        }
    }

    async function handleSubmit() {
        const body = { name: gpName, members: extractIdmembers(members) };
        if (gpName && members.length)
            axios.post(`${Config.chatURL}/chatroom/`, body, await axiosConfig())
                .then(res => {
                    router.push('/chat/Chatroom')
                })
                .catch(e => console.log(e));

    }

    return (
        <View style={s.container}>
            <Head title="Nouveau Groupe" />
            <View>
                <Text>Nom du groupe :</Text>
                <TextInput placeholder='Tapez ici le mon du groupe' style={s.inputName} onChangeText={setGpName} />
            </View>
            <View>
                <Text>Membre seléctioné - ({members.length}) :</Text>
                <ScrollView contentContainerStyle={s.members}>
                    {members.map((user: any, i) => <Avatar key={i} img={user.profile_picture} />)}
                </ScrollView>
            </View>
            <TextInput placeholder='Trouvez ici les membres de vos groupe' style={s.inputSearch} />
            <Text style={s.suggestion}>Suggestions :</Text>
            <ScrollView>
                {
                    users.map((user: any, i) => (
                        <View style={s.user} key={i}>
                            <View style={s.avatar}>
                                <Avatar img={user.profile_picture} />
                                <Text style={s.username}>{user.username}</Text>
                            </View>
                            <Ionicons name='add-circle' color={Colors.gray} size={35} onPress={() => onAddMember(user)} />
                        </View>
                    ))
                }
            </ScrollView>
            <TouchableOpacity style={s.nextBtn1} onPress={handleSubmit}>
                <Text style={s.nextBtnText}>Terminer</Text>
            </TouchableOpacity>
        </View >
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    inputName: {
        padding: 7,
        fontSize: 15,
        backgroundColor: Colors.light
    }
    , members: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        minHeight: 70,
    },
    inputSearch: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 45,
        borderRadius: 20,
        paddingStart: 18
    },
    suggestion: {
        fontStyle: 'italic'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        paddingStart: 10
    },
    nextBtn1: {
        backgroundColor: Colors.rose,
        padding: 5,
        marginVertical: 5
    },
    nextBtn2: {
        backgroundColor: Colors.gray,
        padding: 5,
        marginVertical: 5
    },
    nextBtnText: {
        textAlign: 'center',
        color: Colors.light,
        fontSize: 18
    }
})

function extractIdmembers(members: any) {
    return members.map((member: any) => member.id);
}   