import myStorage from '@/AsyncStorage/myStorage';
import UserWithFollowButton from '@/components/UserWithFollowButton'
import { Colors } from '@/constants/Colors'
import Config, { axiosConfig } from '@/constants/Config';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
const { baseURL } = Config;

export default function Search() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers(keyWord = '') {
        const myId = await myStorage.getUserId(); // idUser Connected, me
        axios.get(`${baseURL}/auth/users/${keyWord}`, await axiosConfig())
            .then(res => setUsers(res.data.filter((item: any) => {
                return item.id != myId;
            })))
            .catch(e => console.log(e))
    }

    function handleSearch(text: string) {
        loadUsers(text);
    }

    return (
        <View style={s.container}>
            <TextInput style={s.input} placeholder='Entrez ici ce que vous voulez rechercher' onChangeText={handleSearch} />
            <ScrollView>
                {users.map((user: any) => <UserWithFollowButton key={user.id} user={user} />)}
            </ScrollView>
        </View >
    )
}

const s = StyleSheet.create({
    container: {
        padding: 15
    },
    input: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray,
        height: 45,
        width: "100%",
        borderRadius: 20,
        paddingStart: 18
    }
})