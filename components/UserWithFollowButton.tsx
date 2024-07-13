import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Avatar from './Avatar'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import Config, { axiosConfig } from '@/constants/Config'
import { router } from 'expo-router'
import { useState } from 'react'

export default function UserWithFollowButton({ user }: any) {

    async function onFollow(userId: number) {
        axios.post(`${Config.baseURL}/follow/followers/${userId}`, {}, await axiosConfig())
            .then(res => {
                console.log(res.data.message)
            })
            .catch(e => console.log(e))
    }

    async function onShowUser() {
        router.navigate(`/user/${user.id}`)
    }



    return (
        <View style={s.container}>
            <View style={s.user}>
                <TouchableOpacity onPress={onShowUser}>
                    <Avatar img={user.profile_picture} />
                </TouchableOpacity>
                <Text style={s.label}>{user.username}</Text>
            </View>

            {/* event press must be onFollow */}
            <TouchableOpacity onPress={onShowUser}>
                <Text style={s.btn}>Voir</Text>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 0.2,
        padding: 5
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        marginStart: 10
    },
    btn: {
        backgroundColor: Colors.rose,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4
    }
})