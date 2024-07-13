import BioForm from '@/components/settings/BioForm';
import PasswordForm from '@/components/settings/PasswordForm';
import ProfileAvatar from '@/components/ProfileAvatar';
import UsernameForm from '@/components/settings/UsernameForm';
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react';
import myStorage from '@/AsyncStorage/myStorage';
import axios from 'axios';
import Config, { axiosConfig } from '@/constants/Config';
import PhotoForm from '@/components/settings/PhotoForm';

export default function Settings() {
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        (async () => {
            const res = await myStorage.get();
            const userAuth = res.user;
            setUser(userAuth);
        })()
    }, [router])

    function logOut() {
        myStorage.distroy();
        router.push('/');
    }

    async function onSave(item: any) {
        axios.put(`${Config.baseURL}/auth/users/${user.id}`, item, await axiosConfig())
            .then(res => console.log(res.data))
            .catch(e => console.log(e.response.data))
    }

    // async function loadUser() {
    //     axios.get(`${Config.baseURL}/auth/user/${user.id}`, await axiosConfig())
    //         .then(res => {
    //             console.log(res.data)
    //             setUser(res.data);
    //         })

    //         .catch(e => console.log(e))
    // }


    return (
        <ScrollView>
            <View>
                <View style={s.head}>
                    <Ionicons name='arrow-back-outline' size={35} onPress={router.back} />
                    <Text style={s.username}>Parametre du compte</Text>
                </View>
                <View style={s.profile}>
                    <ProfileAvatar username={user.username} img={user.profile_picture} />
                </View>
                <UsernameForm user={user} handleSave={onSave} />
                <PhotoForm user={user} handleSave={onSave} />
                <BioForm user={user} handleSave={onSave} />
                <PasswordForm user={user} handleSave={onSave} />
            </View>
            <TouchableOpacity style={s.logOutBtn} onPress={logOut}>
                <Text>Se déconnecter</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const s = StyleSheet.create({
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: Colors.gray
    },
    profile: {
        margin: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderBottomColor: Colors.gray
    },
    username: {
        paddingHorizontal: 8,
        fontWeight: 'bold',
        color: '#2e2e2e'
    },
    logOutBtn: {
        padding: 15,
        margin: 2,
        backgroundColor: Colors.light,
        borderWidth: 0.3,
        borderColor: Colors.gray,
        fontSize: 15
    }
})