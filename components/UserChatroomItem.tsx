import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Avatar from './Avatar'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import Config, { axiosConfig } from '@/constants/Config'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'

export default function UserChatroomItem({ user }: any) {

    async function onFollow(userId: number) {
        axios.post(`${Config.baseURL}/follow/followers/${userId}`, {}, await axiosConfig())
            .then(res => {
                // console.log(res.data.message)
            })
        // .catch(e => console.log(e))
    }

    async function onShowUser() {
        router.navigate(`/user/${user.id}`)
    }

    async function onContactTo() {
        router.navigate(`/chat/${user.id}`)
        router.setParams({
            interlocutor: user.username,
        })
    }

    return (
        <TouchableOpacity style={s.container} onPress={onContactTo}>
            <View style={s.user}>
                <Avatar img={user.profile_picture} />
                <Text style={s.label}>{user.username}</Text>
            </View>
        </TouchableOpacity>
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