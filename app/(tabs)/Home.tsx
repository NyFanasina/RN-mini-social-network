import Posts from '@/components/Posts'
import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Config, { axiosConfig } from '@/constants/Config'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native'

const { baseURL } = Config;

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);
    const route = useRoute();

    useEffect(() => {
        loadPosts();
    }, [route])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadPosts().finally(() => {
            setRefreshing(false);
        })
    }, []);


    async function loadPosts() {
        axios.get(`${baseURL}/post/posts`, await axiosConfig())
            .then(res => {
                setPosts(res.data)
            })
            .catch(e => console.log(e));
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={s.header}>
                <Text style={s.brand}>BlaBla</Text>
                <View style={s.iconSet}>
                    <TouchableOpacity onPress={() => router.push('Search')}>
                        <Ionicons size={30} style={s.icon} name='search-outline' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/Chatroom')}>
                        <Ionicons size={30} style={s.icon} name='chatbubble-outline' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('Notification')}>
                        <Ionicons size={30} style={s.icon} name='notifications-outline' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('Settings')}>
                        <Ionicons size={30} style={s.icon} name='settings-outline' />
                    </TouchableOpacity>
                </View>
            </View>
            {
                posts.map((post: any) => {
                    return <Posts key={post.id} post={post} />
                })
            }
        </ScrollView>
    )
}

const s = StyleSheet.create({
    header: {
        padding: 15,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    brand: {
        fontSize: 30,
        fontFamily: 'serif'
    },
    iconSet: {
        flexDirection: 'row'
    },
    icon: {
        paddingHorizontal: 5,

    }
})
